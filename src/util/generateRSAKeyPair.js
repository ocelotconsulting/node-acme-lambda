const RSA = require('rsa-compat').RSA
const promisify = require('es6-promisify')
const config = require('../../config/default.json')

const bitlen = config['acme-account-key-bits']
const exp = 65537
const options = { public: true, pem: true, internal: true }
const generateKeyPair = promisify(RSA.generateKeypair)

const generatePair = () =>
  generateKeyPair(bitlen, exp, options)
  .catch((e) => {
    console.log(`Couldn't generate RSA keypair, error ${JSON.stringify(e)}`)
    throw e
  })

module.exports = generatePair
