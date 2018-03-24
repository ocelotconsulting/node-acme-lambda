const generateRSAKeyPair = require('../../util/generateRSAKeyPair')
const newCertificate = require('./newCertificate')
const generateCSR = require('../../util/generateCSR')
const config = require('../../../config')
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

const createCertificate = (certInfo, acctKeyPair, nonceUrl, url) => finalizeUrl =>
  generateRSAKeyPair()
  .then(domainKeypair =>
    generateCSR(domainKeypair, certInfo.domains)
    .then(newCertificate(acctKeyPair, finalizeUrl, nonceUrl, url))
    .then(cert =>
      saveCertificate({
        key: certInfo.key,
        keypair: domainKeypair,
        cert,
      })
    )
  )

module.exports = createCertificate
