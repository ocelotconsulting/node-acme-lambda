const config = require('../../../config/default.json')
const readFile = require('../../aws/s3/readFile')
const createCertificate = require('./createCertificate')

const getCertificate = (certUrl, domain, acctKeyPair) => (authorizations) =>
  readFile(
    config['s3-cert-bucket'],
    config['s3-folder'],
    `${domain}.json`
  )
  .then((data) => Promise.resolve(JSON.parse(data.Body.toString())))
  .catch((e) => {
    console.log(`Creating domain since couldn't read s3://${config['s3-cert-bucket']}/${config['s3-folder']}/${domain}.json`)
    return createCertificate(certUrl, authorizations, domain, acctKeyPair)
  })

module.exports = getCertificate
