'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-04-27 15:59:15
 * @Last modified by:   yzf
 * @Last modified time: 2017-04-27 15:59:18
 */

function type(obj) {
  return Object.prototype.toString.call(obj);
}

exports.String = function (obj) {
  return type(obj) === '[object String]';
};
exports.Array = function (obj) {
  return type(obj) === '[object Array]';
};
exports.Object = function (obj) {
  return type(obj) === '[object Object]';
};
exports.Boolean = function (obj) {
  return type(obj) === '[object Boolean]';
};
exports.Function = function (obj) {
  return type(obj) === '[object Function]';
};
exports.nil = function (obj) {
  return obj === null || obj === undefined;
};
exports.valid = function (obj) {
  return !!obj;
};
exports.pluginExists = function (name) {
  return _fs2.default.existsSync(_path2.default.join(process.cwd(), 'node_modules', name));
};
exports.installed = function (name) {
  try {
    require.resolve(name);
    return true;
  } catch (e) {
    return false;
  }
};
//# sourceMappingURL=is.js.map