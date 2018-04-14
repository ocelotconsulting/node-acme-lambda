const updateTXTRecord = require('../../aws/route53/updateTXTRecord')
const getHostedZoneId = require('../../aws/route53/getHostedZoneId')
const RSA = require('rsa-compat').RSA
const crypto = require('crypto')
const dns = require('dns')
const config = require('../../../config')
const {promisify} = require('util')
const resolveTxt = promisify(dns.resolveTxt)
const urlB64 = require('../urlB64')
const retry = require('../../retry')(config['acme-dns-retry-delay-ms'], config['acme-dns-retry'])

const getTokenDigest = (dnsChallenge, acctKeyPair) =>
  crypto.createHash('sha256').update(`${dnsChallenge.token}.${RSA.thumbprint(acctKeyPair)}`).digest()

const arrayContainsArray = (superset, subset) =>
    subset.every(value => superset.indexOf(value) >= 0)

const flatten = input => Array.prototype.concat.apply([], input)

const dnsPreCheck = (domain, expect) => (tryCount) => {
  console.log(`Attempt ${tryCount + 1} to resolve TXT record for ${domain}`)
  return resolveTxt(`_acme-challenge.${domain}`)
  .then(data => {
    ++tryCount
    return {
      tryCount,
      result: arrayContainsArray(flatten(data), expect)
    }
  })
  .catch(e => {
    if (e.code === 'ENODATA' || e.code === 'ENOTFOUND') {
      ++tryCount
      return { tryCount, result: false }
    } else { throw e }
  })
}

const validateDNSChallenge = (domain, dnsChallengeTexts) =>
  retry(0, dnsPreCheck(domain, dnsChallengeTexts))
  .then(data => {
    if (data.result) {
      return data.result
    } else {
      throw new Error(`Could not pre-validate DNS TXT record. Didn't find ${dnsChallengeTexts} in _acme-challenge.${domain}`)
    }
  })

const updateDNSChallenge = (domain, dnsChallenges, acctKeyPair) => {
  const domainName = (typeof domain === 'string') ? domain : domain.name
  const dnsChallengeTexts = dnsChallenges.map(dnsChallenge => urlB64(getTokenDigest(dnsChallenge, acctKeyPair)))
  return getHostedZoneId(domain)
  .then(id => {
    console.log(`Updating DNS TXT Record for ${domainName} to contain ${dnsChallengeTexts} in Route53 hosted zone ${id}`)
    return updateTXTRecord(id, domainName, dnsChallengeTexts)
  })
  .then(updated => validateDNSChallenge(domainName, dnsChallengeTexts))
  .catch(e => {
    console.error(`Couldn't write token digest to DNS record.`, e)
    throw e
  })
}

module.exports = updateDNSChallenge
