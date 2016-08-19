import 'normalize.css'
import './utils/responsive'
import FastClick from 'fastclick'
FastClick.attach(document.body)
import './config'
import App from 'views/app.vue'
import router from './router'
import IS_DEBUG from './utils/env'

router.start(App, '#app')

// 服务端重启,再次连接上socket后,自动刷新浏览器
if (IS_DEBUG) {
  require(['socket.io-client'], (socket) => {
    let io = socket()
    // 重新建立连接后,自动刷新浏览器, 感谢王珏提出的宝贵建议
    io.on('reconnect', () => {
      location.reload()
    })
    io.on('connect', () => {
      console.log('Reloading socket.io connected!')
    })
  })
}