const getDiscoveryUrls = require('./getDiscoveryUrls')
const getAccount = require('./register/getAccount')
const getChallenges = require('./authorize/getChallenges')
const createCertificate = require('./certify/createCertificate')

module.exports = (certInfo) =>
  getDiscoveryUrls()
  .then((urls) =>
    getAccount(urls['new-reg'])
    .then((account) =>
      getChallenges(certInfo.domains, account.key, urls['new-authz'])
      .then(createCertificate(urls['new-cert'], certInfo, account.key))
    )
  )
