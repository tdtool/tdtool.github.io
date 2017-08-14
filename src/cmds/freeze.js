/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-12 14:20:07
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-12 14:24:36
 */

import path from 'path'
import transform from '../util/transform'
import savePackage from '../util/savePackage'

module.exports = async function freeze(options) {
  const cwd = process.cwd()
  const pkg = require(path.join(cwd, 'package.json'))
  const moduleNames = options.moduleNames ? options.moduleNames.split(',') : null
  const dirty = transform([pkg.dependencies, pkg.devDependencies], (name, version) => {
    if (moduleNames && !moduleNames.find(moduleName => moduleName === name)) {
      return version
    }
    const mo = version.match(/^(?:[\^|\~])|(?:\>=?\s*)/)
    if (mo) {
      return version.slice(mo[0].length)
    }
  })
  if (dirty) {
    savePackage(pkg)
  }
  await dirty
}
