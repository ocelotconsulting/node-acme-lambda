const config = require('../../../config')
const sendSignedRequestV2 = require('./sendSignedRequestV2')
const toAgreement = require('../toAgreement')

module.exports = (acctUrl, nonceUrl) => keypair => {
  console.log(`Creating new account with url ${acctUrl}`)

  return sendSignedRequestV2({
    "termsOfServiceAgreed": true,
    "contact": [
      `mailto:${config['acme-account-email']}`
    ]
  }, keypair, acctUrl, nonceUrl)
  .then(data =>
    Object.assign({
      keypair: keypair,
      location: data.header['location']
    },
    toAgreement(data.header['link']))
  )
}
