'use strict';

// 指定模块绝对路径的辅助模块, __dirname的值是当前模块的绝对路径
let path = require('path')
// 添加浏览器前缀的postcss插件
let autoprefixer = require('autoprefixer')<% if (props.isMobile) { %>
let pxtorem = require('postcss-pxtorem');<% } %>

function postcss() {
  return [<% if (props.isMobile) { %>
    pxtorem({
      rootValue: 100,
      propWhiteList: [],
      replace: true,
      minPixelValue: 3
    }),<% } %>
    // 添加浏览器前缀
    autoprefixer({browsers: '> 1%'})
  ]
}
module.exports = {
  // 入口模块配置
  entry: {
    app: path.join(__dirname, './client/index.js')
  },
  // 输出模块配置
  output: {
    // 输出到这个目录下
    path: path.resolve(__dirname, 'public/'),
    // 生成的文件名, [name] 即为entry配置中的key
    filename: '[name].js'
  },
  // 寻找模块时的一些缺省设置
  resolve: {
    // 扩展名,按顺序下来查找, 比如代码里有一个 require('../a'),
    // 那就现在相应目录下查找有没有叫做a的这个模块(对应数组里的第0个元素,末尾拼接一个'')
    // 如果不存在,就继续在相应目录下查找有没有叫做a.js的这个模块(对应数组里的第1个元素,末尾拼接一个'.js')
    extensions: ['', '.js'],
    // 目录别名设置,有时很深目录里的一个模块,需要依赖另一边很深目录里的一个模块,写起来很繁琐,比如一种比较极端的情况是这样的:
    // require('../../../../../../../a/b/c/d/e.js'),是不是眼睛都要花了?
    // 如果这里配置了a: path.resolve(__dirname, 'client/a')
    // 那么代码里只需要写成 require('a/b/c/d/e.js')就好了
    alias: {
      client: path.resolve(__dirname, 'client'),
      store: path.join(__dirname, 'client/store'),
      actions: path.join(__dirname, 'client/store/actions'),
      views: path.join(__dirname, 'client/views'),
      styles: path.join(__dirname, 'client/assets/styles'),
      assets: path.join(__dirname, 'client/assets'),
      components: path.join(__dirname, 'client/components'),
      modules: path.join(__dirname, 'modules'),
      util: path.join(__dirname, 'client/utils')
    }
  },
  // 模块配置
  module: {
    // loader配置
    loaders: [
      // vue模块使用vue-loader加载
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      // js模块使用eslint-loader, babel-loader加载,注意顺序是【右往左】!
      {
        test: /\.js$/,
        loader: 'babel!eslint',
        // node_modules目录下的js模块,不使用eslint-loader, babel-loader加载
        exclude: /node_modules/
      },
      // gif|jpg|jpeg|png|bmp|svg|woff|woff2|eot|ttf这些模块使用url-loader加载
      { test: /\.(gif|jpg|jpeg|png|bmp|svg|woff|woff2|eot|ttf|ico)$/,
        loader: 'url',
        query: {
          // 小于8912字节的文件,返回dataurl
          limit: 8912,
          // 生成的文件名,[name]为原始文件名,[hash:8]为根据文件内容生成8位md5值,[ext]为原始文件扩展名
          name: 'resources/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  // vue-loader配置
  vue: {
    // vue文件中的loader配置
    loaders: {
      // 使用eslint-loader, babel-loader加载vue文件中的js部分,注意顺序是【右往左】!
      js: 'babel!eslint'
    },
    // postcss配置,把vue文件中的样式部分,做后续处理
    postcss: postcss,
    // 不使用默认的autoprefixer
    autoprefixer: false
  },
  // 非vue文件中的纯样式部分的postcss配置
  postcss: postcss,
  // eslint-loader配置
  eslint: {
    // 以更友好的格式输出eslint错误信息
    formatter: require('eslint-friendly-formatter')
  }
}
