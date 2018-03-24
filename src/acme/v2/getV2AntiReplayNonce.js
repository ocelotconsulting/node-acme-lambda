const agent = require('superagent')

module.exports = url =>
  agent.head(url)
  .then(data => data.header['replay-nonce'])
