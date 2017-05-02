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
    const config = new Config({
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
    }).config
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
