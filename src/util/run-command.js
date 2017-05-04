/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-04 09:35:04
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-04 09:35:06
 */

import 'babel-polyfill';
function format(time) {
 return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

module.exports = function run(fn, options) {
 const task = typeof fn.default === 'undefined' ? fn : fn.default;
 const start = new Date();
 console.log(`[${format(start)}] Starting '${task.name}'...`);
 return task(options).then(() => {
   const end = new Date();
   const time = end.getTime() - start.getTime();
   console.log(`[${format(end)}] Finished '${task.name}' after ${time} ms`);
 }).catch(err => console.error(err.stack));
};
