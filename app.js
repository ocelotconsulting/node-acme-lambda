const generateCertificate = require('./src/acme/generateCertificate')
const isExpired = require('./src/util/isExpired')
const config = require('./config/default.json')

const single = (domain) =>
  isExpired(domain)
  .then((expired) =>
    (expired
      ? generateCertificate(domain)
      : {
        err: false,
        msg: `Certificate for ${domain} is still valid, going back to bed.`
      }
    )
  )
  .catch((err) => ({
    err: true,
    msg: `Updating cert for ${domain}, received err ${err}, ${err.stack}`
  }))

const certificates = (domains) => domains.map(single)

const updateCertificates = (options, context) =>
  Promise.all(certificates(config['acme-domains']))
  .then((msgs) => context.succeed(msgs))

module.exports = { handler : updateCertificates }
