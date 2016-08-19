"use strict";

const webpack = require('webpack'); // eslint-disable-line
const WebpackDevServer = require('webpack-dev-server'); // eslint-disable-line

const globalConfig = require('./global.config')
const webpackConfig = require('./webpack.dev.conf'); // eslint-disable-line

const webpackServer = new WebpackDevServer(webpack(webpackConfig), {
  // 这里热替换, 还有问题, 先直接刷新吧
  // hot: true,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: {
    colors: true,
    chunks: false
  }
});
webpackServer.listen(globalConfig.webpackDevServerPort, globalConfig.currentIP, () => {
  console.log(`Webpack server listening at ${globalConfig.webpackServerPath}`);
});