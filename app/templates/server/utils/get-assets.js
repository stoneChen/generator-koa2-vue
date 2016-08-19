import IS_DEBUG, { IS_WEBPACK_MIDDLEWARE } from './env'
let globalConfig = require('../../global.config')

export default function () {
  if (IS_DEBUG) {
    // 如果webpack是中间件模式, 则取app服务的地址, 否则取webpack-dev-server的地址
    let prefix = IS_WEBPACK_MIDDLEWARE ? globalConfig.appServerPath : globalConfig.webpackServerPath
    return {
      js: `${prefix}/public/app.js`
    }
  }
  return require('../../webpack.assets.json').app
}
