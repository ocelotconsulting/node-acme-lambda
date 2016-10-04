import updateDNSChallenge from './updateDNSChallenge'
import sendDNSChallengeValidation from './sendDNSChallengeValidation'

const getDNSChallenge = (challenges) => challenges.find((challenge) => challenge.type === 'dns-01')

const validateChallenges = (accountKeyPair, challengeResponse) => {
  const dnsChallenge = getDNSChallenge(challengeResponse.challenges)
  return Promise.all([
    updateDNSChallenge(dnsChallenge, accountKeyPair)
    .then((data) => sendDNSChallengeValidation(dnsChallenge, accountKeyPair))
  ])
}

module.exports = validateChallenges
