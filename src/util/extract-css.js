/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-04-28 22:48:26
 * @Last modified by:   yzf
 * @Last modified time: 2017-04-28 22:48:43
 */

import ExtractTextPlugin from 'extract-text-webpack-plugin'

import is from './is'

function loadTheme(theme) {
  if (is.String(theme)) {
    return require(theme)
  }
  if (is.Object(theme)) {
    return theme
  }
  return null
}

export default function extractCss({ extractCss, target, sourceMap, minimize, postCss, theme }, config) {
  if (!extractCss) {
    return
  }
  const cssLoader = {
    loader: `css-loader${target === 'node' ? '/locals' : ''}`,
    options: {
      sourceMap: !!sourceMap,
      modules: true,
      localIdentName: '[local]',
      minimize: target !== 'node' && !!minimize,
      discardComments: { removeAll: true }
    }
  }
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      plugins: () => (postCss || [])
    }
  }
  const lessLoader = {
    loader: 'less-loader',
    options: {
      sourceMap: !!sourceMap,
      modifyVars: loadTheme(theme)
    }
  }
  if (target === 'node') {
    config.module.rules.less = {
      test: /\.less$/,
      use: [
        cssLoader,
        postcssLoader,
        lessLoader
      ]
    }
    config.module.rules.css = {
      test: /\.css$/,
      use: [
        cssLoader,
        postcssLoader
      ]
    }
    return
  }

  if (!!extractCss) {
    config.plugins.ExtractText = new ExtractTextPlugin(is.String(extractCss) ? extractCss : '[name].css')
    config.module.rules.less = {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          cssLoader,
          postcssLoader,
          lessLoader
        ]
      })
    }
    config.module.rules.css = {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          cssLoader,
          postcssLoader
        ]
      })
    }
  } else {
    config.module.rules.less = {
      test: /\.less$/,
      use: [
        'style-loader',
        cssLoader,
        postcssLoader,
        lessLoader
      ]
    }
    config.module.rules.css = {
      test: /\.css$/,
      use: [
        'style-loader',
        cssLoader,
        postcssLoader
      ]
    }
  }
}
