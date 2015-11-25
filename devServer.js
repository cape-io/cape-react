const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config.dev')

const app = new express()
const compiler = webpack(config)

const port = 3000

app.use(webpackDevMiddleware(
  compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }
))
app.use(webpackHotMiddleware(compiler))

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))

app.use(express.static('static'))

// Respond to everything else with index.html
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, config.output.publicPath, 'index.html'))
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
