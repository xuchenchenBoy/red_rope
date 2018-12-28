// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { OPENID, APPID, UNIONID } = wxContext;
  const originToken = String(OPENID + APPID + UNIONID);
  const encodeToken = new Buffer(originToken).toString('base64');

  try {
    await db.collection('user').add({
      data: {
        openId: OPENID,
        appId: APPID,
        unionId: UNIONID,
        token: encodeToken
      }
    })

    return {
      status: 1,
      token: encodeToken
    }
  } catch (e) {
    return {
      status: 401,
      token: null
    }
  }
}