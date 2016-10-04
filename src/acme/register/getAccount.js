const config = require('../../../config/default.json')
const readFile = require('../../aws/s3/readFile')
const createAccount = require('./createAccount')

const getAccount = (regUrl) =>
  readFile(
    config['s3-account-bucket'],
    config['s3-folder'],
    config['acme-account-file']
  )
  .then((data) => Promise.resolve(JSON.parse(data.Body.toString())))
  .catch((e) => {
    console.log(`Couldn't read user config file`)
    return createAccount(regUrl)
  })

module.exports = getAccount
