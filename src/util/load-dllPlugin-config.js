/**
 * @Author: can.yang <yc>
 * @Date:   2017-10-18 17:23:36
 * @Last modified by:   yc
 * @Last modified time: 2017-10-18 17:23:36
 */

import logger from './logger'
import webpack from 'webpack'
import is from './is'
import path from 'path'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'

function logTypeError() {
  logger.fatal(`DllPlugin only supply an Array or Object(the value must be an Array) as entry`)
}

module.exports = (options) => {
  let config = {};
  const compress = options.compress || false;
  const entry = options.entry;
  const _path = options.path;
  let output = {path: _path};
  if (is.Array(entry)) {
    output.filename = 'vendor.js';
    output.library = 'vendor_library';
  } else if (is.Object(entry)) {
    let typeError = false;
    Object.keys(entry).forEach((key) => {
      if (!is.Array(entry[key])) {
        typeError = true;
      }
    })
    if (typeError) {
      logTypeError();
    } else {
      output.filename = '[name].js';
      output.library = '[name]_library';
    }
  } else {
    logTypeError();
  }
  output.path = _path;

  config.plugins = [
    new webpack.DllPlugin({
      path: path.join(_path, `${output.filename}.json`),
      name: output.library,
      // context: _path
    }),
    new ProgressBarPlugin({
      format: ' build dll file [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60
    })
  ]
  config.entry = entry;
  config.output = output;
  if (compress) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }))
  }
  return config;
}
