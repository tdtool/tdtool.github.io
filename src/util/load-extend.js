/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-02 18:48:10
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-02 18:48:30
 */

import logger from './logger'
import is from './is'

const importExtend = (extend, config, options, wbpConfig) => {
  const packageName = `tdtool-${extend}`
  if (!is.pluginExists(packageName)) {
    logger.fatal(`Please install ${packageName}, run 'npm i ${packageName} -D' or 'yarn add ${packageName} -D'`)
    return
  }
  require(`tdtool-${extend}`).load(config, options, wbpConfig);
  logger.success(`Loaded success: ${extend}`)
}

/**
 * 加载并装配插件
 *
 * @param  {array | object} _extends
 * @param  {Config} config
 */
module.exports = (_extends, config, wbpConfig) => {
  if (is.Object(_extends)) {
    Object.keys(_extends || {}).forEach(key => {
      const options = is.Boolean(_extends[key]) ? null : _extends[key]
      importExtend(key, config, options, wbpConfig);
      wbpConfig._extends = (wbpConfig._extends || []).concat([key]);
    })
  } else if (is.Array(_extends)) {
    _extends.forEach(item => {
      if (is.String(item)) {
        importExtend(item, config, {}, wbpConfig)
        wbpConfig._extends = (wbpConfig._extends || []).concat([item]);
      }
      if (is.Array(item)) {
        importExtend(item[0], config, item[1], wbpConfig)
        wbpConfig._extends = (wbpConfig._extends || []).concat([item[0]]);
      }
    })
  }
}
