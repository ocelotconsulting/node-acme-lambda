import winston from 'winston'
import getRoute53 from '../sdk/getRoute53'
import _ from 'underscore'
import config from 'config'

const getDomainZone = (zones) =>
  _.find(zones.HostedZones,
    (zone) => zone.Name === `${config.get('acme-site-key')}.`
  )

const getHostedZoneId = () =>
  getRoute53().listHostedZones().promise()
  .then((zones) => Promise.resolve(getDomainZone(zones).Id))
  .catch((e) => {
    winston.error(`Couldn't retrieve hosted zones from Route53`)
    throw e
  })

module.exports = getHostedZoneId
