import config from '../../../config/default.json'
import sendSignedRequest from '../sendSignedRequest'

const getChallenges = (keypair, authzUrl) =>
  sendSignedRequest({
    resource: 'new-authz',
    identifier: {
      type: 'dns',
      value: config['acme-domain']
    }
  }, keypair, authzUrl)
  .then((data) => Promise.resolve(data.body))

module.exports = getChallenges
