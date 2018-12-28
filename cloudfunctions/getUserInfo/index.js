// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const res = await db.collection('user').where({
      token: event.token
    }).get();
    const data = res.data[0];
    delete data.openId;
    delete data.appId;
    delete data.token;
    return {
      data,
      status: 1
    };
  } catch (e) {
    return {
      status: 0,
      errorMsg: '请求个人信息失败',
      data: {}
    }
  }
}