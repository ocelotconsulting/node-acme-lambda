module.exports = domain => {
  const domainName = (typeof domain === 'string') ? domain : domain.name
  console.log(`Sending challenge request for ${domainName}`)
  return sendSignedRequest({
    resource: 'new-authz',
    identifier: {
      type: 'dns',
      value: domainName
    }
  }, keypair, authzUrl)
  .then(data => validateChallenges(domain, keypair, data.body))
}
