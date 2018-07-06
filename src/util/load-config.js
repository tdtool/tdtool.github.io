/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-04-27 15:53:41
 * @Last modified by:   yzf
 * @Last modified time: 2017-04-27 15:53:43
 */

import path from 'path'
import webpack from 'webpack'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'

import is from './is'
import loadTemplate from './load-template'
import loadDevServer from './load-devServer'
import { DIST, PUBLIC_PATH } from './constant'
import loadDllReferencePluginConfig from './load-dllReferencePlugin-config'

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
    mode: options.mode,
    output: {
      path: path.resolve(process.cwd(), options.dist || DIST),
      publicPath: is.nil(options.publicPath) ? undefined : options.publicPath,
      libraryTarget: options.target === 'node' ? 'commonjs2' : options.libraryTarget,
      library: options.moduleName,
      umdNamedDefine: options.libraryTarget === 'umd' || options.libraryTarget === 'amd'
    },
    plugins: {},
    module: {
      rules: {}
    },
    resolve: {
      modules: ['node_modules', path.resolve(process.cwd(), 'node_modules'), path.resolve(__dirname, '../../node_modules')]
        .concat(options.modules).filter(is.valid)
    },
    happypack: Object.assign({}, options.happypack),
    optimization: {
      minimize: is.Boolean(options.minimize) ? options.minimize : undefined,
      splitChunks: options.optimization && options.optimization.splitChunks || undefined,
      runtimeChunk: options.optimization && options.optimization.runtimeChunk || undefined
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
  const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
  const os = require('os');
  const UglifyJs = new ParallelUglifyPlugin({
    workerCount: os.cpus().length,
    cacheDir: path.resolve(__dirname, '..', '..', '.cache'),
    sourceMap: Boolean(options.sourceMap),
    uglifyJS: {
      ie8: true,
      compress: {
        warnings: false,
        unused: true,
        dead_code: true,
        collapse_vars: true,
        reduce_vars: true
      }
    }
  })
  // const UglifyCss = new webpack.LoaderOptionsPlugin({minimize: true})
  // if (is.Object(options.minimize)) {
  //   if (options.minimize.js) {
  //     config.plugins.UglifyJs = UglifyJs
  //   }
  //   if (options.minimize.css) {
  //     config.plugins.LoaderOptions = UglifyCss
  //   }
  // } else {
  //   if (options.minimize) {
  //     config.plugins.UglifyJs = UglifyJs
  //     config.plugins.LoaderOptions = UglifyCss
  //   }
  // }

  if (config.optimization.minimize) {
    config.optimization.minimizer = [UglifyJs]
  }

  // sourceMap
  if (!!options.sourceMap) {
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
  if (process.env.NODE_ENV === 'development' || config.mode === 'development') {
    config.cache = true
  }
  // development
  if (process.env.NODE_ENV === 'production' || config.mode === 'production') {
    config.bail = true
  }
  // ProgressBarPlugin
  config.plugins.ProgressBar = new ProgressBarPlugin()

  // DllReferencePlugin
  if (options.dll) {
    loadDllReferencePluginConfig(config, options);
  }
  // node
  if (options.target === 'node') {
    config.node = {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    };
  } else {
    config.node = {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    };
  }
  // dev server
  loadDevServer(config, options.devServer)
  // stats
  config.stats = {
    colors: true,
    reasons: process.env.NODE_ENV === 'development',
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    cached: false,
    cachedAssets: false
  }

  return config
}
