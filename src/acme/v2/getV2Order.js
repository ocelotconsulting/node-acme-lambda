const sendSignedRequestV2 = require('./sendSignedRequestV2')

module.exports = (domains, keypair, orderUrl, nonceUrl, url) => {
  console.log(`Submitting new order to ${orderUrl} for ${JSON.stringify(domains)}`)
  return sendSignedRequestV2({
    "identifiers": domains.map(domain => ({"type": "dns", "value": domain}))
  }, keypair, orderUrl, nonceUrl, url)
  .then(data => data.header['location'])
}
