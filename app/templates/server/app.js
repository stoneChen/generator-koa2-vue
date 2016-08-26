'use strict'
import path from 'path'
import Koa from 'koa'
import logger from 'koa-logger'
import convert from 'koa-convert'
import serve from 'koa-static'
import koaProxy from 'koa-proxy'
import mount from 'koa-mount'
import bodyParser from 'koa-bodyparser'
import views from 'koa-views'
import debug from 'debug'
import routes from './routes'
import IS_DEBUG, { IS_WEBPACK_MIDDLEWARE } from './utils/env'
import proxyConfig from '../proxy.config'
const globalConfig = require('../global.config')

const log = debug('app:log')
const warn = debug('app:warn')
const error = debug('app:error')

const app = new Koa()

log(`current env is ${IS_DEBUG ? 'DEBUG' : 'production'}`)

// trust proxy
app.proxy = true

// log记录
app.use(convert(logger()))

if (IS_WEBPACK_MIDDLEWARE) {
  require('./webpack.middleware')(app)
}

// 开发模式,使用webpack打包js, 静态资源代理到webpack服务, ejs中还是写/public/xxx
// 生产环境根据webpack输出的文件,进行serve
if (IS_DEBUG) {
  // app.use(convert(koaProxy({
  //   host: ['http://', globalConfig.currentIP, ':', globalConfig.webpackDevServerPort].join(''),
  //   match: /^\/public\//,
  //   // 用于禁止cookie缓存
  //   // see https://github.com/request/request#requestoptions-callback
  //   jar: false
  // })))
} else {
  // todo 如果资源不存在, 不要继续downstream, 否则请求会被代理到后端
  app.use(mount('/public', serve(path.join(__dirname, '../public'), {
    // defer: false
  })))
}

// body parser
app.use(bodyParser())

// 外层处理
app.use(async (ctx, next) => {
  try {
    // log('request: `%s`', ctx.request.url)
    await next()
    // log('response for `%s`:\n %s', ctx.request.url, ctx.body.toString('utf-8'))
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.stack
    ctx.app.emit('error', err, ctx)
  }
})

app.use(views(path.join(__dirname, 'views/'), {
  extension: 'ejs',
}))

// 路由配置
app.use(routes.middleware())

// 需要特殊处理的请求,直接在路由中调用ctx.body = xxx即可, 不需要返回async函数

app.use(async (ctx, next) => {
  let path = ctx.url
  if (!path.startsWith('/api/')) {
  warn('request `%s` does not start with `/api`, skipped proxy', path)
  return
}
ctx.url = path.substr(4)
log('request `%s` will be dispatched to `%s` with `%s`', path, proxyConfig.apiHost, ctx.url)
await next()
})
// proxy
app.use(convert(koaProxy({
  host: proxyConfig.apiHost,
  // 用于禁止cookie缓存
  // see https://github.com/request/request#requestoptions-callback
  jar: false
})))

app.on('error', (err) => {
  error('server error: %s', err.stack)
})

let appUrl = ['http://', globalConfig.currentIP, ':', globalConfig.appPort].join('')
// 服务端重启,再次连接上socket后,自动刷新浏览器
if (IS_DEBUG) {
  // socket.io必须拿到通过http模块创建的实例
  let server = require('http').createServer(app.callback())
  require('socket.io')(server)
  server.listen(globalConfig.appPort)
  log('socket.io created.')
  if (IS_WEBPACK_MIDDLEWARE) {
    require('open')(appUrl)
  }
} else {
  app.listen(globalConfig.appPort)
}
log(`App is now listening on ${appUrl}`)

process.on('SIGINT', () => {
  process.exit()
})

export default app
