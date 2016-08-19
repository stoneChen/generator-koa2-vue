"use strict";
let http = require('http')
let fs = require('fs')

let projectName = require('./package.json').name
let env = process.env.NODE_ENV

if (!env) {
  throw Error('please set NODE_ENV!')
}
// 环境名映射, 部署时传进来的环境与配置中心的环境名不一致,需要转一下
let envMap = {
  dev: 'dev',
  test: 'qa',
  prepub: 'prepub',
  pub: 'online',
}

fetchConfig(projectName, env, 'proxy', 'proxy.config.js', function (err) {
  if (err) {
    throw Error(err)
  }
  console.log('proxy config fetching succeed!')
})

function fetchConfig (app, env, key, dest, cb) {
  let configUrl = [
    'http://disconf.ops.xkeshi.so/api/config/file',
    '?app=', app,
    '&env=', envMap[env],
    '&key=', key,
    '&type=0&version=1.0.0',
    ].join('')
  console.log('configUrl:', configUrl)
  let file = fs.createWriteStream(dest)
  http.get(configUrl, function(response) {
    console.log('statusCode: %s', response.statusCode)
    if (response.statusCode !== 200) {
      console.error('Error when getting config!')
      throw Error('Error when getting config!')
    }
    response.pipe(file)
    file.on('finish', function() {
      file.close(cb)  // close() is async, call cb after close completes.
    })
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest) // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message)
  })
}