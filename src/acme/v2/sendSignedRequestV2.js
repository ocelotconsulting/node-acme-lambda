const getV2AntiReplayNonce = require('./getV2AntiReplayNonce')
const RSA = require('rsa-compat').RSA
const agent = require('superagent')

const sendSignedRequest = (payload, keypair, url, nonceUrl, kid = undefined) =>
  getV2AntiReplayNonce(nonceUrl)
  .then(nonce => {
    const {header} = RSA.signJws(keypair, new Buffer(JSON.stringify(payload)), nonce)
    const toSend = RSA.signJws(keypair, undefined, Object.assign(kid ? {kid, alg: header.alg} : header, {nonce, url}), new Buffer(JSON.stringify(payload)))
    console.log(`Going to send ${JSON.stringify(toSend)}`)
    return agent.post(url)
    .send(toSend)
  })

module.exports = sendSignedRequest
