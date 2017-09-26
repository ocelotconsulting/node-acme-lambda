const RSA = require('rsa-compat').RSA
const promisify = require('es6-promisify')
const config = require('../../config/default.js')

const bitlen = config['acme-account-key-bits']
const exp = 65537
const options = { public: true, pem: true, internal: true }
const generateKeyPair = promisify(RSA.generateKeypair)

const generatePair = () =>
  generateKeyPair(bitlen, exp, options)
  .catch((e) => {
    console.error(`Couldn't generate RSA keypair`, e)
    throw e
  })

module.exports = generatePair
