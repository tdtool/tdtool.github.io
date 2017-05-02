/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-04-27 15:59:15
 * @Last modified by:   yzf
 * @Last modified time: 2017-04-27 15:59:18
 */

function type(obj) {
  return Object.prototype.toString.call(obj)
}

exports.String = obj => type(obj) === '[object String]'
exports.Array = obj => type(obj) === '[object Array]'
exports.Object = obj => type(obj) === '[object Object]'
exports.Boolean = obj => type(obj) === '[object Boolean]'
exports.Function = obj => type(obj) === '[object Function]'
exports.nil = obj => obj === null || obj === undefined
exports.valid = obj => !!obj
