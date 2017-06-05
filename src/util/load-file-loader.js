/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-15 10:59:53
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-15 11:00:03
 */

const URL_LOADER_LIMIT = 10000

module.exports = (config, options) => {
  config.add('rule.tdicon', {
    test: /tdicon\.(woff|woff2|ttf|eot|svg)($|\?)/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: options && options.urlLoaderLimit ? options.urlLoaderLimit : URL_LOADER_LIMIT,
        name: 'fonts/[name].[ext]'
      }
    }]
  })
 config.add('rule.txt', {
   test: /\.txt$/,
   loader: 'raw-loader'
 })
 config.add('rule.IMAGE', {
   test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
   loader: 'url-loader',
   query: {
     limit: options && options.urlLoaderLimit ? options.urlLoaderLimit : URL_LOADER_LIMIT
   }
 })
}
