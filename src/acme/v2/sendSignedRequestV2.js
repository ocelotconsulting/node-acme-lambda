const getV2AntiReplayNonce = require('./getV2AntiReplayNonce')
const RSA = require('rsa-compat').RSA
const agent = require('superagent')

const sendSignedRequest = (payload, keypair, url, nonceUrl, kid = null) =>
  getV2AntiReplayNonce(nonceUrl)
  .then(nonce => {
    const {header} = RSA.signJws(keypair, new Buffer(JSON.stringify(payload)), nonce)
    const toSend = RSA.signJws(keypair, undefined, Object.assign(kid ? {kid, alg: header.alg} : header, {nonce, url}), new Buffer(JSON.stringify(payload)))
    return agent.post(url)
    .type('application/jose+json')
    .send(toSend)
    // .catch(err => { for extra debug you can uncomment this block for v2 cases
    //   console.log(`The error was ${JSON.stringify(err.response)}`)
    //   throw err
    // })
  })

module.exports = sendSignedRequest
