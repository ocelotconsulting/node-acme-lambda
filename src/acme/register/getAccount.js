const config = require('../../../config/default.js')
const readFile = require('../../aws/s3/readFile')
const createAccount = require('./createAccount')

const getAccount = (regUrl) =>
  readFile(
    config['s3-account-bucket'],
    config['s3-folder'],
    config['acme-account-file']
  )
  .then((data) => JSON.parse(data.Body.toString()))
  .catch(() => {
    console.log(`Creating user config file since couldn't read s3://${config['s3-account-bucket']}/${config['s3-folder']}/${config['acme-account-file']}`)
    return createAccount(regUrl)
  })

module.exports = getAccount
