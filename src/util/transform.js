/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-12 14:20:29
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-12 14:20:31
 */

import logger from './logger'

module.exports = (entries, f) => {
  let dirty = false;
  entries.forEach(entry => {
    if(entry) {
	  Object.keys(entry).forEach(key => {
	    const value = entry[key];
		const n = f(key, value);
		if (n && n !== value) {
		  entry[key] = n;
		  logger.info(`${key} ${n}`);
		  dirty = true;
		}
	  });
	}
  });
  return dirty;
}
