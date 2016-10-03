import generateRSAKeyPair from '../../util/generateRSAKeyPair'
import register from './register'
import serializeAcmeUser from './serializeAcmeUser'
import config from 'config'

const createAcmeUser = (regUrl) =>
  generateRSAKeyPair()
  .then(register(regUrl, config.get('acme-user-email')))
  .then(serializeAcmeUser)

module.exports = createAcmeUser
