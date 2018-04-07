const pq = require('proxyquire').noCallThru()

module.exports = (...args) => {
  args[0] = `../${args[0]}`
  return pq.apply(pq, args)
}
