const getRoute53 = require('../sdk/getRoute53')

const updateTXTRecord = (hostedZoneId, domain, digest) => {
  const toSend = {
    ChangeBatch: {
      Changes: [
        {
          Action: 'UPSERT',
          ResourceRecordSet: {
            Name: `_acme-challenge.${domain}`,
            Type: 'TXT',
            ResourceRecords: [ { Value: JSON.stringify(digest) } ],
            TTL: 1
          }
        }
      ],
      Comment: 'This value is a computed digest of the token received from the LetsEncrypt challenge.'
    },
    HostedZoneId: hostedZoneId
  }
  return getRoute53().changeResourceRecordSets(toSend).promise()
  .catch((e) => {
    console.log(`Couldn't write TXT record _acme-challenge.${domain}`)
    throw e
  })
}
module.exports = updateTXTRecord
