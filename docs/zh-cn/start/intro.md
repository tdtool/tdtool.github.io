# tdtool是什么

tdtool 是一个基于webpack2但是提供更简单的配置项，同时内置了许多常用配置的构建工具。

# 简单上手

## 命令工具使用
**首先请确保是在yarn 2+或NPM 3+环境下运行**
第一步: 安装tdtool命令行工具
```bash
yarn global add tdtool # or npm install tdtool -g
```
第二步：使用创建项目
```js
tdtool create project-name react
```
第三步：开始开发
```js
cd project-name && tdtool build --watch
```
后续：打包、测试等
```bash
tdtool build # or tdtood test
```

## 手动编写
第一步：安装tdtool
```bash
yarn add tdtool -D # or npm i tdtool -D
```
第二步：写tdtool的配置
tdtool.config.js
```js
var Config = require('tdtool').Config
var config = new Config({
  entry: './src/index',
  dist: './dist',
  devServer: true
})

module.exports = config.resolve()
```
第三步：运行
```bash
# 开始开发
tdtool build --watch

# 打包
tdtool build

# 也可使用 webpack 启动
webpack --config tdtool.config.js
```
