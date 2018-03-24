const agent = require('superagent')
const {validateV2Challenges} = require('../authorize/getChallenges')
const updateDNSChallenge = require('../authorize/updateDNSChallenge')
const sendV2DNSChallengeValidation = require('./sendV2DNSChallengeValidation')

const getDNSChallenge = (challenges) => challenges.find((challenge) => challenge.type === 'dns-01')

const validateChallenges = (domain, accountKeyPair, challengeResponse, nonceUrl, url) => {
  const dnsChallenge = getDNSChallenge(challengeResponse.challenges)
  return Promise.all([
    updateDNSChallenge(challengeResponse.identifier.value, dnsChallenge, accountKeyPair)
    .then(() => sendV2DNSChallengeValidation(dnsChallenge, accountKeyPair, nonceUrl, url))
  ])
}

module.exports = (domains, keypair, nonceUrl, url) => orderInfoUrl =>
  agent.get(orderInfoUrl)
  .then(({body}) =>
    Promise.all(domains.map((domain, idx) =>
      agent.get(body.authorizations[idx])
      .then(({body: authBody}) => validateChallenges(domain, keypair, authBody, nonceUrl, url))
    ))
    .then(() => body.finalize)
  )
  .catch((err) => {
    console.error('Experienced error getting challenges', err)
    throw err
  })
