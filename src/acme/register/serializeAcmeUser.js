import config from '../../../config/default.json'
import saveFile from '../../aws/s3/saveFile'

const serializeAcmeUser = (data) =>
  saveFile(
    config['s3-config-bucket'],
    'letsencrypt',
    config['acme-user-info-file'],
    JSON.stringify({
      key: data.keypair,
      'url': data.location,
      'agreement': data.agreement
    })
  )

module.exports = serializeAcmeUser
