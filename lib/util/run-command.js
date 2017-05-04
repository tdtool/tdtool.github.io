'use strict';

require('babel-polyfill');

function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
} /**
   * @Author: Zhengfeng.Yao <yzf>
   * @Date:   2017-05-04 09:35:04
   * @Last modified by:   yzf
   * @Last modified time: 2017-05-04 09:35:06
   */

module.exports = function run(fn, options) {
  var task = typeof fn.default === 'undefined' ? fn : fn.default;
  var start = new Date();
  console.log('[' + format(start) + '] Starting \'' + task.name + '\'...');
  return task(options).then(function () {
    var end = new Date();
    var time = end.getTime() - start.getTime();
    console.log('[' + format(end) + '] Finished \'' + task.name + '\' after ' + time + ' ms');
  }).catch(function (err) {
    return console.error(err.stack);
  });
};
//# sourceMappingURL=run-command.js.map