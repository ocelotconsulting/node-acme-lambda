const getRoute53 = require('../sdk/getRoute53')

const getDomainZone = (domain, zones) =>
  zones.HostedZones.find((zone) => zone.Name === `${domain}.`)

const getHostedZoneId = (domain) =>
  getRoute53().listHostedZones().promise()
  .then((zones) => getDomainZone(domain, zones).Id)
  .catch((e) => {
    console.log(`Couldn't retrieve hosted zones from Route53`)
    throw e
  })

module.exports = getHostedZoneId
