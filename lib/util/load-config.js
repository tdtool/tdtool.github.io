'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _progressBarWebpackPlugin = require('progress-bar-webpack-plugin');

var _progressBarWebpackPlugin2 = _interopRequireDefault(_progressBarWebpackPlugin);

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _extractCss = require('./extract-css');

var _extractCss2 = _interopRequireDefault(_extractCss);

var _loadTemplate = require('./load-template');

var _loadTemplate2 = _interopRequireDefault(_loadTemplate);

var _constant = require('./constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * generate tdtool config by user options
 *
 * @param options [user options]
 * @return config [tdtool config]
 */
module.exports = function (options) {
  var config = {
    entry: options.entry,
    target: options.target,
    output: {
      path: _path2.default.resolve(process.cwd(), options.dist || _constant.DIST),
      publicPath: _is2.default.nil(options.publicPath) ? _constant.PUBLIC_PATH : options.publicPath,
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
      modules: ['node_modules', _path2.default.resolve(process.cwd(), 'node_modules'), _path2.default.resolve(__dirname, '../../node_modules')].concat(options.modules)
    }
  };
  // node env
  config.plugins.define = new _webpack2.default.DefinePlugin(_is2.default.Object(options.env) ? (0, _assign2.default)({
    'process.env.NODE_ENV': (0, _stringify2.default)(process.env.NODE_ENV)
  }, options.env) : {
    'process.env.NODE_ENV': (0, _stringify2.default)(_is2.default.nil(options.env) ? process.env.NODE_ENV : options.env)
  });
  // template
  if (options.template !== false) {
    config.plugins.templates = (0, _loadTemplate2.default)(options.template);
  }
  // clean
  if (_is2.default.Boolean(options.clean)) {
    config.__CLEAN__ = options.clean;
  } else {
    config.__CLEAN__ = true;
  }
  // alias
  if (options.alias) {
    config.resolve.alias = options.alias;
  }
  // externals
  if (options.externals) {
    config.externals = options.externals;
  }
  // urlLoaderLimit
  if (options.urlLoaderLimit) {
    config.urlLoaderLimit = options.urlLoaderLimit;
  }
  // filename
  config.output.filename = options.filename || '[name].js';
  // chunkFilename
  config.output.chunkFilename = options.chunkFilename || '[name].chunk.js';
  // minimize
  var UglifyJs = new _webpack2.default.optimize.UglifyJsPlugin({
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
      screw_ie8: true
    },
    output: {
      comments: false,
      screw_ie8: true
    }
  });
  var UglifyCss = new _webpack2.default.LoaderOptionsPlugin({ minimize: true });
  if (_is2.default.Object(options.minimize)) {
    if (options.minimize.js) {
      config.plugins.UglifyJs = UglifyJs;
    }
    if (options.minimize.css) {
      config.plugins.LoaderOptions = UglifyCss;
    }
  } else {
    if (options.minimize) {
      config.plugins.UglifyJs = UglifyJs;
      config.plugins.LoaderOptions = UglifyCss;
    }
  }
  // sourceMap
  if (!!options.sourceMap) {
    config.plugins.SourceMapDevTool = new _webpack2.default.SourceMapDevToolPlugin({ filename: '[file].map' });
    config.devtool = options.sourceMap === true ? options.target === 'node' ? 'cheap-module-source-map' : 'source-map' : options.sourceMap;
    if (options.target === 'node') {
      config.plugins.Banner = new _webpack2.default.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false
      });
    }
  }
  // development
  if (process.env.NODE_ENV === 'development') {
    config.plugins.NoErrors = _webpack2.default.NoEmitOnErrorsPlugin ? new _webpack2.default.NoEmitOnErrorsPlugin() : new _webpack2.default.NoErrorsPlugin();
    config.cache = true;
  }
  // development
  if (process.env.NODE_ENV === 'production') {
    config.bail = true;
  }
  // extractCss
  (0, _extractCss2.default)(options, config);
  // ProgressBarPlugin
  config.plugins.ProgressBar = new _progressBarWebpackPlugin2.default();

  return config;
}; /**
    * @Author: Zhengfeng.Yao <yzf>
    * @Date:   2017-04-27 15:53:41
    * @Last modified by:   yzf
    * @Last modified time: 2017-04-27 15:53:43
    */
//# sourceMappingURL=load-config.js.map