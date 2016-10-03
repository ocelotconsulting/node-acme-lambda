import getNonce from './getNonce'
import { RSA } from 'rsa-compat'

import superAgentPromise from 'superagent-promise'
const agent = superAgentPromise(require('superagent'), require('promise'))

const sendSignedRequest = (payload, keypair, url) =>
  getNonce()
  .then((data) => agent.post(url)
    .send(RSA.signJws(keypair, new Buffer(JSON.stringify(payload)), data))
  )

module.exports = sendSignedRequest
