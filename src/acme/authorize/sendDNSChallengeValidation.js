const RSA = require('rsa-compat').RSA
const sendSignedRequest = require('../sendSignedRequest')

const sendDNSChallengeValidation = (dnsChallenge, acctKeyPair) =>
    sendSignedRequest({
      resource: 'challenge',
      keyAuthorization: `${dnsChallenge.token}.${RSA.thumbprint(acctKeyPair)}`
    }, acctKeyPair, dnsChallenge.uri)
    .then((data) => data.body)
    .catch((e) => {
      console.log(`Couldn't send DNS challenge verification ${JSON.stringify(e)}.`)
      throw e
    })

module.exports = sendDNSChallengeValidation
