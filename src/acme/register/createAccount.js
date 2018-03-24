const generateRSAKeyPair = require('../../util/generateRSAKeyPair')
const register = require('./register')
const saveFile = require('../../aws/s3/saveFile')
const config = require('../../../config')

const saveAccount = data => {
  const account = {
    key: data.keypair,
    'url': data.location,
    'agreement': data.agreement
  }
  return saveFile(
    config['s3-account-bucket'],
    config['s3-folder'],
    config['acme-account-file'],
    JSON.stringify(account)
  )
  .then(() => account)
}

const createAccount = acctPromise =>
  generateRSAKeyPair()
  .then(acctPromise)
  .then(saveAccount)

module.exports = createAccount
