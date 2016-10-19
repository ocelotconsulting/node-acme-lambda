const getRoute53 = require('../sdk/getRoute53')

const getDomainZone = (domain, zones) =>
  zones.HostedZones.find((zone) => zone.Name === `${domain}.`)

const getHostedZoneId = (domain) => {
  return getRoute53().listHostedZones().promise()
  .then((zones) => {
    console.log(`The zones are ${JSON.stringify(zones)}`)
    return getDomainZone(domain.split('.').slice(-2).join('.'), zones).Id
  })
  .catch((e) => {
    console.log(`Couldn't retrieve hosted zones from Route53`)
    throw e
  })
}

module.exports = getHostedZoneId
