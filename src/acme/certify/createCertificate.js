import generateRSAKeyPair from '../../util/generateRSAKeyPair'
import newCertificate from './newCertificate'
import serializeDomain from './serializeDomain'
import generateCSR from '../../util/generateCSR'

const createCertificate = (certUrl, authorizations, domain, userKeypair) =>
  generateRSAKeyPair()
  .then((domainKeypair) =>
    generateCSR(domainKeypair, [domain])
    .then(newCertificate(userKeypair, authorizations, certUrl))
    .then((certData) =>
      serializeDomain({
        domain,
        keypair: domainKeypair,
        cert: certData.cert,
        issuerCert: certData.issuerCert
      })
    )
  )

module.exports = createCertificate
