import getCredsObject from './getCredentialsObject'
const AWS = require('aws-sdk')

module.exports = () => new AWS.S3(getCredsObject())
