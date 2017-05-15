const cert = require('../app.js')

const testContext = {
  succeed: (data) => {
    console.log(data)
    process.exit(0)
  },
  fail: (data) => {
    console.error(data)
    process.exit(1)
  }
}

cert.handler({}, testContext)
