const config = require('../../../config/default.json')

module.exports = () => ({
  region: config['region'],
  accessKeyId: config['AWS_ACCESS_KEY_ID'],
  secretAccessKey: config['AWS_SECRET_ACCESS_KEY']
})
