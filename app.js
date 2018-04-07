const generateCertificate = require('./src/acme/generateCertificate')
const isExpired = require('./src/util/isExpired')
const config = require('./config')

const single = (key, domains) =>
  isExpired(key)
  .then(expired =>
    (expired
      ? generateCertificate({key, domains})
      : {
        err: false,
        msg: `Certificate for ${key} is still valid, going back to bed.`
      }
    )
  )
  .catch(err => ({
    err: true,
    msg: `Updating cert for ${key}, received err ${err}, ${err.stack}`
  }))

const certificates = (certDefinitions) =>
  Object.keys(certDefinitions)
  .map(certKey =>
    single(certKey, certDefinitions[certKey])
  )

const updateCertificates = (options, context) =>
  Promise.all(certificates(config['certificate-info']))
  .then(context.succeed)

module.exports = { handler: updateCertificates }
