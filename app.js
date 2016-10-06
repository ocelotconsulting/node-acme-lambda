const generateCertificate = require('./src/acme/generateCertificate')
const isExpired = require('./src/util/isExpired')
const config = require('./config/default.json')

const certificate = (options, context) =>
  isExpired(config['acme-domain'])
  .then((expired) =>
    (expired
      ? generateCertificate()
      : {msg: 'Certificate is still valid, going back to bed.'}))
  .then((msg) => context.succeed(msg))
  .catch((err) => context.succeed(`Received an error ${JSON.stringify(err)}`))

module.exports = { handler : certificate }
