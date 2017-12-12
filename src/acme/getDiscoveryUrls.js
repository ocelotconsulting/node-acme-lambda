const config = require('../../config')
const agent = require('superagent')

const getDiscoveryUrls = (discoveryUrl) =>
  agent.get(`${config['acme-directory-url']}/directory`)
  .then((data) => data.body)

module.exports = getDiscoveryUrls
