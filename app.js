const generateCertificate = require('./src/acme/generateCertificate')
const isExpired = require('./src/util/isExpired')
const config = {
  "s3-account-bucket": process.env.S3_ACCOUNT_BUCKET,
  "s3-cert-bucket": process.env.S3_CERT_BUCKET,
  "s3-folder": process.env.S3_CERT_FOLDER,
  "certificate-info": JSON.parse(process.env.S3_CERT_INFO),
  "acme-dns-retry": 30,
  "acme-dns-retry-delay-ms": 2000,
  "acme-account-file": "account",
  "acme-account-email": process.env.REGISTRATION_EMAIL,
  "acme-account-key-bits": 2048,
  "acme-directory-url": "https://acme-staging.api.letsencrypt.org"
}

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

const updateCertificates = (options, context) =>
  Promise.all(certificates(config['certificate-info']))
  .then((msgs) => context.succeed(msgs))

module.exports = { handler: updateCertificates }
