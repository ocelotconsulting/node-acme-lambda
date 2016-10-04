const RSA = require('rsa-compat').RSA

const generateCSR = (domainKeypair, domains) => Promise.resolve(RSA.generateCsrDerWeb64(domainKeypair, domains))

module.exports = generateCSR
