const getRoute53 = require('../sdk/getRoute53')

const getDomainZone = (domain, zones) =>
  zones.HostedZones.find((zone) => zone.Name === `${domain}.`)

const getHostedZoneId = (domain) => {
  if (typeof domain == 'object' && domain.zoneId) {
    return Promise.resolve(domain.zoneId)
  }

  const domainName = (typeof domain === 'string') ? domain : domain.name
  const zoneLevels = (typeof domain === 'object' && domain.zoneLevels)
    ? domain.zoneLevels
    : 2
  return getRoute53().listHostedZones().promise()
  .then((zones) => getDomainZone(domainName.split('.').slice(-1 * zoneLevels).join('.'), zones).Id)
  .catch((e) => {
    console.error(`Couldn't retrieve hosted zones from Route53`, e)
    throw e
  })
}

module.exports = getHostedZoneId
