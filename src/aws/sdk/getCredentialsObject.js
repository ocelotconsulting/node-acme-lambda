import config from 'config'

module.exports = () => ({
  region: config.get('region'),
  accessKeyId: config.get('AWS_ACCESS_KEY_ID'),
  secretAccessKey: config.get('AWS_SECRET_ACCESS_KEY')
})
