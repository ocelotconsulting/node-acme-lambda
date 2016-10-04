import generateRSAKeyPair from '../../util/generateRSAKeyPair'
import register from './register'
import serializeAcmeUser from './serializeAcmeUser'
import config from '../../../config/default.json'

const createAcmeUser = (regUrl) =>
  generateRSAKeyPair()
  .then(register(regUrl, config['acme-user-email']))
  .then(serializeAcmeUser)

module.exports = createAcmeUser
