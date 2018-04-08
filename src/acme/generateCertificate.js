const getDiscoveryUrls = require('./getDiscoveryUrls')
const getAccount = require('./register/getAccount')
const getChallenges = require('./authorize/getChallenges')
const createCertificate = require('./certify/createCertificate')
const getV2Order = require('./v2/getV2Order')
const newAccount = require('./v2/newAccount')
const register = require('./register/register')
const performAuthorizations = require('./v2/performAuthorizations')
const createV2Certificate = require('./v2/createV2Certificate')

const v1ACME = (urls, certInfo) =>
  getAccount(register(urls['new-reg']))
  .then(account =>
    getChallenges(certInfo.domains, account.key, urls['new-authz'])
    .then(createCertificate(urls['new-cert'], certInfo, account.key))
  )

const v2ACME = (urls, certInfo) =>
  getAccount(newAccount(urls['newAccount'], urls['newNonce']))
  .then(account =>
    getV2Order(certInfo.domains, account.key, urls['newOrder'], urls['newNonce'], account.url)
    .then(performAuthorizations(account.key, urls['newNonce'], account.url))
    .then(createV2Certificate(certInfo, account.key, urls['newNonce'], account.url))
  )

module.exports = certInfo =>
  getDiscoveryUrls()
  .then(urls =>
    Object.keys(urls).includes('new-authz')
      ? v1ACME(urls, certInfo)
      : v2ACME(urls, certInfo)
  )
