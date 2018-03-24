const sendSignedRequestV2 = require('./sendSignedRequestV2')
const downloadtext = require('../../util/downloadText')
const {toIssuerCert, toPEM, toStandardB64} = require('../certUtils')

const newCertificate = (keypair, finalizeUrl, nonceUrl, url) => (csr) => {
  console.log('Requesting certificate from lets-encrypt')
  return sendSignedRequestV2({
    csr
  }, keypair, finalizeUrl, nonceUrl, url)
  .then(({body}) =>
    downloadtext(body.certificate)
  )
}

module.exports = newCertificate
