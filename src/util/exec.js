/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-03 14:23:05
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-03 14:23:07
 */

import spawn from 'cross-spawn'
import logger from './logger'

module.exports = (cmd, args=[], opts={}) => {
  const command = spawn.sync(cmd, args, opts)
  if (command.status == 1) {
    if (command.stderr) {
      logger.fatal(opts.errMessage || command.stderr)
    }
    process.exit(1)
  }
  return command
}
