import {RSA} from 'rsa-compat'
import promisify from 'es6-promisify'
import winston from 'winston'
import config from 'config'

const bitlen = config.get('acme-user-key-bits')
const exp = 65537
const options = { public: true, pem: true, internal: true }
const generateKeyPair = promisify(RSA.generateKeypair)

const generatePair = () =>
  generateKeyPair(bitlen, exp, options)
  .catch((e) => {
    winston.error(`Couldn't generate RSA keypair, error ${JSON.stringify(e)}`)
    throw e
  })

module.exports = generatePair
