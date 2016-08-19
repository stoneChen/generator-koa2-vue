import fetch from 'isomorphic-fetch'
import URL from 'url'
import config from '../../proxy.config.js'
import debug from 'debug'
import beautifyJSON from '../utils/beautify-json'

let log = debug('app:http:log')

const { apiHost } = config

function request(ctx, url, options = {}) {
  options.headers = options.headers || {}
  return new Promise((resolve, reject) => {
    // 读取ctx中的cookie设置到新的请求中
    options.headers.cookie = ctx.req.headers.cookie
    options.headers.Accept = 'application/json; charset=utf-8'
    options.headers['Content-Type'] = 'application/json; charset=utf-8'
    options.headers.pragma = 'no-cache'
    options.headers['cache-control'] = 'no-cache'

    options.body = JSON.stringify(options.body)
    // 非常重要!!! 否则所有cookie都将失效
    options.credentials = 'same-origin'
    log('new server http request: `%s`, headers: %s', url, beautifyJSON(options.headers))
    fetch(apiHost + url, options)
      .then(resp => {
        let msg
        if (resp.status !== 200) {
          switch (resp.status) {
            case 401:
              msg = '请登录'
              break
            case 404:
              msg = `请求地址出错: ${url}`
              break
            case 500:
              msg = '服务器错误'
              break
            case 503:
              msg = '服务器错误'
              break
            default:
              msg = '未知错误'
          }

          throw new Error(msg)
        }
        return resp.text()
      })
      .then(jsonStr => {
        // console.log('fetch result jsonStr:', jsonStr)
        try {
          // 为了解决大于号小于号被转义的问题,把转义过的转回正常值,再交给框架处理.,框架自动处理xss
          jsonStr = jsonStr.replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
          resolve(JSON.parse(jsonStr))
        } catch (e) {
          reject(e)
        }
      })
      // fetch 的catch, 目前只发现断网会触发
      .catch(err => {
        reject(err)
      })
  })
}

export function get (ctx, url, options = {}) {
  console.log(ctx.url)
  url = URL.format({
    pathname: url,
    query: options.params,
  })
  return request(ctx, url, options)
}

export function post (ctx, url, options = {}) {
  options.method = 'POST'
  console.log(ctx.url)
  url = URL.format({
    pathname: url,
    query: options.params,
  })
  return request(ctx, url, options)
}