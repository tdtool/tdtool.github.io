# 一个React的项目
首先看看用tdtool创建的一个React项目，项目结构是怎样的
```js
  |-- src/
    |-- entry.js
    |-- app.js
    |-- index.tpl
    |-- style.less
  |-- tdtool.config.js
  |-- package.json
  |-- yarn.lock
```
所需要配置
```js
var Config = require('tdtool').Config
var config = new Config({
  entry: './src/entry',
  dist: './dist',
  template: './src/index.tpl',
  devServer: true,
  sourceMap: true,
  extends: ['react', ['less', {extractCss: true}]]
})

module.exports = config.resolve()
```

启动
```bash
tdtool start # or webpack-dev-server --hot --inline --config tdtool.config.js
```
