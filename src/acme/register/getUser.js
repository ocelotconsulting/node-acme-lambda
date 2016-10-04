import config from '../../../config/default.json'
import readFile from '../../aws/s3/readFile'
import createAcmeUser from './createAcmeUser'

const getUser = (regUrl) =>
  readFile(
    config['s3-config-bucket'],
    'letsencrypt',
    config['acme-user-info-file']
  )
  .then((data) => Promise.resolve(JSON.parse(data.Body.toString())))
  .catch((e) => {
    console.log(`Couldn't read user config file`)
    return createAcmeUser(regUrl)
  })

module.exports = getUser
