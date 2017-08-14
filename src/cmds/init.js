/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-04 09:49:52
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-04 09:49:55
 */

import fs from 'fs'
import path from 'path'
import shell from 'shelljs'
import logger from '../util/logger'

module.exports = function init(options) {
  return new Promise((resolve, reject) => {
    const argv = process.argv.slice(2);
    // shell.exec(`slush ${argv.length >= 2 ? argv[1]: ''}`, {async:true})
    // if (shell.exec(`slush ${argv.length >= 2 ? argv[1]: ''}`).code !== 0) {
    //   // shell.exit(1);
    // } else {
    //   // shell.exit(0);
    // }
  })
}
