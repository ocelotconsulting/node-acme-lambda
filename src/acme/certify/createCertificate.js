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
  ).then(
    saveFile(
      config['s3-cert-bucket'],
      config['s3-folder'],
      `${data.domain}-cert.pem`,
      data.cert.toString()
    )
  ).then(
    saveFile(
      config['s3-cert-bucket'],
      config['s3-folder'],
      `${data.domain}-chain.pem`,
      data.issuerCert.toString()
    )
  ).then(
    saveFile(
      config['s3-cert-bucket'],
      config['s3-folder'],
      `${data.domain}-privkey.pem`,
      data.keypair.privateKeyPem.toString()
    )
  ).then(
    saveFile(
      config['s3-cert-bucket'],
      config['s3-folder'],
      `${data.domain}-fullchain.pem`,
      data.cert.toString() + data.issuerCert.toString()
    )
  )


const createCertificate = (certUrl, authorizations, domain, acctKeyPair) =>
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
