import 'babel-polyfill'<% if (props.isMobile) {
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
