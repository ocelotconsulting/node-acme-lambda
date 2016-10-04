import { RSA } from 'rsa-compat'
import sendSignedRequest from '../sendSignedRequest'

const sendDNSChallengeValidation = (dnsChallenge, acctKeyPair) =>
    sendSignedRequest({
      resource: 'challenge',
      keyAuthorization: `${dnsChallenge.token}.${RSA.thumbprint(acctKeyPair)}`
    }, acctKeyPair, dnsChallenge.uri)
    .then((data) => Promise.resolve(data.body))
    .catch((e) => {
      console.log(`Couldn't send DNS challenge verification ${JSON.stringify(e)}.`)
      throw e
    })

module.exports = sendDNSChallengeValidation
