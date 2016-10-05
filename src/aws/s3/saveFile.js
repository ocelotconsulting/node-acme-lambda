const getS3 = require('../sdk/getS3')

const saveFile = (bucket, siteId, fileName, fileData, options) =>
  getS3().putObject(Object.assign({
    Bucket: bucket,
    Key: `${siteId}/${fileName}`,
    Body: new Buffer(fileData)
  }, options)).promise()
  .catch((e) => {
    console.log(`Couldn't write s3://${bucket}/${siteId}/${fileName}`)
    throw e
  })

module.exports = saveFile
