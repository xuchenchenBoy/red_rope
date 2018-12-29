// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { OPENID, APPID } = wxContext;
  const originToken = String(OPENID + APPID);
  const encodeToken = new Buffer(originToken).toString('base64');

  try {
    const count = await db.collection('user').where({
      token: encodeToken
    }).count();
    if (!count.total) {
      await db.collection('user').add({
        data: {
          openId: OPENID,
          appId: APPID,
          token: encodeToken,
          refreshTime: Date.now()
        }
      })
    }

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