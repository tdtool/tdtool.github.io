'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-02 18:48:10
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-02 18:48:30
 */

var importExtend = function importExtend(extend, config, options) {
  var packageName = 'tdtool-' + extend;
  if (!_is2.default.pluginExists(packageName)) {
    _logger2.default.fatal('Please install ' + packageName + ', run \'npm i ' + packageName + ' -D\' or \'yarn add ' + packageName + ' -D\'');
    return;
  }
  require('tdtool-' + extend)(config, options);
  _logger2.default.success('Loaded success: ' + extend);
};

/**
 * 加载并装配插件
 *
 * @param  {array | object} _extends
 * @param  {Config} config
 */
module.exports = function (_extends, config) {
  if (_is2.default.Object(_extends)) {
    (0, _keys2.default)(_extends || {}).forEach(function (key) {
      var options = _is2.default.Boolean(_extends[key]) ? null : _extends[key];
      importExtend(key, config, options);
    });
  } else if (_is2.default.Array(_extends)) {
    _extends.forEach(function (item) {
      if (_is2.default.String(item)) {
        importExtend(item, config);
      }
      if (_is2.default.Array(item)) {
        importExtend(item[0], config, item[1]);
      }
    });
  }
};
//# sourceMappingURL=load-extend.js.map