import generateRSAKeyPair from '../../util/generateRSAKeyPair'
import register from './register'
import saveFile from '../../aws/s3/saveFile'
import config from '../../../config/default.json'

const saveAccount = (data) =>
  saveFile(
    config['s3-account-bucket'],
    config['s3-folder'],
    config['acme-account-file'],
    JSON.stringify({
      key: data.keypair,
      'url': data.location,
      'agreement': data.agreement
    })
  )

const createAccount = (regUrl) =>
  generateRSAKeyPair()
  .then(register(regUrl, config['acme-account-email']))
  .then(saveAccount)

module.exports = createAccount
