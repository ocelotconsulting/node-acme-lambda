import generateRSAKeyPair from '../../util/generateRSAKeyPair'
import newCertificate from './newCertificate'
import generateCSR from '../../util/generateCSR'
import config from '../../../config/default.json'
import saveFile from '../../aws/s3/saveFile'

const saveCertificate = (data) =>
  saveFile(
    config['s3-cert-bucket'],
    config['s3-folder'],
    `${data.domain}.json`,
    JSON.stringify({
      key: data.keypair,
      cert: data.cert,
      issuerCert: data.issuerCert
    })
  )

const createCertificate = (certUrl, authorizations, domain, acctKeyPair) =>
  generateRSAKeyPair()
  .then((domainKeypair) =>
    generateCSR(domainKeypair, [domain])
    .then(newCertificate(acctKeyPair, authorizations, certUrl))
    .then((certData) =>
      saveCertificate({
        domain,
        keypair: domainKeypair,
        cert: certData.cert,
        issuerCert: certData.issuerCert
      })
    )
  )

module.exports = createCertificate
