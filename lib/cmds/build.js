'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _logger = require('../util/logger');

var _logger2 = _interopRequireDefault(_logger);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-04 09:49:52
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-04 09:49:55
 */

module.exports = function build(options) {
  return new _promise2.default(function (resolve, reject) {
    var configs = [];
    if (!options.config) {
      configs.push('tdtool.config.js');
    } else {
      configs = options.config.split(',');
      if (!configs.length) {
        configs.push('tdtool.config.js');
      }
    }
    var wbpcs = configs.map(function (item) {
      var configPath = _path2.default.resolve(process.cwd(), item);
      if (!_fs2.default.existsSync(configPath)) {
        _logger2.default.fatal('Config file ' + configPath + ' does not exist.');
      }
      return require(configPath);
    });

    var finished = function finished(err, stats) {
      if (err) {
        _logger2.default.error(err);
        return reject(err);
      }

      _logger2.default.info(stats.toString({
        colors: true,
        timings: true
      }));
      return resolve();
    };
    if (options.watch) {
      (0, _webpack2.default)(wbpcs).watch({}, finished);
    } else {
      (0, _webpack2.default)(wbpcs).run(finished);
    }
  });
};
//# sourceMappingURL=build.js.map