const sendSignedRequestV2 = require('./sendSignedRequestV2')

module.exports = (domains, keypair, orderUrl, nonceUrl, url) => {
  console.log(`Submitting new order to ${orderUrl} for ${JSON.stringify(domains)}`)
  return sendSignedRequestV2({
    "identifiers": domains.map(domain =>
      typeof domain === 'object'
        ? ({"type": "dns", "value": domain.name})
        : ({"type": "dns", "value": domain})
      )
  }, keypair, orderUrl, nonceUrl, url)
  .then(data => data.header['location'])
  .catch(err => {
    if (err.response && err.response.text) {
      const detailObj = JSON.parse(err.response.text)
      if (detailObj.detail && detailObj.detail.indexOf('redundant') > -1) {
        console.log(`Fatal error, thought we would show it to you: ${detailObj.detail}`)
      }
    }
    throw err
  })
}
