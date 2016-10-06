const sendSignedRequest = require('../sendSignedRequest')
const updateDNSChallenge = require('./updateDNSChallenge')
const sendDNSChallengeValidation = require('./sendDNSChallengeValidation')

const getDNSChallenge = (challenges) => challenges.find((challenge) => challenge.type === 'dns-01')

const validateChallenges = (accountKeyPair, challengeResponse) => {
  const dnsChallenge = getDNSChallenge(challengeResponse.challenges)
  return Promise.all([
    updateDNSChallenge(dnsChallenge, accountKeyPair)
    .then(() => sendDNSChallengeValidation(dnsChallenge, accountKeyPair))
  ])
}

const getChallenges = (domain, keypair, authzUrl) =>
  sendSignedRequest({
    resource: 'new-authz',
    identifier: {
      type: 'dns',
      value: domain
    }
  }, keypair, authzUrl)
  .then((data) => validateChallenges(keypair, data.body))

module.exports = getChallenges
