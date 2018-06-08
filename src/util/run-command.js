/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-04 09:35:04
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-04 09:35:06
 */

import logger from './logger'

module.exports = function run(fn, options) {
 const task = typeof fn.default === 'undefined' ? fn : fn.default;
 const start = new Date();
 logger.warn(`Starting '${task.name}'...`);
 return task(options).then(() => {
   const end = new Date();
   const time = end.getTime() - start.getTime();
   logger.success(`Finished '${task.name}' after ${time} ms`);
 }).catch(err => logger.fatal(err.stack));
};
