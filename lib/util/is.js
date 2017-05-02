'use strict';

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
//# sourceMappingURL=is.js.map