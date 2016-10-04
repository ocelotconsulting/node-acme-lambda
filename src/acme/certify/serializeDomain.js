import config from '../../../config/default.json'
import saveFile from '../../aws/s3/saveFile'

const serializeDomain = (data) =>
  saveFile(
    config['s3-cert-bucket'],
    config['s3-folder'],
    `${data.domain}.json`,
    JSON.stringify({
      key: data.keypair,
      cert: data.cert,
      issuerCert: data.issuerCert
    })
  )

module.exports = serializeDomain
