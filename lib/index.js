'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _set2 = require('lodash/set');

var _set3 = _interopRequireDefault(_set2);

var _unset2 = require('lodash/unset');

var _unset3 = _interopRequireDefault(_unset2);

var _loadConfig = require('./util/load-config');

var _loadConfig2 = _interopRequireDefault(_loadConfig);

var _loadExtend = require('./util/load-extend');

var _loadExtend2 = _interopRequireDefault(_loadExtend);

var _parse = require('./util/parse');

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.version = require('../package.json').version; /**
                                                       * @Author: Zhengfeng.Yao <yzf>
                                                       * @Date:   2017-04-25 16:26:24
                                                       * @Last modified by:   yzf
                                                       * @Last modified time: 2017-04-25 16:59:40
                                                       */

exports.webpackVersion = require('webpack/package.json').version;

var replacePath = function replacePath(_path) {
  if (/^(rule)s?/ig.test(_path)) {
    return _path.replace(/^(rule)s?/ig, 'module.$1s');
  }
  if (/^(plugin)s?/g.test(_path)) {
    return _path.replace(/^(plugin)s?/g, '$1s');
  }
  return _path;
};

var Config = function Config(options) {
  var _this = this;

  (0, _classCallCheck3.default)(this, Config);

  this.add = function (_path, value) {
    (0, _set3.default)(_this.config, replacePath(_path), value);
    return _this;
  };

  this.remove = function (_path, value) {
    (0, _unset3.default)(_this.config, replacePath(_path));
    return _this;
  };

  this.resolve = function () {
    return (0, _parse2.default)(_this.config);
  };

  this.config = (0, _loadConfig2.default)(options);
  // load extends
  (0, _loadExtend2.default)(options.extends, {
    add: this.add,
    remove: this.remove
  });
};

exports.Config = Config;
//# sourceMappingURL=index.js.map