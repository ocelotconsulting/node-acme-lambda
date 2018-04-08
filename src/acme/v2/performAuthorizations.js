const agent = require('superagent')
const {validateV2Challenges} = require('../authorize/getChallenges')
const updateDNSChallenge = require('../authorize/updateDNSChallenge')
const sendV2DNSChallengeValidation = require('./sendV2DNSChallengeValidation')

const getDNSChallenge = (challenges) => challenges.find((challenge) => challenge.type === 'dns-01')

const consolidateChallenges = authBodies =>
  authBodies.reduce((acc, curr) => {
    const dnsChallenge = getDNSChallenge(curr.challenges)
    if (acc[curr.identifier.value]) {
      acc[curr.identifier.value].push(dnsChallenge)
    } else {
      acc[curr.identifier.value] = [dnsChallenge]
    }
    return acc
  }, {})

const validateChallenges = (accountKeyPair, nonceUrl, url) => challenges =>
  Promise.all(Object.keys(challenges).map(txtName =>
    updateDNSChallenge(txtName, challenges[txtName], accountKeyPair)
    .then(() => sendV2DNSChallengeValidation(challenges[txtName], accountKeyPair, nonceUrl, url))
  ))

module.exports = (keypair, nonceUrl, url) => orderInfoUrl =>
  agent.get(orderInfoUrl)
  .then(({body}) =>
    Promise.all(body.authorizations.map(authUrl =>
      agent.get(authUrl)
      .then(({body: authBody}) => authBody)
    ))
    .then(consolidateChallenges)
    .then(validateChallenges(keypair, nonceUrl, url))
    .then(() => body.finalize)
  )
  .catch((err) => {
    console.error('Experienced error getting challenges', err)
    throw err
  })
