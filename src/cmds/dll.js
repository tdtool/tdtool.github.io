/**
 * @Author: can.yang <yc>
 * @Date:   2017-10-18 18:04:13
 * @Last modified by:   yc
 * @Last modified time: 2017-10-18 18:04:15
 */

import logger from '../util/logger'
import is from '../util/is'
import dllConfig from '../util/load-dllPlugin-config'
import fs from 'fs'
import path from 'path'
import webpack from 'webpack'

module.exports = function build(options) {
  return new Promise((resolve, reject) => {
    let configs = options.config.split(',')
    const wbpcs = configs.map(item => {
      const configPath = path.resolve(process.cwd(), item)
      if (!fs.existsSync(configPath)) {
        logger.fatal(`Config file ${configPath} does not exist.`)
      }
      return dllConfig(require(configPath));
    }).reduce((result, item) => {
      if (is.Array(item)) {
        return result.concat(item)
      }
      result.push(item)
      return result
    }, [])

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
    webpack(wbpcs).run(finished)

  })
}
