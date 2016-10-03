import winston from 'winston'
import config from 'config'
import readFile from '../../aws/s3/readFile'
import createAcmeUser from './createAcmeUser'

const getUser = (regUrl) =>
  readFile(
    config.get('s3-config-bucket'),
    'letsencrypt',
    config.get('acme-user-info-file')
  )
  .then((data) => Promise.resolve(JSON.parse(data.Body.toString())))
  .catch((e) => {
    winston.error(`Couldn't read user config file`)
    return createAcmeUser(regUrl)
  })

module.exports = getUser
