// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { OPENID, APPID } = wxContext;
  try {
    const res = await db.collection('user').where({
      refreshTime: _.gt(Date.now() - 5 * 60 * 1000)
    }).limit(1000).get();
    const data = res.data.map(i => {
      let { _id, nickName, gender, clothsDesc, shoesDesc, trousersDesc, latitude, longitude, openId, } = i;
      nickName = nickName || '路人甲';
      if (gender === 1) {
        gender = '(男)'
      } else if (gender === 2) {
        gender = '(女)'
      } else {
        gender = '';
      }
      clothsDesc =`衣服：${clothsDesc || '无描述'}`
      trousersDesc =`裤子：${trousersDesc || '无描述'}`
      shoesDesc =`鞋子：${shoesDesc || '无描述'}`
      const title = nickName + gender + '\n';
      const content = [title, clothsDesc, trousersDesc, shoesDesc].join('\n');

      return {
        openId,
        longitude,
        latitude,
        id: _id,
        width: 14,
        height: 30,
        iconPath: '/static/imgs/other.png',
        callout: {
          content,
          color: '#333',
          fontSize: 12,
          padding: 10,
          borderRadius: 3,
          textAlign: 'left',
          borderWidth: 1,
          borderColor: '#CCC',
          bgColor: '#fff'
        },
      }
    })
    const matchIdx = data.findIndex(i => i.openId === OPENID)
    data.splice(matchIdx, 1)
    return {
      status: 1,
      data: data
    }
  } catch (e) {
    return {
      status: 0,
      data: []
    }
  }
}