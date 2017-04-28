/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-04-28 09:42:44
 * @Last modified by:   yzf
 * @Last modified time: 2017-04-28 09:42:47
 */

import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import is from './is'
import logger from './logger'

export default function loadTemplate(template) {
  let templates = {}
  if (template === true) {
    templates['index.html'] = new HtmlWebpackPlugin()
  } else if (is.String(template)) {
    templates['index.html'] = new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(process.cwd(), template)
    })
  } else if (is.Object(template)) {
    for (const name in template) {
      if (Object.prototype.hasOwnProperty.call(template, name)) {
        if (is.String(template[name])) {
          templates[name] = new HtmlWebpackPlugin({
            filename: name,
            template: path.resolve(process.cwd(), template[name])
          })
        } else {
          template[name].filename = template[name].filename || name
          templates[name] = new HtmlWebpackPlugin(template[name])
        }
      }
    }
  } else if (is.Array(template)) {
    template.forEach(item => {
      if (!item.filename) {
        logger.fatal('template filename is required.')
      }
      templates[item.filename] = new HtmlWebpackPlugin(item)
    })
  }

  return templates
}
