/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-02 10:46:40
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-02 10:46:45
 */

import * as chai from 'chai'
import { Config } from '../src/index'

const expect = chai.expect

describe("index", () => {
  it('test new config', () => {
    const config = new Config({
      entry: 'test.js',
      extractCss: true
    }).config
    expect(config.entry).to.equal('test.js')
    expect(config.plugins.ExtractText.filename).to.equal('[name].css')
  })
})
