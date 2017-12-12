const defaultCertInfo = {
  'cert-name1': ['<first-domain-needing-certificate>', '<second-domain-needing-certificate>', {'name': '<route-with.three.levels.com>', 'zoneLevels': 3}],
  'cert-name2': ['<third-domain-needing-certificate>', '<fourth-domain-needing-certificate>']
}

module.exports = {
  's3-account-bucket': process.env.S3_ACCOUNT_BUCKET || '<your-s3-account-config-bucket>',
  's3-cert-bucket': process.env.S3_CERT_BUCKET || '<your-s3-ssl-cert-bucket>',
  's3-folder': process.env.S3_CERT_FOLDER || '<folder-under-bucket>',
  'certificate-info': process.env.S3_CERT_INFO ? JSON.parse(process.env.S3_CERT_INFO) : defaultCertInfo,
  'acme-dns-retry': 30,
  'acme-dns-retry-delay-ms': 2000,
  'acme-account-file': process.env.ACME_ACCOUNT_FILE || '<where-to-save-generated-account-registration>',
  'acme-account-email': process.env.ACME_ACCOUNT_EMAIL || '<email-of-responsible-person>',
  'acme-account-key-bits': 2048,
  'acme-directory-url': process.env.USE_PRODUCTION ? 'https://acme-v01.api.letsencrypt.org' : 'https://acme-staging.api.letsencrypt.org',
  'region': process.env.AWS_REGION || 'us-east-1'
}
