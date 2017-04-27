/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-04-27 15:53:41
 * @Last modified by:   yzf
 * @Last modified time: 2017-04-27 15:53:43
 */

import path from 'path'
import is from './is'
import { DIST, PUBLIC_PATH, URL_LOADER_LIMIT } from './constant'

/**
 * generate webpack2 config by user options
 *
 * @param options [user options]
 * @return config [webpack2 config]
 */
module.exports = options => {
  const config = {
    entry: options.entry,
    output: {
      path: path.resolve(process.cwd(), options.dist || DIST),
      publicPath: is.nil(options.publicPath) ? PUBLIC_PATH : options.publicPath,
      libraryTarget: options.libraryTarget,
      library: options.moduleName,
      umdNamedDefine: options.libraryTarget === 'umd' || optins.libraryTarget === 'amd'
    }
  }
}
