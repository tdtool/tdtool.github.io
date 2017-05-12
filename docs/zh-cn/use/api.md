# 方法

webpack2的配置中经常会去改动的是rules和plugins， 不过它们传入的是数组类型不方便修改或覆盖。所以这里还是提供了新的方法给我们操作配置。

## new Config(options: Object)
设置基本配置的方法。
```js
var Config = require('tdtool').Config
var config = new Config({
  entry: './src/app.js',
  devServer: true
})
```

## add(path: String, option: Any)

如果我们想增加(或覆盖) rule，plugin或其他配置就可以使用该方法。区分大小写。
```js
var Config = require('tdtool').Config
var config = new Config({
  entry: './src/app.js',
  devServer: true
})
config.add('rule.es6', {
  test: /\.es6$/,
  use: ['babel-loader']
})

// 将会被翻译为
{
  module: {
    rules: [{
      test: /\.es6$/,
      use: ['babel-loader']
    }]
  }
}
```
如果是增加plugin
```js
var Config = require('tdtool').Config
var config = new Config({
  entry: './src/app.js',
  devServer: true
})
config.add('plugin.Banner', new webpack.BannerPlugin(banner, options))

// 将会被翻译成
{
  plugins: [
    new webpack.BannerPlugin(banner, options)
  ]
}
```
其它的配置也可以用add增加(覆盖)
```js
config.add('output.filename', '[name].bundle.js')
// 将会被翻译成
{
  output: {
    filename: [name].bundle.js
  }
}
```

## remove(path: String)

移除预配置项
```js
// 将 {test: /\.es6$/,use: ['babel-loader']} 删除
config.remove('rule.es6')
```
默认设置的plugin包含
  plugin.define
  plugin.UglifyJs
  plugin.LoaderOptions
  plugin.SourceMapDevTool
  plugin.Banner
  plugin.NoErrors
  plugin.ProgressBar
  plugin.HotModule

## resolve()

返回最终的 webpack2 配置。rule 和 plugin 的配置在 tdtool 里是以 Object 的形式存储的，resolve 会将其转换成数组
```js
var webpackConfig = coofig.resolve()

// 还可以进一步去修改 webpack 配置，例如
webpackConfig.cache = true

module.exports = webpackConfig
```
