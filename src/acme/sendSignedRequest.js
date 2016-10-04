import getNonce from './getNonce'
import { RSA } from 'rsa-compat'
const agent = require('superagent-promise')(require('superagent'), Promise)

const sendSignedRequest = (payload, keypair, url) =>
  getNonce()
  .then((data) => agent.post(url)
    .send(RSA.signJws(keypair, new Buffer(JSON.stringify(payload)), data))
  )

module.exports = sendSignedRequest
