"use strict";
/**
 * 此模块用于在安装完所有依赖之后,复制proxy.config.example.js到proxy.config.js,用于读取代理api请求
 * package.json中的scripts的postinstall调用此模块
 */

const PROXY_CONFIG_FILENAME = 'proxy.config.js'
const EXAMPLE_PROXY_CONFIG_FILENAME = 'proxy.config.example.js'
if (process.env.NODE_ENV === 'production') {
  console.log(`production mode, coping [${PROXY_CONFIG_FILENAME}] skipped`)
  return
}
const fs = require('fs')
if (!fs.existsSync(PROXY_CONFIG_FILENAME)) {
  fs.writeFileSync(PROXY_CONFIG_FILENAME, fs.readFileSync(EXAMPLE_PROXY_CONFIG_FILENAME));
  console.log(`${PROXY_CONFIG_FILENAME} copied!`)
} else {
  console.log(`${PROXY_CONFIG_FILENAME} exists, coping skipped.`)
}