import winston from 'winston'
import getS3 from '../sdk/getS3'
import _ from 'underscore'

const saveFile = (bucket, siteId, fileName, fileData, options) =>
  getS3().putObject(_.extend({
    Bucket: bucket,
    Key: `${siteId}/${fileName}`,
    Body: new Buffer(fileData)
  }, options)).promise()
  .catch((e) => {
    winston.error(`Couldn't write ${siteId}/${fileName}`)
    throw e
  })

module.exports = saveFile
