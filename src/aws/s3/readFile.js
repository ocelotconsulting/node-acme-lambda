const getS3 = require('../sdk/getS3')

const readFile = (bucket, siteId, fileName) =>
  getS3().getObject({
    Bucket: bucket,
    Key: `${siteId}/${fileName}`
  }).promise()
  .catch(e => {
    if (e.message.indexOf('does not exist')) {
      console.log(`s3://${bucket}/${siteId}/${fileName} does not exist.`)
    } else {
      console.error(`Couldn't read s3://${bucket}/${siteId}/${fileName}`, e)
    }
    throw e
  })

module.exports = readFile
