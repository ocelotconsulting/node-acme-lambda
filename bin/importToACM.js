const readFile = require('../src/aws/s3/readFile')
const getACM = require('../src/aws/sdk/getACM')
const config = require('../config')

const testContext = {
  succeed: (data) => {
    console.log(data)
    process.exit(0)
  }
}
const getPEMsForImport = (key) =>
  readFile(
    config['s3-cert-bucket'],
    config['s3-folder'],
    `${key}.json`
  )
  .then((data) => JSON.parse(data.Body.toString()))
  .then(({cert, issuerCert, key: {privateKeyPem}}) => {
    console.log(`About to import PEM files for ${key} to ACM..`)
    return getACM().importCertificate(Object.assign({
      Certificate: cert.toString(),
      PrivateKey: privateKeyPem.toString()}, {CertificateChain: issuerCert ? issuerCert.toString() : undefined})).promise()
    .then(({CertificateArn}) => console.log(`Successfully imported certificate, ARN: ${CertificateArn}`))
    .catch(err => console.error(`Error importing certificate to ACM.`, err))
  })

const importAllPEMs = (sync) =>
  Promise.all(Object.keys(config['certificate-info']).map(getPEMsForImport))
  .then(() => sync.succeed('Imported PEM files..'))

importAllPEMs(testContext)
