/**
 * @Author: zhegfeng.yao 
 * @Date:   2017-12-27 11:11:11
 * @Last modified by:   zhegfeng.yao
 * @Last modified time: 2017-12-27 11:11:11
 */

module.exports = (config) => {
  const HappyPack = require('happypack');
  const os = require('os');
  const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

  const happypackKeys = Object.keys(config.happypack).filter(key => !!config.happypack[key]);
  happypackKeys.forEach(key => {
    const loader = config.module.rules[key];
    if (loader) {
      const id = `${key}Happy`;
      config.module.rules[key] = {
        test: loader.test,
        loader: 'happypack/loader',
        query: {id},
        include: loader.include
      };
      delete loader.test;
      delete loader.include;
      config.plugins[id] = new HappyPack({
        id,
        threadPool: happyThreadPool,
        loaders: [id]
      });
    }
  });
}
