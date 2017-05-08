const getS3 = require('../sdk/getS3')

const saveFile = (kmskey, bucket, siteId, fileName, fileData, options) =>
  getS3().putObject(Object.assign({
    Bucket: bucket,
    Key: `${siteId}/${fileName}`,
    ServerSideEncryption: "aws:kms",
    SSEKMSKeyId: ${kmskey},
    Body: new Buffer(fileData)
  }, options)).promise()
  .catch((e) => {
    console.error(`Couldn't write s3://${bucket}/${siteId}/${fileName}`, e)
    throw e
  })

module.exports = saveFile
