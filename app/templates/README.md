# <%= appName >-全栈工程

## 安装依赖
```bash
npm i
```
## 新建配置文件
### 代理配置
在工程根目录下,复制proxy.config.example.js,重命名为proxy.config.js, 把apiHost的值改为你需要代理到的后端服务.

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

## 注意事项
工程中配置了registry,指向公司私有NPM服务,详见.npmrc文件。
如果是在公司以外的网络,会导致npm依赖包安装失败,可以尝试注释registry来安装依赖