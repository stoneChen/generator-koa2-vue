import convert from 'koa-convert'
import webpack from 'webpack'
import webpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'
import webpackDevConfig from '../webpack.dev.conf'
import debug from 'debug'

const log = debug('app:webpack-middleware:log')
const compiler = webpack(webpackDevConfig)

module.exports = function (app) {
  app.use(convert(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  })))
  app.use(convert(webpackHotMiddleware(compiler)))
  log('Webpack middleware used!')
}