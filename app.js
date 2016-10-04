'use strict';

const express = require('express')

const app = express()
app.use('/certificate', require('./routes/certificate'))

app.listen(process.env.PORT || 3000)

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(JSON.stringify(err))
})
