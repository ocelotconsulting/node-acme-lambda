const RSA = require('rsa-compat').RSA

const generateCSR = (domainKeypair, domains) => {
  const domainNames = domains.map((domain) => (typeof domain === 'string') ? domain : domain.name)
  console.log(`Creating CSR for ${JSON.stringify(domainNames)}`)
  return Promise.resolve(RSA.generateCsrDerWeb64(domainKeypair, domainNames))
}

module.exports = generateCSR
