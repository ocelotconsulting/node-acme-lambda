const generateRSAKeyPair = require('../../util/generateRSAKeyPair')
const newCertificate = require('./newCertificate')
const generateCSR = require('../../util/generateCSR')
const config = require('../../../config/default.json')
const saveFile = require('../../aws/s3/saveFile')

const saveCertificate = (data) =>
  saveFile(
    config['s3-cert-bucket'],
    config['s3-folder'],
    `${data.domain}.json`,
    JSON.stringify({
      key: data.keypair,
      cert: data.cert,
      issuerCert: data.issuerCert
    })
  )

const createCertificate = (certUrl, domain, acctKeyPair) => (authorizations) =>
  generateRSAKeyPair()
  .then((domainKeypair) =>
    generateCSR(domainKeypair, [domain])
    .then(newCertificate(acctKeyPair, authorizations, certUrl))
    .then((certData) =>
      saveCertificate({
        domain,
        keypair: domainKeypair,
        cert: certData.cert,
        issuerCert: certData.issuerCert
      })
    )
  )

module.exports = createCertificate
