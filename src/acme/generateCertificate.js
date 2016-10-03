import getRegistrationUrls from './getRegistrationUrls'
import getUser from './register/getUser'
import getChallenges from './authorize/getChallenges'
import validateChallenges from './authorize/validateChallenges'
import getDomainCertificate from './certify/getDomainCertificate'

module.exports = () =>
  getRegistrationUrls()
  .then((urls) =>
    getUser(urls['new-reg'])
    .then((account) =>
      getChallenges(account.key, urls['new-authz'])
      .then((challenges) =>
        validateChallenges(account.key, challenges)
        .then(getDomainCertificate(urls['new-cert'], challenges.identifier.value, account.key))
      )
    )
  )
