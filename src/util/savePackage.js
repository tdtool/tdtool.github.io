/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-12 14:22:44
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-12 14:22:46
 */

import fs from 'fs'
import path from 'path'

module.exports = pkg => {
  const fn = path.join(process.cwd(), 'package.json')
  fs.writeFileSync(fn, JSON.stringify(pkg, null, ' '), {encoding: 'utf8'})
}
