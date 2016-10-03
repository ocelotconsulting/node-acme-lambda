import winston from 'winston'
import getS3 from '../sdk/getS3'

const readFile = (bucket, siteId, fileName) =>
  getS3().getObject({
    Bucket: bucket,
    Key: `${siteId}/${fileName}`
  }).promise()
  .catch((e) => {
    winston.error(`Couldn't read ${siteId}/${fileName}`)
    throw e
  })

module.exports = readFile
