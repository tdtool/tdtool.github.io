/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-02 10:46:40
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-02 10:46:45
 */

import * as chai from 'chai'
import { Config } from '../src/index'
import path from 'path'

const expect = chai.expect

describe("index", () => {
  it('test new config', () => {
    process.env.NODE_ENV = 'development'
    const configObj = new Config({
      entry: 'test.js',
      extractCss: true,
      externals: {
        jquery: 'window.$'
      },
      alias: {
        test: './test.js'
      },
      template: true,
      sourceMap: true,
      urlLoaderLimit: 10000,
      clean: false,
      minimize: true
    })
    const config = configObj.config
    expect(config.entry).to.equal('test.js')
    expect(config.plugins.ExtractText.filename).to.equal('[name].css')
    expect(config.externals.jquery).to.equal('window.$')
    expect(config.resolve.alias.test).to.equal('./test.js')
    expect(config.plugins.templates['index.html']).to.not.be.undefined
    expect(config.devtool).to.equal('source-map')
    expect(config.__CLEAN__).to.equal(false)
    expect(config.urlLoaderLimit).to.equal(10000)
    expect(config.plugins.UglifyJs).to.not.be.undefined
    expect(config.plugins.LoaderOptions).to.not.be.undefined
    expect(config.plugins.NoErrors).to.not.be.undefined
    expect(config.cache).to.equal(true)
    configObj.add('plugin.test', 123)
    expect(config.plugins.test).to.equal(123)
    configObj.add('rule.sass', 234)
    expect(config.module.rules.sass).to.equal(234)
    configObj.add('test.test', 345)
    expect(config.test.test).to.equal(345)
    configObj.remove('test.test')
    configObj.remove('rule.sass')
    configObj.remove('plugin.test')
    expect(config.test.test).to.be.undefined
    expect(config.module.rules.sass).to.be.undefined
    expect(config.plugins.test).to.be.undefined
    const webpackConfig = configObj.resolve()
    expect(webpackConfig.plugins.constructor.name).to.equal('Array')
    expect(webpackConfig.module.rules.constructor.name).to.equal('Array')
  })
  it('test target node', () => {
    process.env.NODE_ENV = 'production'
    const config = new Config({
      entry: 'test.js',
      extractCss: true,
      target: 'node',
      sourceMap: true,
      minimize: {
        js: true,
        css: true
      },
      template: 'index.tpl'
    }).config
    expect(config.plugins.ExtractText).to.be.undefined
    expect(config.output.libraryTarget).to.equal('commonjs2')
    expect(config.devtool).to.equal('cheap-module-source-map')
    expect(config.plugins.Banner).to.not.be.undefined
    expect(config.plugins.UglifyJs).to.not.be.undefined
    expect(config.plugins.LoaderOptions).to.not.be.undefined
    expect(config.plugins.templates['index.html'].options.template).to.equal(path.resolve(process.cwd(), 'index.tpl'))
  })
})
