/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-10 09:44:04
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-10 09:44:05
 */

import is from './is'
import path from 'path'
import webpack from 'webpack'

// const cwd = process.cwd()

module.exports = (config, devServer) => {
  if (devServer === false || is.nil(devServer)) {
    return;
  }
  // const base = path.join(cwd, config.output.path);
  const defaultDevCofig = {
    contentBase: config.output.path,
    disableHostCheck: false,
    historyApiFallback: true,
    hot: true,
    inline: true,
    quiet: true,
    watchContentBase: true,
  };
  if (devServer === true) {
    config.devServer = defaultDevCofig;
  } else {
    config.devServer = Object.assign(defaultDevCofig, devServer);
  }
  config.plugins.HotModule = new webpack.HotModuleReplacementPlugin()
}
