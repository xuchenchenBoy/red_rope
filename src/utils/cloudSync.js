/**
 * 封装调用云函数功能，默认添加token
 * @name { String } 云函数名
 * @data { Object } 云函数参数
 */
import { setToken, getToken } from '@/utils/authorize'

export default async function wxCloudSync(name, data, isLoading = false) {
  const token = getToken()
  if (token) {
    isLoading && wx.showLoading({
      title: '操作中...',
    })
    const finalRes = await wx.cloud.callFunction({
      name,
      data: {
        token,
        ...data
      }
    })
    isLoading && wx.hideLoading()
    isLoading && wx.showToast({
      title: '操作成功',
      icon: 'success',
      duration: 1000
    });
    return finalRes;
  } else {
    const res = await wx.cloud.callFunction({
      name: 'login'
    })
    setToken(res.result.token)
    return await wxCloudSync(name, data, isLoading)
  }
}