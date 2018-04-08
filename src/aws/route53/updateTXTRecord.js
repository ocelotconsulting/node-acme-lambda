const getRoute53 = require('../sdk/getRoute53')

const updateTXTRecord = (hostedZoneId, domain, digests) => {
  const toSend = {
    ChangeBatch: {
      Changes: [
        {
          Action: 'UPSERT',
          ResourceRecordSet: {
            Name: `_acme-challenge.${domain}`,
            Type: 'TXT',
            ResourceRecords: digests.map(digest => ({Value: JSON.stringify(digest)})),
            TTL: 1
          }
        }
      ],
      Comment: 'This value is a computed digest of the token received from the ACME challenge.'
    },
    HostedZoneId: hostedZoneId
  }
  return getRoute53().changeResourceRecordSets(toSend).promise()
  .catch((e) => {
    console.error(`Couldn't write TXT record _acme-challenge.${domain}`, e)
    throw e
  })
}
module.exports = updateTXTRecord
