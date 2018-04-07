const sendSignedRequest = require('../sendSignedRequest')
const downloadBinary = require('../../util/downloadBinary')
const {toIssuerCert, toPEM, toStandardB64} = require('../certUtils')

const newCertificate = (keypair, authorizations, certUrl) => (csr) => {
  console.log('Requesting certificate from ACME provider')
  return sendSignedRequest({
    resource: 'new-cert',
    csr,
    authorizations
  }, keypair, certUrl)
  .then((data) =>
    downloadBinary(data.header['location'])
    .then((certificate) =>
      downloadBinary(toIssuerCert(data.header['link']))
      .then((issuerCert) => {
        console.log('Downloaded certificate.')
        return ({
          cert: toPEM(certificate),
          issuerCert: toPEM(issuerCert)
        })
      })
    )
  )
}

module.exports = newCertificate
