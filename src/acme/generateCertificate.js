import getDiscoveryUrls from './getDiscoveryUrls'
import getAccount from './register/getAccount'
import getChallenges from './authorize/getChallenges'
import config from '../../config/default.json'
import getCertificate from './certify/getCertificate'

module.exports = () =>
  getDiscoveryUrls()
  .then((urls) =>
    getAccount(urls['new-reg'])
    .then((account) =>
      getChallenges(config['acme-domain'], account.key, urls['new-authz'])
      .then(getCertificate(urls['new-cert'], config['acme-domain'], account.key))
    )
  )
