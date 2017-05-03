/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-02 18:48:10
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-02 18:48:30
 */

import logger from './logger'
import is from './is'
import shell from 'shelljs'

const installExtend = key => {
  const packageName = `tdtool-${key}`
  if (!is.pluginExists(packageName)) {
    logger.warn(`Auto install ${packageName}`)
    let stdout
    if (shell.which('yarn')) {
      stdout = shell.exec(`yarn add ${packageName} -D --silent`)
    } else {
      stdout = shell.exec(`npm install ${packageName} --save-dev --silent`)
    }
    if (stdout.code === 0) {
      logger.success(`Success to install ${packageName}`)
    } else {
      logger.fatal(`Failed to auto install ${packageName}, please run 'npm i ${packageName} -D'`)
    }
  }
}

const importExtend = (extend, config, options) => {
  installExtend(extend)
  require(`tdtool-${extend}`)(config, options)
  logger.success(`Loaded success: ${extend}`)
}

/**
 * 加载并装配插件
 *
 * @param  {array | object} _extends
 * @param  {Config} config
 */
module.exports = (_extends, config) => {
  if (is.Object(_extends)) {
    Object.keys(_extends || {}).forEach(key => {
      const options = is.Boolean(_extends[key]) ? null : _extends[key]
      importExtend(key, config, options)
    })
  } else if (is.Array(_extends)) {
    _extends.forEach(item => {
      if (is.String(item)) {
        importExtend(item, config)
      }
      if (is.Array(item)) {
        importExtend(item[0], config, item[1])
      }
    })
  }
}
