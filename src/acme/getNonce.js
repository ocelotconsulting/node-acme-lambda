const config = require('../../config/default.json')
const agent = require('superagent-promise')(require('superagent'), Promise)

const getNonce = () =>
  agent.get(`${config['acme-directory-url']}/directory`)
  .end()
  .then((data) => data.header['replay-nonce'])
  .catch((e) => {
    console.log(`Error getting nonce ${JSON.stringify(e)}`)
    throw e
  })

module.exports = getNonce
