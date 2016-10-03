import config from 'config'
import readFile from '../aws/s3/readFile'
import forge from 'node-forge'
import winston from 'winston'

const diffDays = (certExpiration, now) =>
  Math.round(Math.abs((certExpiration.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)))

const certInValid = (cert, date) =>
  (cert.notBefore > date > cert.notAfter || diffDays(new Date(cert.validity.notAfter), date) < 30)

module.exports = (domain) =>
  readFile(
    config.get('s3-cert-bucket'),
    'letsencrypt',
    `letsencrypt_${domain}.json`
  )
  .then((data) => {
    const domain = JSON.parse(data.Body.toString())
    return Promise.resolve(certInValid(forge.pki.certificateFromPem(domain.cert), new Date()))
  })
  .catch((e) => {
    winston.error(`Error while calculating cert expiration`)
    if (e.statusCode === 404) {
      return true
    }
    throw e
  })
