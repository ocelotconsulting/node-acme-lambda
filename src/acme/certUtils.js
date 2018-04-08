const toIssuerCert = links =>
  /.*<(.*)>;rel="up".*/.exec(links)[1]

const toStandardB64 = str => {
  var b64 = str.replace(/-/g, '+').replace(/_/g, '/').replace(/=/g, '')
  switch (b64.length % 4) {
    case 2:
      b64 += '=='
      break
    case 3:
      b64 += '='
      break
  }
  return b64
}

const toPEM = cert =>
  `-----BEGIN CERTIFICATE-----\n${toStandardB64(cert.toString('base64')).match(/.{1,64}/g).join('\n')}\n-----END CERTIFICATE-----\n`

module.exports = {toIssuerCert, toPEM, toStandardB64}
