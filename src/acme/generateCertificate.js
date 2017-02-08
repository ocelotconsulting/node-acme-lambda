const getDiscoveryUrls = require('./getDiscoveryUrls')
const getAccount = require('./register/getAccount')
const getChallenges = require('./authorize/getChallenges')
const createCertificate = require('./certify/createCertificate')

module.exports = (domain) =>
  getDiscoveryUrls()
  .then((urls) =>
    getAccount(urls['new-reg'])
    .then((account) =>
      getChallenges(domain, account.key, urls['new-authz'])
      .then(createCertificate(urls['new-cert'], domain, account.key))
    )
  )
