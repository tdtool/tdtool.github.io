/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-02 17:00:54
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-02 17:00:57
 */

import * as chai from 'chai'
import logger from '../src/util/logger'
const expect = chai.expect

describe('logger', () => {
  it('test logger', () => {
    expect(logger.info).to.not.be.undefined
    logger.info()
    expect(logger.warn).to.not.be.undefined
    logger.warn()
    expect(logger.success).to.not.be.undefined
    logger.success()
    expect(logger.error).to.not.be.undefined
    logger.error(new Error())
    process.env.NODE_ENV = 'test'
    expect(logger.fatal).to.not.be.undefined
    try {
      logger.fatal()
    } catch(e) {
      expect(e).to.not.be.undefined
    }
  })
})
