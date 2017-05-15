const generateCertificate = require('./src/acme/generateCertificate')
const isExpired = require('./src/util/isExpired')
const config = require('./config/default.json')
const readFile = require('./src/aws/s3/readFile')

const single = (key, domains) =>
  isExpired(key)
  .then((expired) =>
    (expired
      ? generateCertificate({key, domains})
      : {
        err: false,
        msg: `Certificate for ${key} is still valid, going back to bed.`
      }
    )
  )
  .catch((err) => ({
    err: true,
    msg: `Updating cert for ${key}, received err ${err}, ${err.stack}`
  }))

const certificates = (certDefinitions) =>
  Object.keys(certDefinitions)
  .map((certKey) =>
    single(certKey, certDefinitions[certKey])
  )

const certDefinitions = () => {
  if (config['certificate-info']) {
    return Promise.accept(config['certificate-info'])
  } else if (config['certificate-info-file']) {
    return readFile(config['s3-account-bucket'],
      config['s3-folder'],
      config['certificate-info-file']
    ).then((data) => JSON.parse(data.Body.toString()))
  } else {
    return Promise.reject('need to specify either certificate-info or certificate-info-file in config')
  }
}

const updateCertificates = (options, context) =>
  certDefinitions()
  .then((definitions) => Promise.all(certificates(definitions)))
  .then((msgs) => context.succeed(msgs))
  .catch((e) => context.fail(e))

module.exports = { handler: updateCertificates }
