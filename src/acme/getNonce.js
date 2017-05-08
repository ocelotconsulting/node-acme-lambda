const config = require('../../config/default.js')
const agent = require('superagent')

const getNonce = () =>
  agent.get(`${config['acme-directory-url']}/directory`)
  .then((data) => data.header['replay-nonce'])
  .catch((e) => {
    console.error(`Error getting nonce`, e)
    throw e
  })

module.exports = getNonce
