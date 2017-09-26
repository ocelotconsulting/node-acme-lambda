const directory = process.env.USE_PRODUCTION ?
  "https://acme-v01.api.letsencrypt.org" :
  "https://acme-staging.api.letsencrypt.org"

const config = process.env.USE_ENVIRONMENT ?
  {
    "s3-account-bucket": process.env.S3_ACCOUNT_BUCKET,
    "s3-cert-bucket": process.env.S3_CERT_BUCKET,
    "s3-folder": process.env.S3_CERT_FOLDER,
    "certificate-info": JSON.parse(process.env.S3_CERT_INFO),
    "acme-dns-retry": 30,
    "acme-dns-retry-delay-ms": 2000,
    "acme-account-file": process.env.ACCOUNT_PATH,
    "acme-account-email": process.env.REGISTRATION_EMAIL,
    "acme-account-key-bits": 2048,
    "acme-directory-url": directory
  } : require('./config.json')

module.exports = config
