/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-04-25 16:46:26
 * @Last modified by:   yzf
 * @Last modified time: 2017-04-25 16:47:48
 */

import { format } from 'util'
import chalk from 'chalk'
const version = require('../../package.json').version

const prefix = `[tdtool@${version}]`
const sep = chalk.gray('-')

/**
 * Log a `message` to the console
 *
 * @param {String} message
 */
exports.info = () => {
  const msg = format.apply(format, arguments)
  console.log(chalk.cyan(prefix), sep, msg)
}

/**
 * Log an error `message` to the console and not exit
 *
 * @param {String} message
 */
exports.error = message => {
  if (message instanceof Error) {
    message = message.message.trim()
  }

  const msg = format.apply(format, arguments)
  console.error(chalk.red(prefix), sep, msg)
}

/**
 * Log an error `message` to the console and exit
 *
 * @param {String} message
 */
exports.fatal = msg => {
  exports.error(msg)

  if (process.env.NODE_ENV === 'test') {
    throw new ERROR('exit')
  } else {
    process.exit(1)
  }
}

/**
 * Log a warning `message` to the console
 *
 * @param {String} message
 */
exports.warn = () => {
  const msg = format.apply(format, arguments)
  console.log(chalk.yellow(prefix), sep, msg)
}

/**
 * Log a success `message` to the console
 *
 * @param {String} message
 */
exports.success = () => {
  const msg = format.apply(format, arguments)
  console.log(chalk.green(prefix), sep, msg)
}
