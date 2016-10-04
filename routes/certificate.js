const generateCertificate = require('../src/acme/generateCertificate')
const isExpired = require('../src/util/isExpired')
const config = require('../config/default.json')

const runHandler = (expired) => (expired ? generateCertificate() : Promise.resolve({msg: 'Certificate is still valid, going back to bed.'}))

module.exports = (req, res, next) => {
  isExpired(config['acme-domain'])
  .then(runHandler)
  .then((data) => {
    res.send(data)
  })
  .catch(next)
}
