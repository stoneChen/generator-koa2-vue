# <%= appName %> vue-koa-全栈工程

## 安装依赖
```bash
npm i
```
依赖安装完毕后,会自动复制proxy.config.example.js为proxy.config.js(此文件会被git忽略),用于配置代理目标host

## 启动开发环境
### 分离模式
如果你做node开发比较做,推荐此模式,即要开两个终端。
打开一个当前工程的命令行窗口:
```bash
npm run webpack-server
```
此命令用于启动webpack服务,打包静态资源, 使用[webpack-dev-server](https://github.com/webpack/webpack-dev-server) 开发&&打包静态资源

打开另一个当前工程的命令行窗口:
```bash
npm run nodemon
```
此命令用于启动node主服务, 借助[nodemon](https://github.com/remy/nodemon) 来监听服务端代码的变化,自动重启node服务。
另外,启动服务后会自动打开浏览器。

### 融合模式服务
如果你做前端开发比较多,推荐此模式,即起一个服务就能满足开发需要:
```bash
npm start
```
webpack作为koa的中间件
如果改变了node服务端代码, 服务将不会自动重启

## 构建
```bash
npm run pack
```

## 启动生产环境服务
```bash
npm run serve
```
注: **启动生产环境服务前,必须先构建静态资源**

## 目录结构说明
├── .babelrc             // babel配置  
├── .editorconfig        // 编辑器配置  
├── .eslintignore        // eslint忽略配置  
├── .eslintrc.js         // eslint配置  
├── .gitignore           // git忽略文件  
├── .npmrc               // npm配置, 目前主要用于指向npm服务器  
├── README.md            // 读我吧~  
├── client               // 前端代码目录  
│   ├── assets           // 图片、字体等二进制资源  
│   ├── config.js        // vue的全局配置  
│   ├── index.js         // 前端代码入口  
│   ├── router.js        // 路由总入口  
│   ├── routes.js        // 具体路由配置  
│   ├── store            // flux相关模块  
│   ├── utils            // 工具模块  
│   └── views            // 路由组件  
├── copy-proxy-config.js   // 用于复制代理配置的模块,postinstall钩子执行  
├── fetch-proxy-config.js  // 真实环境拉取代理配置模块  
├── global.config.js       // 全局配置, 主要是一些服务配置  
├── gulpfile.js            // gulp任务入口模块  
├── nodemon.json           // nodemon配置  
├── package.json           // node工程配置  
├── proxy.config.example.js  // 代理配置示例模块  
├── server                  // 服务端模块目录  
│   ├── app.js              // 服务端主模块  
│   ├── controllers         // 控制器  
│   ├── index.js            // 服务端入口模块,主要是babel转义入口  
│   ├── routes              // 后端路由配置  
│   ├── utils               // 工具模块  
│   ├── views               // 后端模板  
│   └── webpack.middleware.js  // 融合模式的webpack中间件  
├── universal               // 前后端通用模块目录  
├── webpack-dev-server.js   // 分离模式下webpack开发服务器配置  
├── webpack.base.conf.js    // webpack基础配置  
├── webpack.dev.conf.js     // webpack开发环境配置  
└── webpack.prod.conf.js    // webpack生产环境配置  

## 注意事项
工程中配置了registry,指向公司私有NPM服务,详见.npmrc文件。
如果是在公司以外的网络,会导致npm依赖包安装失败,可以尝试注释registry来安装依赖

