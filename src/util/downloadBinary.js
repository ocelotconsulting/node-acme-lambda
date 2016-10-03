import superAgentPromise from 'superagent-promise'
const agent = superAgentPromise(require('superagent'), require('promise'))

const parser = (res, callback) => {
  res.data = ''
  res.setEncoding('binary')
  res.on('data', (chunk) => {
    res.data += chunk
  })
  res.on('end', () => {
    callback(null, new Buffer(res.data, 'binary'))
  })
}

module.exports = (url) =>
  agent.get(url)
  .buffer(true).parse(parser).end()
  .then((data) => Promise.resolve(data.body))
