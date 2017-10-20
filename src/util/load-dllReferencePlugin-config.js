/**
 * @Author: can.yang <yc>
 * @Date:   2017-10-19 12:59:26
 * @Last modified by:   yc
 * @Last modified time: 2017-10-19 12:59:28
 */

import webpack from 'webpack'
import path from 'path'
import fs from 'fs'
import logger from './logger'
import is from './is'


function addPlugin(config, key, context, manifest, name) {
  if (!fs.existsSync(manifest)) {
    logger.fatal(`Dll fill does not exist. Did you forget to run the command 'tdtool dll'?`)
  } else {
    config.plugins[key] = new webpack.DllReferencePlugin({
      // context,
      manifest: require(manifest),
      name
    })
  }
}

function logTypeError() {
  logger.fatal(`DllPlugin only supply an Array or Object(the value must be an Array) as entry`)
}
module.exports = (config, options) => {
  const dllEntry = options.dll.entry;
  const dllContextPath = options.dll.path;
  if (is.Array(dllEntry)) {
    const manifest = path.join(dllContextPath, `vendor.js.json`);
    addPlugin(config, 'DllReferencePlugin', dllContextPath, manifest, 'vendor_library');
  } else if (is.Object(dllEntry)) {
    Object.keys(dllEntry).forEach((key) => {
      if (!is.Array(dllEntry[key])) {
        logTypeError();
      } else {
        const manifest = path.join(dllContextPath, `${key}.js.json`);
        addPlugin(config, `DllReferencePlugin${key}`, dllContextPath, manifest,`${key}_library`);
      }
    })
  } else{
    logTypeError();
  }
}
