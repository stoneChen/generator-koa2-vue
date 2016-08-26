"use strict";
let path = require('path')
let autoprefixer = require('autoprefixer')<% if (props.isMobile) { %>
let pxtorem = require('postcss-pxtorem')<% } %>
module.exports = {
  entry: {
    app: path.join(__dirname, './client/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      client: path.resolve(__dirname, 'client'),
      store: path.join(__dirname, 'client/store'),
      actions: path.join(__dirname, 'client/store/actions'),
      views: path.join(__dirname, 'client/views'),
      styles: path.join(__dirname, 'client/assets/styles'),
      assets: path.join(__dirname, 'client/assets'),
      components: path.join(__dirname, 'client/components'),
      utils: path.join(__dirname, 'client/utils')
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.js$/,
        loader: 'babel!eslint',
        exclude: /node_modules/
      },
      { test: /\.(gif|jpg|jpeg|png|bmp|svg|woff|woff2|eot|ttf|ico)$/,
        loader: 'url',
        query: {
          limit: 8912,
          name: 'resources/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel!eslint'
    },
    postcss: [<% if (props.isMobile) { %>
      pxtorem({
        rootValue: 100,
        propWhiteList: [],
        replace: true,
        minPixelValue: 3
      }),<% } %>
      autoprefixer({browsers: '> 1%'})
    ],
    autoprefixer: false
  },
  postcss () {
    return [<% if (props.isMobile) { %>
      pxtorem({
        rootValue: 100,
        propWhiteList: [],
        replace: true,
        minPixelValue: 3
      }),<% } %>
      autoprefixer({browsers: '> 1%'})
    ];
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
