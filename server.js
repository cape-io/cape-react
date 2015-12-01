const path = require('path')
const express = require('express')

const app = new express()

const port = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
  require('./devServer')(app)
}

app.use(express.static('static'))

// Respond to everything else with index.html
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, 'static', 'index.html'))
})

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
