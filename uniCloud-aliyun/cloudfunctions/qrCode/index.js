// mp-cloud-openapi，地址：https://ext.dcloud.net.cn/plugin?id=1810
const openapi = require('../common/mp-cloud-openapi/index.js')
console.log("------------------");
console.log(openapi);
const openapiWeixin = openapi.initWeixin({
  appId: 'wx4920937850a307e6',
  secret: 'f80f7efec3729093e48b9f5e922a6317'
})
exports.main = async (event, context) => {
  try {
    const result = await openapiWeixin.wxacode.createQRCode({
        path: event.path,
        width: 430
      })
    return result
  } catch (err) {
    return err
  }
}