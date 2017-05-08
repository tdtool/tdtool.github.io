/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-04-27 15:53:41
 * @Last modified by:   yzf
 * @Last modified time: 2017-04-27 15:53:43
 */

import path from 'path'
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'

import is from './is'
import loadTemplate from './load-template'
import { DIST, PUBLIC_PATH } from './constant'

/**
 * generate tdtool config by user options
 *
 * @param options [user options]
 * @return config [tdtool config]
 */
module.exports = options => {
  const config = {
    entry: options.entry,
    target: options.target,
    output: {
      path: path.resolve(process.cwd(), options.dist || DIST),
      publicPath: is.nil(options.publicPath) ? PUBLIC_PATH : options.publicPath,
      libraryTarget: options.target === 'node' ? 'commonjs2' : options.libraryTarget,
      library: options.moduleName,
      umdNamedDefine: options.libraryTarget === 'umd' || options.libraryTarget === 'amd'
    },
    plugins: {},
    module: {
      rules: {}
    },
    devServer: {},
    resolve: {
      modules: ['node_modules', path.resolve(process.cwd(), 'node_modules'), path.resolve(__dirname, '../../node_modules')]
        .concat(options.modules).filter(is.valid)
    }
  }
  // node env
  config.plugins.define = new webpack.DefinePlugin(is.Object(options.env) ? Object.assign({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }, options.env) : {
    'process.env.NODE_ENV': JSON.stringify(
      is.nil(options.env) ? process.env.NODE_ENV : options.env
    )
  });
  // template
  if (options.template !== false) {
    Object.assign(config.plugins, loadTemplate(options.template))
  }
  // alias
  if (options.alias) {
    config.resolve.alias = options.alias
  }
  // externals
  if (options.externals) {
    config.externals = options.externals
  }
  // filename
  config.output.filename = options.filename || '[name].js'
  // chunkFilename
  config.output.chunkFilename = options.chunkFilename || '[name].chunk.js'
  // minimize
  const UglifyJs = new webpack.optimize.UglifyJsPlugin({
    sourceMap: Boolean(options.sourceMap),
    comments: false,
    compress: {
      screw_ie8: true,
      unused: true,
      dead_code: true,
      collapse_vars: true,
      reduce_vars: true
    },
    mangle: {
      screw_ie8: true,
    },
    output: {
      comments: false,
      screw_ie8: true,
    },
  })
  const UglifyCss = new webpack.LoaderOptionsPlugin({minimize: true})
  if (is.Object(options.minimize)) {
    if (options.minimize.js) {
      config.plugins.UglifyJs = UglifyJs
    }
    if (options.minimize.css) {
      config.plugins.LoaderOptions = UglifyCss
    }
  } else {
    if (options.minimize) {
      config.plugins.UglifyJs = UglifyJs
      config.plugins.LoaderOptions = UglifyCss
    }
  }
  // sourceMap
  if (!!options.sourceMap) {
    config.plugins.SourceMapDevTool = new webpack.SourceMapDevToolPlugin({filename: '[file].map'})
    config.devtool = options.sourceMap === true ? (options.target === 'node' ? 'cheap-module-source-map' : 'source-map'): options.sourceMap
    if (options.target === 'node') {
      config.plugins.Banner = new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false,
      })
    }
  }
  // development
  if (process.env.NODE_ENV === 'development') {
    config.plugins.NoErrors = webpack.NoEmitOnErrorsPlugin ? new webpack.NoEmitOnErrorsPlugin() : new webpack.NoErrorsPlugin()
    config.cache = true
  }
  // development
  if (process.env.NODE_ENV === 'production') {
    config.bail = true
  }
  // ProgressBarPlugin
  config.plugins.ProgressBar = new ProgressBarPlugin()

  return config
}
