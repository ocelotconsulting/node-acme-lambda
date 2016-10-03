import {RSA} from 'rsa-compat'

const generateCSR = (domainKeypair, domains) => Promise.resolve(RSA.generateCsrDerWeb64(domainKeypair, domains))

module.exports = generateCSR
