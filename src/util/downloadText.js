const agent = require('superagent')

const parser = (res, callback) => {
  res.data = ''
  res.on('data', (chunk) => {
    res.data += chunk
  })
  res.on('end', () => {
    callback(null, res.data)
  })
}

module.exports = (url) =>
  agent.get(url)
  .buffer(true).parse(parser)
  .then((data) => data.body)
