// 设置token
export function setToken(val) {
  wx.setStorageSync('token', val)
}

// 获取token
export function getToken() {
  return wx.getStorageSync('token')
}