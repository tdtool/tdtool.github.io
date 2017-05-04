/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-04 09:49:52
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-04 09:49:55
 */

import logger from '../util/logger'
import fs from 'fs'
import path from 'path'
import webpack from 'webpack'

module.exports = async function build(options) {
  await new Promise((resolve, reject) => {
    let configs = options.config.split(',')
    const wbpcs = configs.map(item => {
      const configPath = path.resolve(process.cwd(), item)
      if (!fs.existsSync(configPath)) {
        logger.fatal(`Config file ${configPath} does not exist.`)
      }
      return require(configPath)
    })

    const finished = (err, stats) => {
      if (err) {
        logger.error(err);
        return reject(err);
      }

      logger.info(stats.toString({
        colors: true,
        timings: true,
      }));
      return resolve();
    };
    if (options.watch) {
      webpack(wbpcs).watch({}, finished)
    } else {
      webpack(wbpcs).run(finished)
    }
  })
}
