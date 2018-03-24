module.exports = buffer =>
  buffer.toString('base64').replace(/[+]/g, '-').replace(/\//g, '_').replace(/=/g, '')
