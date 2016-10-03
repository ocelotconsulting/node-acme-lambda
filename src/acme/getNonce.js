import winston from 'winston'
import config from 'config'
import superAgentPromise from 'superagent-promise'
const agent = superAgentPromise(require('superagent'), require('promise'))

const getNonce = () =>
  agent.get(`${config.get('acme-directory-url')}/directory`)
  .end()
  .then((data) => Promise.resolve(data.header['replay-nonce']))
  .catch((e) => {
    winston.error(`Error getting nonce ${JSON.stringify(e)}`)
    throw e
  })

module.exports = getNonce
