import generateCertificate from '../src/acme/generateCertificate'
import isExpired from '../src/util/isExpired'
import config from '../config/default.json'

const runHandler = (expired) => (expired ? generateCertificate() : Promise.resolve({msg: 'Certificate is still valid, going back to bed.'}))

module.exports = (req, res, next) => {
  isExpired(config['acme-site-key'])
  .then(runHandler)
  .then((data) => {
    res.send(data)
  })
  .catch(next)
}
