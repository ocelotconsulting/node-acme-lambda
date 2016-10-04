const getCredsObject = require('./getCredentialsObject')
const AWS = require('aws-sdk')

module.exports = () => new AWS.Route53(getCredsObject())
