const readFile = require('../src/aws/s3/readFile')
const config = require('../config/default.json')
const fs = require('fs')

const testContext = {
  succeed: function succeed(data) {
    console.log(data)
    process.exit(0)
  }
}

const getPEMs = (sync) =>
  readFile(
    config['s3-cert-bucket'],
    config['s3-folder'],
    `${config['acme-domain']}.json`
  )
  .then((data) => JSON.parse(data.Body.toString()))
  .then((certJSON) => {
    console.log('About to write PEM files..')
    try {
      fs.writeFileSync(`./${config['acme-domain']}.pem`, certJSON.cert.toString())
      fs.writeFileSync(`./${config['acme-domain']}-chain.pem`, certJSON.issuerCert.toString())
    } catch (e) {
      console.log(JSON.stringify(e.stack))
    }
    sync.succeed('Wrote PEM files..')
  })

getPEMs(testContext)
