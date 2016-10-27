const readFile = require('../src/aws/s3/readFile')
const config = require('../config/default.json')
const fs = require('fs')

const testContext = {
  succeed: function succeed(data) {
    console.log(data)
    process.exit(0)
  }
}

const getPEMsForDomain = (domain) =>
  readFile(
    config['s3-cert-bucket'],
    config['s3-folder'],
    `${domain}.json`
  )
  .then((data) => JSON.parse(data.Body.toString()))
  .then((certJSON) => {
    console.log(`About to write PEM files for ${domain}..`)
    try {
      fs.writeFileSync(`./${domain}.pem`, certJSON.cert.toString())
      fs.writeFileSync(`./${domain}-chain.pem`, certJSON.issuerCert.toString())
      fs.writeFileSync(`./${domain}-key.pem`, certJSON.key.privateKeyPem.toString())
    } catch (e) {
      console.log(JSON.stringify(e.stack))
    }
  })
  .catch()

const getAllPEMs = (sync) =>
  Promise.all(config['acme-domains'].map(getPEMsForDomain))
  .then(() => sync.succeed('Wrote PEM files..'))


getAllPEMs(testContext)
