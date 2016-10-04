import {RSA} from 'rsa-compat'
import promisify from 'es6-promisify'
import config from '../../config/default.json'

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
