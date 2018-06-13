/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-10 09:44:04
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-10 09:44:05
 */

import is from './is'
import path from 'path'
import webpack from 'webpack'

const cwd = process.cwd()

module.exports = (config, devServer) => {
  if (devServer === false || is.nil(devServer)) {
    return;
  }
  if (devServer === true) {
    const base = path.join(cwd, config.output.path);
    config.devServer = {
      contentBase: base,
      inline: true,
      historyApiFallback: true,
      hot: true,
      disableHostCheck: true,
      open: true
    }
  } else {
    config.devServer = devServer
  }
  config.plugins.HotModule = new webpack.HotModuleReplacementPlugin()
}
