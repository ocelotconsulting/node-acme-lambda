const AWS = require('aws-sdk')
const config = require('../../../config')

module.exports = () => new AWS.ACM({region: config.region})
