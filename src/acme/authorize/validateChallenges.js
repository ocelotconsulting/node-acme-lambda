import updateDNSChallenge from './updateDNSChallenge'
import sendDNSChallengeValidationResponse from './sendDNSChallengeValidationResponse'

const getDNSChallenge = (challenges) => challenges.find((challenge) => challenge.type === 'dns-01')

const validateChallenges = (accountKeyPair, challengeResponse) => {
  const dnsChallenge = getDNSChallenge(challengeResponse.challenges)
  console.log(`${JSON.stringify(dnsChallenge)}`)
  return Promise.all([
    updateDNSChallenge(dnsChallenge, accountKeyPair)
    .then((data) => sendDNSChallengeValidationResponse(dnsChallenge, accountKeyPair))
  ])
}

module.exports = validateChallenges
