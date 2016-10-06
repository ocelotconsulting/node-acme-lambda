const getDiscoveryUrls = require('./getDiscoveryUrls')
const getAccount = require('./register/getAccount')
const getChallenges = require('./authorize/getChallenges')
const config = require('../../config/default.json')
const getCertificate = require('./certify/getCertificate')

module.exports = (domain) =>
  getDiscoveryUrls()
  .then((urls) =>
    getAccount(urls['new-reg'])
    .then((account) =>
      getChallenges(domain, account.key, urls['new-authz'])
      .then(getCertificate(urls['new-cert'], domain, account.key))
    )
  )
