const RSA = require('rsa-compat').RSA
const sendSignedRequest = require('../sendSignedRequest')

const sendDNSChallengeValidation = (dnsChallenge, acctKeyPair) => {
  console.log(`Sending DNS challenge validation`)
  return sendSignedRequest({
    resource: 'challenge',
    keyAuthorization: `${dnsChallenge.token}.${RSA.thumbprint(acctKeyPair)}`
  }, acctKeyPair, dnsChallenge.uri)
  .then((data) => data.body)
  .catch((e) => {
    console.error(`Couldn't send DNS challenge verification.`, e)
    throw e
  })
}

module.exports = sendDNSChallengeValidation
