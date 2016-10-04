import getRoute53 from '../sdk/getRoute53'
import config from '../../../config/default.json'

const getDomainZone = (zones) =>
  zones.HostedZones.find((zone) => zone.Name === `${config['acme-domain']}.`)

const getHostedZoneId = () =>
  getRoute53().listHostedZones().promise()
  .then((zones) => Promise.resolve(getDomainZone(zones).Id))
  .catch((e) => {
    console.log(`Couldn't retrieve hosted zones from Route53`)
    throw e
  })

module.exports = getHostedZoneId
