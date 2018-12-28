<template>
  <div class="container">
    <view v-if="init">
      <view v-show="nickName" class="profile-wrapper">
      <image
        class="avatar"
        :src="avatarUrl"
      ></image>
      <view>
        <text>{{nickName}}</text>
      </view>
      </view>
      <view class="weui-cells__title">描述下自己的穿着打扮</view>
        <view class="weui-cells weui-cells_after-title">
          <view class="weui-cell weui-cell_input">
            <view class="weui-cell__hd">
              <view class="weui-label">衣服</view>
            </view> 
            <view class="weui-cell__bd">
              <input v-model="clothsDesc" @change class="weui-input" placeholder="颜色、款式等描述"/>
            </view>
          </view>
          <view class="weui-cell weui-cell_input">
            <view class="weui-cell__hd">
                <view class="weui-label">裤子</view>
            </view>
            <view class="weui-cell__bd">
                <input v-model="trousersDesc" class="weui-input" placeholder="颜色、款式等描述"/>
            </view>
          </view>
          <view class="weui-cell weui-cell_input">
            <view class="weui-cell__hd">
                <view class="weui-label">鞋子</view>
            </view>
            <view class="weui-cell__bd">
                <input v-model="shoesDesc" class="weui-input" placeholder="颜色、款式等描述"/>
            </view>
          </view>
        </view>
      <view class="save-wrapper">
        <button @click="updateInfo" class="weui-btn" type="primary">更新</button>
      </view>
      <user-info-pane :show="showAuthorize" @hidePane="hideAuthorize" @getUserInfoSuc="authorizedSuc" />
    </view>
    <view v-else class="weui-loadmore loading-wrapper">
        <view class="weui-loading"></view>
        <view class="weui-loadmore__tips loading-tip">正在加载</view>
    </view>
  </div>
</template>

<script>
// import wxSync from '@/utils/wxApiSync'
import wxCloudSync from '@/utils/cloudSync'
import userInfoPane from '@/components/userInfoPane'

export default {
  data() {
    return {
      showAuthorize: false,
      avatarUrl: '/static/imgs/avatar.png',
      nickName: '路人甲',
      trousersDesc: '',
      shoesDesc: '',
      clothsDesc: '',
      init: false,
    }
  },
  components: {
    userInfoPane
  },
  methods: {
    async updateInfo() {
      if (this.nickName) {
        const { clothsDesc, trousersDesc, shoesDesc, } = this;
        const userInfo = {
          clothsDesc,
          trousersDesc,
          shoesDesc
        }
        await wxCloudSync('saveUserInfo', userInfo, true)
        wx.switchTab({
          url: '/pages/index/main'
        })
      } else {
        this.showAuthorize = true;
      }
    },
    hideAuthorize() {
      this.showAuthorize = false;
    },
    async authorizedSuc() {
      await this.setUserInfo()
      await this.updateInfo()
    },
    async setUserInfo() {
      const userInfo = await wxCloudSync('getUserInfo');
      const {
        nickName,
        avatarUrl,
        clothsDesc,
        trousersDesc,
        shoesDesc
      } = userInfo.result.data;
      if (nickName) {
        this.nickName = nickName;
        this.avatarUrl = avatarUrl;
        this.shoesDesc = shoesDesc;
        this.trousersDesc = trousersDesc;
        this.clothsDesc = clothsDesc;
      }
    }
  },
  async beforeMount() {
    await this.setUserInfo()
    this.init = true;
  }
};
</script>

<style scoped>
  .profile-wrapper {
    padding: 20rpx 0 5rpx;
    text-align: center;
  }
        
  .avatar {
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
    background-color: #eeeeee;
  }

  .save-wrapper {
    padding: 100rpx 30rpx 10rpx;
  }

  .loading-wrapper {
    padding-top: 150rpx;
  }

  .loading-tip {
    color: #999999;
  }
</style>
