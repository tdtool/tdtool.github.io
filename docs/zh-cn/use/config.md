# 配置参数
tdtool 包装了一些webpack2配置项，所提供的配置参数满足多数项目的基本需求。

## entry
与 webpack2 的 [entry](https://webpack.js.org/configuration/entry-context/#entry)一致，入口文件。接受 String|Array|Object 类型
```js
// 单个入口文件
{
  entry: './src/index.js'
}
// 多入口文件但只打包成一个文件
{
  entry: ['./src/pageA.js', './src/pageB.js']
}
// 多入口文件，且分别打包，最终生存page1.js和page2.js 文件
{
  entry: {
    page1: './src/page1.js',
    page2: ['./src/page2/entry1', './src/page2/entry2']
  }
}
```

## dist
同 [output.path](https://webpack.js.org/configuration/output/#output-path) 项目输出路径，**相对路径**。
```js
{
  dist: './dist'
}
```

## template
HTML 模版文件，使用[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)生成。接受 Boolean|String|Object 类型
```js
// 自动生成一个 index.html 文件
{
  template: true
}

// 指定模板文件相对路径，生成 index.html 文件
{
  template: './src/index.tpl'
}

// 多页面指定模板文件相对路径
{
  template: {
    'index.html': './src/index.tpl',
    'admin.html': './src/admin.tpl'
  }
}

// 需要使用 html-webpack-plugin 额外的参数
{
  template: {
    'admin.html': {
      filename: 'test.html', // 不指定默认使用键名
      chunks: ['admin', 'vendor'], // 不同页面使用不同的 chunk
      template: 'src/assets/test.tpl',
    },
    'home.html': {
      template: 'src/assets/home.tpl',
      chunks: ['home', 'vendor']
    }
  }
}

// 支持传入数组
{
  template: [
    {
      filename: 'admin.html',
      template: 'src/assets/admin.tpl',
      chunks: ['admin', 'vendor']
    },
    {
      filename: 'index.html',
      template: 'src/assets/home.tpl',
      chunks: ['home', 'vendor']
    }
  ]
}
```
## target
同 [target](https://webpack.js.org/configuration/target/#target)

## devServer
基本同 [devServer](https://webpack.js.org/configuration/dev-server/#devserver)。不同的是这里可以配置为node，会启动项目中的node服务，带热加载功能。
```js
// 开启默认配置的devServer，浏览器访问http://localhost:8080
{
  devServer: true
}
// 自定义配置，以下为默认配置，target为node时此配置等同于true
{
  devServer: {
    hot: true,
    historyApiFallback: true,
    inline: true
  }
}
```
**target配置为node时，项目为nodejs服务，启动服务后需要打印日志The server is running at http://${host}:${port}**

## publicPath
同 [output.publicPath](https://webpack.js.org/configuration/output/#output-publicpath)。默认为 / 。
```js
{
  publicPath: '/htdocs/'
}
```

## sourceMap
构建后的文件带 sourceMap，默认false
```js
{
  sourceMap: false
}
```
## libraryTarget
同 [output.libraryTarget](https://webpack.js.org/configuration/output/#output-librarytarget)。若target为node，则libraryTarget为commonjs2
```js
{
  libraryTarget: 'umd'
}
```

## moduleName
同 [output.library](https://webpack.js.org/configuration/output/#output-library)。
```js
{
  library: 'myModule'
}
```

## externals
同 [externals](https://webpack.js.org/configuration/externals/#externals)

## alias
同 [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias)

## filename
同 [output.filename](https://webpack.js.org/configuration/output/#output-filename)。默认值为 [name].js
```js
{
  filename: '[name].[hash].js'
}
```

## chunkFilename
同 [output.chunkFilename](https://webpack.js.org/configuration/output/#output-chunkFilename)。默认值为 [name].chunk.js
```js
{
  chunkFilename: '[chunkhash].chunk.js'
}
```

## minimize
指定是否压缩 js 或者 css
```js
{
  minimize: false
}

// 接受传入对象
{
  minimize: {
    js: true,
    css: true
  }
}
```

## extends
tdtool 默认只提供了一些基本loader，如果我们想开发react项目并且使用less样式，那么就要使用tdtool的扩展配置和依赖的功能。例如下方将引入 [tdtool-react](https://github.com/tdtool/tdtool-react)和[tdtool-less](https://github.com/tdtool/tdtool-less)插件(需要自行安装)。react插件做的事是配置jsx所需的loader及babel-loader；less插件会提供less-loader及file-loader等其他静态资源文件所需loader。
```js
{
  extends: ['react', 'less']
}
```
如果插件是支持自定义参数的话，可以传入Object类型。例如less插件支持抽取出样式文件
```js
{
  extends: {
    react: true,
    less: {
      extractCss: true
    }
  }
}
```
也可以使用数组方式，数组第一个元素为插件名，第二个元素为插件自定义参数
```js
{
  extends: ['react', ['less', {extractCss: true}]]
}
```
