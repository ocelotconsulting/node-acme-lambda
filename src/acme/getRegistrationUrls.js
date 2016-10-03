import config from 'config'
import superAgentPromise from 'superagent-promise'
const agent = superAgentPromise(require('superagent'), require('promise'))

const getRegistrationUrls = (discoveryUrl) =>
  agent.get(`${config.get('acme-directory-url')}/directory`)
  .then((data) => Promise.resolve(data.body))

module.exports = getRegistrationUrls
