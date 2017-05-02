'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractCss;

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-04-28 22:48:26
 * @Last modified by:   yzf
 * @Last modified time: 2017-04-28 22:48:43
 */

function loadTheme(theme) {
  if (_is2.default.String(theme)) {
    return require(theme);
  }
  if (_is2.default.Object(theme)) {
    return theme;
  }
  return null;
}

function extractCss(_ref, config) {
  var extractCss = _ref.extractCss,
      target = _ref.target,
      sourceMap = _ref.sourceMap,
      minimize = _ref.minimize,
      postCss = _ref.postCss,
      theme = _ref.theme;

  if (!extractCss) {
    return;
  }
  var cssLoader = {
    loader: 'css-loader' + (target === 'node' ? '/locals' : ''),
    options: {
      sourceMap: !!sourceMap,
      modules: true,
      localIdentName: '[local]',
      minimize: target !== 'node' && !!minimize,
      discardComments: { removeAll: true }
    }
  };
  var postcssLoader = {
    loader: 'postcss-loader',
    options: {
      plugins: function plugins() {
        return postCss || [];
      }
    }
  };
  var lessLoader = {
    loader: 'less-loader',
    options: {
      sourceMap: !!sourceMap,
      modifyVars: loadTheme(theme)
    }
  };
  if (target === 'node') {
    config.module.rules.less = {
      test: /\.less$/,
      use: [cssLoader, postcssLoader, lessLoader]
    };
    config.module.rules.css = {
      test: /\.css$/,
      use: [cssLoader, postcssLoader]
    };
    return;
  }

  if (!!extractCss) {
    config.plugins.ExtractText = new _extractTextWebpackPlugin2.default(_is2.default.String(extractCss) ? extractCss : '[name].css');
    config.module.rules.less = {
      test: /\.less$/,
      use: _extractTextWebpackPlugin2.default.extract({
        fallback: 'style-loader',
        use: [cssLoader, postcssLoader, lessLoader]
      })
    };
    config.module.rules.css = {
      test: /\.css$/,
      use: _extractTextWebpackPlugin2.default.extract({
        fallback: 'style-loader',
        use: [cssLoader, postcssLoader]
      })
    };
  } else {
    config.module.rules.less = {
      test: /\.less$/,
      use: ['style-loader', cssLoader, postcssLoader, lessLoader]
    };
    config.module.rules.css = {
      test: /\.css$/,
      use: ['style-loader', cssLoader, postcssLoader]
    };
  }
}
//# sourceMappingURL=extract-css.js.map