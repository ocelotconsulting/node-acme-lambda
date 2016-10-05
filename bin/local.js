var cert = require("../app.js")

var testContext = {
  succeed: function succeed(data) {
    console.log(data)
    process.exit(0)
  }
};

cert.handler({}, testContext)
