import generateRSAKeyPair from '../../util/generateRSAKeyPair'
import register from './register'
import saveFile from '../../aws/s3/saveFile'
import config from '../../../config/default.json'

const saveUser = (data) =>
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

const createUser = (regUrl) =>
  generateRSAKeyPair()
  .then(register(regUrl, config['acme-account-email']))
  .then(saveUser)

module.exports = createUser
