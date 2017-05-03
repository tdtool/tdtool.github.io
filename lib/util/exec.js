'use strict';

var _crossSpawn = require('cross-spawn');

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-03 14:23:05
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-03 14:23:07
 */

module.exports = function (cmd) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var command = _crossSpawn2.default.sync(cmd, args, opts);
  if (command.status == 1) {
    if (command.stderr) {
      _logger2.default.fatal(opts.errMessage || command.stderr);
    }
    process.exit(1);
  }
  return command;
};
//# sourceMappingURL=exec.js.map