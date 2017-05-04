'use strict';

require('babel-polyfill');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-04 09:35:04
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-04 09:35:06
 */

module.exports = function run(fn, options) {
  var task = typeof fn.default === 'undefined' ? fn : fn.default;
  var start = new Date();
  _logger2.default.warn('Starting \'' + task.name + '\'...');
  return task(options).then(function () {
    var end = new Date();
    var time = end.getTime() - start.getTime();
    _logger2.default.success('Finished \'' + task.name + '\' after ' + time + ' ms');
  }).catch(function (err) {
    return _logger2.default.fatal(err.stack);
  });
};
//# sourceMappingURL=run-command.js.map