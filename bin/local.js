const cert = require('../app.js')

const testContext = {
  succeed: (data) => {
    console.log(data)
    process.exit(0)
  }
}

cert.handler({}, testContext)
