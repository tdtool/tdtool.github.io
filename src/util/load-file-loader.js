/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-15 10:59:53
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-15 11:00:03
 */

const URL_LOADER_LIMIT = 10000

module.exports = (config, options) => {
 config.add('rule.txt', {
   test: /\.txt$/,
   loader: 'raw-loader'
 })
 config.add('rule.woff', {
   test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
   loader: 'url-loader',
   query: {
     limit: options && options.urlLoaderLimit ? options.urlLoaderLimit : URL_LOADER_LIMIT,
     minetype: 'application/font-woff'
   }
 })
 config.add('rule.woff2', {
   test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
   loader: 'url-loader',
   query: {
     limit: options && options.urlLoaderLimit ? options.urlLoaderLimit : URL_LOADER_LIMIT,
     minetype: 'application/font-woff'
   }
 })
 config.add('rule.ttf', {
   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
   loader: 'url-loader',
   query: {
     limit: options && options.urlLoaderLimit ? options.urlLoaderLimit : URL_LOADER_LIMIT,
     minetype: 'application/octet-stream'
   }
 })
 config.add('rule.eot', {
   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
   loader: 'file-loader'
 })
 config.add('rule.svg', {
   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
   loader: 'url-loader',
   query: {
     limit: options && options.urlLoaderLimit ? options.urlLoaderLimit : URL_LOADER_LIMIT,
     minetype: 'image/svg+xml'
   }
 })
 config.add('rule.IMAGE', {
   test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
   loader: 'url-loader',
   query: {
     limit: options && options.urlLoaderLimit ? options.urlLoaderLimit : URL_LOADER_LIMIT
   }
 })
}
