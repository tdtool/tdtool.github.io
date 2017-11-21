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
import happypackLoader from './load-happypack';
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
    this.port = port
    // this.config.output.publicPath = getPublicPath(this.config, port, host)

    // 为client端增加热加载模块
    this.wbpcs.filter(x => x.target !== 'node').forEach(config => {
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
      const rule = config.module.rules.find(x => x.loader === 'babel-loader')
      if (rule && rule.query) {
        rule.query.plugins = [ [
          require.resolve('babel-plugin-react-transform'), {
            transforms: [
              {
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module'],
              }, {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react'],
              },
            ],
          }
        ]].concat(rule.query.plugins || [])
      }
      if (happypack === true) {
        happypackLoader(config, rule, 'jsHappy')
      }
    })
  }

  run() {
    new DevServer(webpack(this.wbpcs), this.config.devServer)
      .listen(this.port, (err) => {
        if (err) {
          logger.fatal(err);
        }
        logger.success(`The server is running at http://${host}:${this.port}/webpack-dev-server/`);
        open(`http://${host}:${this.port}/webpack-dev-server/`);
      });
  }
}

module.exports = WebpackDevServer
