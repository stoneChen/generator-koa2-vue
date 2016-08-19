// webpack-dev-server.js 也需要用到,没有用babel, 所以没有用export default
const baseConfig = {
  currentIP: require('ip').address(),
  appPort: 9001,
  webpackDevServerPort: 9002,
}

module.exports = Object.assign(baseConfig, {
  appServerPath: ['http://', baseConfig.currentIP, ':', baseConfig.appPort].join(''),
  webpackServerPath: ['http://', baseConfig.currentIP, ':', baseConfig.webpackDevServerPort].join('')
})