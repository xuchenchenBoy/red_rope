/**
 * 封装调用微信功能
 * @api { String } 微信api名称
 * @params { Object } 参数
 */
export default function wxSync({ api, params = {} }) {
  return new Promise((resolve, reject) => {
    wx[api]({
      ...params,
      success(apiRes) {
        if (apiRes.errMsg === `${api}:ok`) {
          resolve(apiRes)
        } else {
          reject(apiRes)
        }
      },
      fail(e) {
        reject(e)
      }
    })
  })
}
