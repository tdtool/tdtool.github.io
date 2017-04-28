'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadTemplate;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-04-28 09:42:44
 * @Last modified by:   yzf
 * @Last modified time: 2017-04-28 09:42:47
 */

function loadTemplate(template) {
  var templates = {};
  if (template === true) {
    templates['index.html'] = new _htmlWebpackPlugin2.default();
  } else if (_is2.default.String(template)) {
    templates['index.html'] = new _htmlWebpackPlugin2.default({
      filename: 'index.html',
      template: _path2.default.resolve(process.cwd(), template)
    });
  } else if (_is2.default.Object(template)) {
    for (var name in template) {
      if (Object.prototype.hasOwnProperty.call(template, name)) {
        if (_is2.default.String(template[name])) {
          templates[name] = new _htmlWebpackPlugin2.default({
            filename: name,
            template: _path2.default.resolve(process.cwd(), template[name])
          });
        } else {
          template[name].filename = template[name].filename || name;
          templates[name] = new _htmlWebpackPlugin2.default(template[name]);
        }
      }
    }
  } else if (_is2.default.Array(template)) {
    template.forEach(function (item) {
      if (!item.filename) {
        _logger2.default.fatal('template filename is required.');
      }
      templates[item.filename] = new _htmlWebpackPlugin2.default(item);
    });
  }

  return templates;
}
//# sourceMappingURL=load-template.js.map