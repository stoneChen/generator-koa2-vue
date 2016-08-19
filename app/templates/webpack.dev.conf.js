"use strict";

let webpack = require('webpack')
let config = require('./webpack.base.conf')
let globalConfig = require('./global.config')
// let HtmlWebpackPlugin = require('html-webpack-plugin')
// let globalConfig = require('./global.config')
// let ip = require('ip')

// eval-source-map is faster for development
config.devtool = '#eval-source-map'

let PUBLIC_PATH
// 如果webpack是中间件模式,则需要给entry加webpack-hot-middleware/client, 达到hot-reload的效果
if (process.env.WEBPACK_MODE === 'middleware') {
  PUBLIC_PATH = globalConfig.appServerPath
  // add hot-reload related code to entry chunks
  let polyfill = 'eventsource-polyfill'
  let hotClient = 'webpack-hot-middleware/client?reload=true&path=' + PUBLIC_PATH + '/__webpack_hmr'
  Object.keys(config.entry).forEach((name, i) => {
    let extras = i === 0 ? [polyfill, hotClient] : [hotClient]
    config.entry[name] = extras.concat(config.entry[name])
  })
}
// 如果webpack不是中间件模式(独立服务模式),则需要给entry加webpack-dev-server/client, 达到hot-reload的效果
else {
  PUBLIC_PATH = globalConfig.webpackServerPath
  Object.keys(config.entry).forEach((name) => {
    config.entry[name] = [`webpack-dev-server/client?${PUBLIC_PATH}`, config.entry[name]]
  })
}


// necessary for the html plugin to work properly
// when serving the html from in-memory
config.output.publicPath = PUBLIC_PATH + '/public/'

config.module.loaders.push(
  {
    test: /\.css$/,
    loader: "style!css!postcss"
  },
  {
    test: /\.styl/,
    loader: 'style!css!postcss!stylus'
  }
)
config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  // https://github.com/ampedandwired/html-webpack-plugin
  // new HtmlWebpackPlugin({
  //   filename: 'index.html',
  //   template: 'index.template.ejs',
  //   title: globalConfig.pageConfig.title,
  //   favicon: 'src/assets/images/favicon.png',
  //   cache: false,
  //   inject: true,
  // })
])

module.exports = config
