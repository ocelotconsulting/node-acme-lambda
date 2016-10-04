import getDiscoveryUrls from './getDiscoveryUrls'
import getUser from './register/getUser'
import getChallenges from './authorize/getChallenges'
import validateChallenges from './authorize/validateChallenges'
import getCertificate from './certify/getCertificate'

module.exports = () =>
  getDiscoveryUrls()
  .then((urls) =>
    getUser(urls['new-reg'])
    .then((account) =>
      getChallenges(account.key, urls['new-authz'])
      .then((challenges) =>
        validateChallenges(account.key, challenges)
        .then(getCertificate(urls['new-cert'], challenges.identifier.value, account.key))
      )
    )
  )
