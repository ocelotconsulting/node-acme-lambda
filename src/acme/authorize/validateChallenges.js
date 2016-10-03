import updateDNSChallenge from './updateDNSChallenge'
import sendDNSChallengeValidationResponse from './sendDNSChallengeValidationResponse'
import _ from 'underscore'

const getDNSChallenge = (challenges) => _.find(challenges, (challenge) => challenge.type === 'dns-01')

const validateChallenges = (accountKeyPair, challengeResponse) => {
  const dnsChallenge = getDNSChallenge(challengeResponse.challenges)
  return Promise.all([
    updateDNSChallenge(dnsChallenge, accountKeyPair)
    .then((data) => sendDNSChallengeValidationResponse(dnsChallenge, accountKeyPair))
  ])
}

module.exports = validateChallenges
