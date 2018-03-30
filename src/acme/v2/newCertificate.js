const sendSignedRequestV2 = require('./sendSignedRequestV2')
const downloadtext = require('../../util/downloadText')
const {toIssuerCert, toPEM, toStandardB64} = require('../certUtils')

const newCertificate = (keypair, finalizeUrl, nonceUrl, url) => (csr) => {
  console.log('Requesting certificate.')
  return sendSignedRequestV2({
    csr
  }, keypair, finalizeUrl, nonceUrl, url)
  .then(({body}) =>
    downloadtext(body.certificate)
  )
  .catch(err => {
    if (err.response && err.response.text) {
      const detailObj = JSON.parse(err.response.text)
      if (detailObj.type && detailObj.type.indexOf('serverInternal') > -1) {
        console.log(`Encountered an internal acme server error, will need to retry this configuration (re-run lambda).`)
      }
    }
    throw err
  })
}

module.exports = newCertificate
