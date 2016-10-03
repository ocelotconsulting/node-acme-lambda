import config from 'config'
import sendSignedRequest from '../sendSignedRequest'

const getChallenges = (keypair, authzUrl) =>
  sendSignedRequest({
    resource: 'new-authz',
    identifier: {
      type: 'dns',
      value: config.get('acme-site-key')
    }
  }, keypair, authzUrl)
  .then((data) => Promise.resolve(data.body))

module.exports = getChallenges
