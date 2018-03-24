const RSA = require('rsa-compat').RSA
const sendSignedRequestV2 = require('./sendSignedRequestV2')

const sendDNSChallengeValidation = (dnsChallenge, acctKeyPair, nonceUrl, url) => {
  console.log(`Sending DNS challenge validation`)
  return sendSignedRequestV2({
    keyAuthorization: `${dnsChallenge.token}.${RSA.thumbprint(acctKeyPair)}`
  }, acctKeyPair, dnsChallenge.url, nonceUrl, url)
  .then(({body}) => body)
  .catch((e) => {
    console.error(`Couldn't send DNS challenge verification.`, e)
    throw e
  })
}

module.exports = sendDNSChallengeValidation
