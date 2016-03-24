const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/js/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        SOCKET_LOC: JSON.stringify(process.env.SOCKET_LOC || 'http://www.cape.io/'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        loaders: [ 'babel?cacheDirectory' ],
      },
      { test: /\.json$/, loader: 'json' },
    ],
  },
}
