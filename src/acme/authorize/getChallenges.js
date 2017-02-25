const sendSignedRequest = require('../sendSignedRequest')
const updateDNSChallenge = require('./updateDNSChallenge')
const sendDNSChallengeValidation = require('./sendDNSChallengeValidation')

const getDNSChallenge = (challenges) => challenges.find((challenge) => challenge.type === 'dns-01')

const validateChallenges = (domain, accountKeyPair, challengeResponse) => {
  const dnsChallenge = getDNSChallenge(challengeResponse.challenges)
  return Promise.all([
    updateDNSChallenge(domain, dnsChallenge, accountKeyPair)
    .then(() => sendDNSChallengeValidation(dnsChallenge, accountKeyPair))
  ])
}

const getChallenges = (domains, keypair, authzUrl) =>
  Promise.all(
    domains.map((domain) =>
      sendSignedRequest({
        resource: 'new-authz',
        identifier: {
          type: 'dns',
          value: domain
        }
      }, keypair, authzUrl)
      .then((data) => validateChallenges(domain, keypair, data.body))
    )
  )
  .catch((err) => {
    console.error('Experienced error getting challenges', err)
    throw err
  })

module.exports = getChallenges
