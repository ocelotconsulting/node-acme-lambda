const pq = require('proxyquire').noCallThru()

export default (...args) => {
  args[0] = `../${args[0]}`
  return pq.apply(pq, args)
}
