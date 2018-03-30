const cert = require('../app.js')

const testContext = {
  succeed: (data) => {
    console.log(`Results are ${JSON.stringify(data)}`)
    process.exit(0)
  }
}

cert.handler({}, testContext)
