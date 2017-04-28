/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-04-25 16:26:24
 * @Last modified by:   yzf
 * @Last modified time: 2017-04-25 16:59:40
 */

import _set from 'lodash/set'
import _unset from 'lodash/unset'

import loadConfig from './util/load-config'

exports.version = require('../package.json').version
exports.webpackVersion = require('webpack/package.json').version

class Config {
  constructor(options) {
    this.config = loadConfig(options)
  }
}
exports.Config = Config
