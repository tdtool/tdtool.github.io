# 如何写插件

tdtool的插件本质上是提供扩展配置和依赖。不同插件扩展的配置应该是**独立的，互不干扰**。配置在extends 内的插件会安装从左往右的顺序依次执行装配所提供的配置；在运行时，会去使用插件提供的依赖。
主题部分如下
```js
/**
 * @param  {tdtool.Config} config - 该参数提供 add, remove
 * @param  {*} options - 支持自定义参数
 */
module.exports = function (config, options) {
  // do it
};
```

## 规定
* 不同插件扩展的配置应该是**独立的，互不干扰**
* 插件项目用** tdtool-* ** [^1]的命名

## 参数
### `config`
提供的add 与 remove 与[之前介绍](/use/api.md)的一致，tdtool当前的webpack配置内容。例如提供react插件的主要代码
```js
import path from 'path'

const defaultPresets = [
  'es2015-ie',
  'react',
  'stage-2',
]
const defaultPlugins = [
  'transform-decorators-legacy',
  'transform-class-properties',
  'transform-runtime'
]

module.exports = (config, options) => {
  let babel
  if (!options) {
    babel = {
      cacheDirectory: true,
      babelrc: false,
      presets: defaultPresets,
      plugins: defaultPlugins
    }
  } else {
    const { isDebug, presets, plugins, isNode } = options
    babel = {
      cacheDirectory: isDebug,
      babelrc: false,
      presets: defaultPresets.concat(isNode ? [
        [
          'env',
          {
            targets: {
              node: 'current'
            },
            modules: false,
            useBuiltIns: false,
            debug: false
          }
        ]
      ]: []).concat(presets).filter(o => !!o),
      plugins: defaultPlugins.concat((isNode || isDebug) ? [
        'transform-react-jsx-source',
        'transform-react-jsx-self'
      ] : []).concat(plugins).filter(o => !!o)
    }
  }
  config.add('rule.jsx', {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    include: [path.resolve(process.cwd(), 'src')],
    query: babel
  })
  config.add('rule.est', {
    test: /\.est$/,
    use: ['babel-loader', 'template-string-loader']
  })
}
```
### options
自定义配置参数

## 依赖
所需依赖配置在package.json的`dependencies`内
```json
{
  "dependencies": {
    "babel-loader": "^7.0.0",
    "babel-plugin-mobx-deep-action": "^1.5.2",
    "babel-plugin-transform-react-jsx-self": "^6.22.0",
    "babel-plugin-transform-react-jsx-source": "^6.22.0",
    "babel-plugin-lodash": "^3.2.11",
    "babel-plugin-transform-class-properties": "^6.24.1",
    "babel-plugin-transform-decorators-legacy": "^1.3.4",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-es2015-ie": "^6.7.0",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "babel-preset-env": "^1.4.0",
    "babel-preset-react-optimize": "^1.0.1",
    "template-string-loader": "^0.0.3"
  }
}
```

-------------
[^1]: tdtool 搜索插件时会自动匹配前缀为 tdtool- 的模块
