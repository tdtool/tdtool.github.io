/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-10 10:22:55
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-10 11:10:31
 */

import path from 'path'
import open from 'open'
import webpack from 'webpack'
import DevServer from 'webpack-dev-server'
import logger from './logger'
import is from './is'
import happypackLoader from './happyloader';
const cwd = process.cwd();

function getPublicPath(config, port, host) {
  const base = path.resolve(cwd, config.output.path);
  const parent = path.resolve(base, '..');
  const sub = parent == cwd ? '/' : base.substring(parent.length);
  return `http://${host}:${port}${sub}`;
}

class WebpackDevServer {
  constructor(wbpcs, port, host, happypack) {
    this.wbpcs = wbpcs
    this.config = wbpcs.find(x => x.target !== 'node')
    this.host = host;
    this.port = port
    // this.config.output.publicPath = getPublicPath(this.config, port, host)

    // 为client端增加热加载模块
    this.wbpcs.filter(x => {
      x.mode = x.mode || 'development';
      return x.target !== 'node'
    }).forEach(config => {
      if (is.Array(config.entry)) {
        config.entry.unshift(`webpack-dev-server/client?http://${host}:${port}`, 'webpack/hot/dev-server')
      } else if (is.Object(config.entry)) {
        Object.keys(config.entry).forEach(key => {
          if (is.Array(config.entry[key])) {
            config.entry[key].unshift(`webpack-dev-server/client?http://${host}:${port}`, 'webpack/hot/dev-server')
          } else {
            config.entry[key] = [`webpack-dev-server/client?http://${host}:${port}`, 'webpack/hot/dev-server', config.entry[key]]
          }
        })
      } else {
        config.entry = [`webpack-dev-server/client?http://${host}:${port}`, 'webpack/hot/dev-server', config.entry]
      }

      config._extends.forEach(extend => {
        const tdtoolExtend = require(`tdtool-${extend}`);
        tdtoolExtend.cliStartCallback && tdtoolExtend.cliStartCallback(config, false);
      })
      const rule = config.module.rules.find(x => x.loader === 'babel-loader')
      if (happypack === true && rule) {
        happypackLoader(config, rule, 'jsHappy')
      }
    })
    this.wbpcs.forEach(config => {
      delete config._extends;
    })
  }

  run() {
    new DevServer(webpack(this.wbpcs), this.config.devServer)
      .listen(this.port, this.host, (err) => {
        if (err) {
          logger.fatal(err);
        }
        logger.success(`The server is running at http://${this.host}:${this.port}/webpack-dev-server/`);
        open(`http://${this.host}:${this.port}/webpack-dev-server/`);
      });    
  }
}

module.exports = WebpackDevServer
