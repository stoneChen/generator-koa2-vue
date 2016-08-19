<% if (props.isMobile) {
%>import './utils/responsive'
import FastClick from 'fastclick'
FastClick.attach(document.body)
<% }
%>import 'normalize.css'
import './config'
import App from 'views/app.vue'
import router from './router'
import IS_DEBUG from './utils/env'

router.start(App, '#app')

// when the server restarts,
// after the websocket client reconnects the websocket server,
// the browser will reload automatically
if (IS_DEBUG) {
  require(['socket.io-client'], (socket) => {
    let io = socket()
    io.on('reconnect', () => {
      location.reload()
    })
    io.on('connect', () => {
      console.log('Reloading socket.io connected!')
    })
  })
}