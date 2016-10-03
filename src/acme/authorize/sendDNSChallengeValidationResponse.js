import { RSA } from 'rsa-compat'
import winston from 'winston'
import sendSignedRequest from '../sendSignedRequest'

const sendDNSChallengeValidationResponse = (dnsChallenge, userKeyPair) =>
    sendSignedRequest({
      resource: 'challenge',
      keyAuthorization: `${dnsChallenge.token}.${RSA.thumbprint(userKeyPair)}`
    }, userKeyPair, dnsChallenge.uri)
    .then((data) => Promise.resolve(data.body))
    .catch((e) => {
      winston.error(`Couldn't send DNS challenge verification ${JSON.stringify(e)}.`)
      throw e
    })

module.exports = sendDNSChallengeValidationResponse
