const AWS = require('aws-sdk')
// see https://github.com/ocelotconsulting/node-acme-lambda/issues/9
module.exports = () => new AWS.S3({signatureVersion: 'v4'})
