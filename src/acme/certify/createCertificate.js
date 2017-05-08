const generateRSAKeyPair = require('../../util/generateRSAKeyPair')
const newCertificate = require('./newCertificate')
const generateCSR = require('../../util/generateCSR')
const config = require('../../../config/default.js')
const saveFile = require('../../aws/s3/saveFile')

const saveCertificate = (data) =>
  saveFile(
    config['s3-cert-bucket'],
    config['s3-folder'],
    `${data.key}.json`,
    JSON.stringify({
      key: data.keypair,
      cert: data.cert,
      issuerCert: data.issuerCert
    })
  )

const createCertificate = (certUrl, certInfo, acctKeyPair) => (authorizations) =>
  generateRSAKeyPair()
  .then((domainKeypair) =>
    generateCSR(domainKeypair, certInfo.domains)
    .then(newCertificate(acctKeyPair, authorizations, certUrl))
    .then((certData) =>
      saveCertificate({
        key: certInfo.key,
        keypair: domainKeypair,
        cert: certData.cert,
        issuerCert: certData.issuerCert
      })
    )
  )

module.exports = createCertificate
