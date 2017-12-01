/**
 * @Author: can.yang  <yc>
 * @Date:   2017-10-29 14:14:53
 * @Last modified by:   yc
 * @Last modified time: 2017-10-29 14:14:53
 */

module.exports = (config, loader, happypackId) => {
  const HappyPack = require('happypack');
  const os = require('os');
  const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

  let loaderIndex = config.module.rules.findIndex(x => x.loader === loader.loader)
  config.module.rules.splice(loaderIndex, 1);
  config.module.rules.push({
    test: loader.test,
    loader: 'happypack/loader',
    query: {id: happypackId},
    include: loader.include
  })
  delete loader.test;
  delete loader.include;
  config.plugins.push(new HappyPack({
    id: happypackId,
    threadPool: happyThreadPool,
    loaders: [loader]
  }))
}
