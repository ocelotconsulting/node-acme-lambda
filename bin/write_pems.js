const readFile = require('../src/aws/s3/readFile')
const config = require('../config/default.js')
const fs = require('fs')

const testContext = {
  succeed: (data) => {
    console.log(data)
    process.exit(0)
  }
}

const getPEMsForCertInfo = (key) =>
  readFile(
    config['s3-cert-bucket'],
    config['s3-folder'],
    `${key}.json`
  )
  .then((data) => JSON.parse(data.Body.toString()))
  .then((certJSON) => {
    console.log(`About to write PEM files for ${key}..`)
    try {
      fs.writeFileSync(`./${key}.pem`, certJSON.cert.toString())
      fs.writeFileSync(`./${key}-chain.pem`, certJSON.issuerCert.toString())
      fs.writeFileSync(`./${key}-key.pem`, certJSON.key.privateKeyPem.toString())
    } catch (e) {
      console.error('Error writing pem files', e)
    }
  })
  .catch()

const getAllPEMs = (sync) =>
  Promise.all(Object.keys(config['certificate-info']).map(getPEMsForCertInfo))
  .then(() => sync.succeed('Wrote PEM files..'))

getAllPEMs(testContext)
