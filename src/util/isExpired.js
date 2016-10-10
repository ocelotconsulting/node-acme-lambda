const config = require('../../config/default.json')
const readFile = require('../aws/s3/readFile')
const forge = require('node-forge')

const diffDays = (certExpiration, now) =>
  Math.round(Math.abs((certExpiration.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)))

const certInValid = (cert, date) =>
  (cert.notBefore > date > cert.notAfter || diffDays(new Date(cert.validity.notAfter), date) < 30)

module.exports = (domain) =>
  readFile(
    config['s3-cert-bucket'],
    config['s3-folder'],
    `${domain}.json`
  )
  .then((data) =>
    certInValid(forge.pki.certificateFromPem(JSON.parse(data.Body.toString()).cert), new Date())
  )
  .catch((e) => {
    if (e.statusCode === 404) {
      console.log(`Certificate is missing, going to regenerate.`)
      return true
    }
    console.log(`Error while calculating cert expiration`)
    throw e
  })
