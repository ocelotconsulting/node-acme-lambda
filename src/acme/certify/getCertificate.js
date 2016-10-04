import config from '../../../config/default.json'
import readFile from '../../aws/s3/readFile'
import createCertificate from './createCertificate'

const getCertificate = (certUrl, domain, userKeypair) => (authorizations) =>
  readFile(
    config['s3-cert-bucket'],
    config['s3-folder'],
    `${domain}.json`
  )
  .then((data) => Promise.resolve(JSON.parse(data.Body.toString())))
  .catch((e) => {
    console.log(`Creating domain since couldn't read letsencrypt/${domain}.json`)
    return createCertificate(certUrl, authorizations, domain, userKeypair)
  })

module.exports = getCertificate
