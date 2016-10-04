const getNonce = require('./getNonce')
const RSA = require('rsa-compat').RSA
const agent = require('superagent-promise')(require('superagent'), Promise)

const sendSignedRequest = (payload, keypair, url) =>
  getNonce()
  .then((data) => agent.post(url)
    .send(RSA.signJws(keypair, new Buffer(JSON.stringify(payload)), data))
  )

module.exports = sendSignedRequest
