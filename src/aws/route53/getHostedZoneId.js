const getRoute53 = require('../sdk/getRoute53')
const config = require('../../../config/default.json')

const getDomainZone = (zones) =>
  zones.HostedZones.find((zone) => zone.Name === `${config['acme-domain']}.`)

const getHostedZoneId = () =>
  getRoute53().listHostedZones().promise()
  .then((zones) => getDomainZone(zones).Id)
  .catch((e) => {
    console.log(`Couldn't retrieve hosted zones from Route53`)
    throw e
  })

module.exports = getHostedZoneId
