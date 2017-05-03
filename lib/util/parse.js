"use strict";

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-02 20:01:56
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-02 20:01:58
 */

module.exports = function (config) {
  return {
    entry: config.entry,
    output: config.output,
    target: config.target,
    devtool: config.devtool,
    resolve: config.resolve,
    cache: config.cache,
    bail: config.bail,
    plugins: (0, _keys2.default)(config.plugins).map(function (key) {
      return config.plugins[key];
    }),
    module: {
      rules: (0, _keys2.default)(config.module.rules).map(function (key) {
        return config.module.rules[key];
      })
    },
    externals: config.externals
  };
};
//# sourceMappingURL=parse.js.map