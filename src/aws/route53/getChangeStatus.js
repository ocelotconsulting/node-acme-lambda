const getRoute53 = require('../sdk/getRoute53')

const getChangeStatus = (id) =>
  getRoute53().getChange({Id: id}).promise()
    .then(data => data.Status)

module.exports = getChangeStatus
