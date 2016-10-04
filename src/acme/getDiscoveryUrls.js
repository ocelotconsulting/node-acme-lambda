const config = require('../../config/default.json')
const agent = require('superagent-promise')(require('superagent'), Promise)

const getDiscoveryUrls = (discoveryUrl) =>
  agent.get(`${config['acme-directory-url']}/directory`)
  .then((data) => Promise.resolve(data.body))

module.exports = getDiscoveryUrls
