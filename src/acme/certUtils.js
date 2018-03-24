const toIssuerCert = (links) => {
  const match = /.*<(.*)>;rel="up".*/.exec(links)
  return match[1]
}

const toStandardB64 = (str) => {
  var b64 = str.replace(/-/g, '+').replace(/_/g, '/').replace(/=/g, '')
  switch (b64.length % 4) {
    case 2: b64 += '=='; break
    case 3: b64 += '='; break
  }
  return b64
}

const toPEM = (cert) => {
  cert = toStandardB64(cert.toString('base64'))
  cert = cert.match(/.{1,64}/g).join('\n')
  return `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`
}

module.exports = {toIssuerCert, toPEM, toStandardB64}
