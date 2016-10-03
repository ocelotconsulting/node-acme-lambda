import config from 'config'
import saveFile from '../../aws/s3/saveFile'

const serializeAcmeUser = (data) =>
  saveFile(
    config.get('s3-config-bucket'),
    'letsencrypt',
    config.get('acme-user-info-file'),
    JSON.stringify({
      key: data.keypair,
      'url': data.location,
      'agreement': data.agreement
    })
  )

module.exports = serializeAcmeUser
