const getDiscoveryUrls = require('./getDiscoveryUrls')
const getAccount = require('./register/getAccount')
const getChallenges = require('./authorize/getChallenges')
const config = require('../../config/default.json')
const getCertificate = require('./certify/getCertificate')

module.exports = () =>
  getDiscoveryUrls()
  .then((urls) =>
    getAccount(urls['new-reg'])
    .then((account) =>
      getChallenges(config['acme-domain'], account.key, urls['new-authz'])
      .then(getCertificate(urls['new-cert'], config['acme-domain'], account.key))
    )
  )
