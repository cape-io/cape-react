const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config.dev')

module.exports = function (app) {
  const compiler = webpack(config)
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
}
