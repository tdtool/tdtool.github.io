/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-04-25 16:26:24
 * @Last modified by:   yzf
 * @Last modified time: 2017-04-25 16:59:40
 */

import _set from 'lodash/set'
import _unset from 'lodash/unset'

import loadConfig from './util/load-config'
import loadExtend from './util/load-extend'
import parse from './util/parse'

exports.version = require('../package.json').version
exports.webpackVersion = require('webpack/package.json').version

const replacePath = _path => {
  if (/^(rule)s?/ig.test(_path)) {
    return _path.replace(/^(rule)s?/ig, 'module.$1s')
  }
  if (/^(plugin)s?/g.test(_path)) {
    return _path.replace(/^(plugin)s?/g, '$1s')
  }
  return _path
}

class Config {
  constructor(options) {
    this.config = loadConfig(options)
    // load extends
    loadExtend(options.extends, {
      add: this.add,
      remove: this.remove
    })
  }

  add = (_path, value) => {
    _set(this.config, replacePath(_path), value)
    return this;
  }

  remove = (_path, value) => {
    _unset(this.config, replacePath(_path))
    return this
  }

  resolve = () => {
    return parse(this.config)
  }
}
exports.Config = Config
