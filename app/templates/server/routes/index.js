'use strict'
import Router from 'koa-router'
import Index from '../controllers'

const routes = new Router()


routes.get('/', Index)

// 特殊请求放在这里,比如请求合并,注意要返回json,而不是ctx.render
// import xxx from '../controllers/index'

// routes.get('/xxx', xxx)

export default routes
