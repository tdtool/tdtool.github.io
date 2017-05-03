/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-02 20:01:56
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-02 20:01:58
 */

module.exports = config => ({
  entry: config.entry,
  output: config.output,
  target: config.target,
  devtool: config.devtool,
  resolve: config.resolve,
  cache: config.cache,
  bail: config.bail,
  plugins: Object.keys(config.plugins).map(key => config.plugins[key]),
  module: {
    rules: Object.keys(config.module.rules).map(key => config.module.rules[key])
  },
  externals: config.externals
})
