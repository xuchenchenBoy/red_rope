<template>
  <div class="container">
    <view v-if="init" class="content">
      <view class="card profile-wrapper">
        <image
          class="avatar"
          :src="avatarUrl || '/static/imgs/avatar.png'"
        ></image>
        <view>
          <text>{{nickName || '路人甲'}}</text>
        </view>
      </view>
      <view class="card description-wrapper">
        <view class="clothing-desc">
          <image class="clothing" src="/static/imgs/cloths.png" />
          <input class="clothing-desc-input" placeholder-style="font-size: 28rpx;color: rgba(0,0,0,0.20)" placeholder-class="placeholder-input" v-model="clothsDesc" type="text" placeholder="颜色、款式等描述" />
        </view>
        <view class="clothing-desc">
          <image class="clothing" src="/static/imgs/trousers.png" />
          <input class="clothing-desc-input" placeholder-class="placeholder-input" placeholder-style="font-size: 28rpx;color: rgba(0,0,0,0.20)" v-model="trousersDesc" type="text" placeholder="颜色、款式等描述" />
        </view>
        <view class="clothing-desc">
          <image class="clothing" src="/static/imgs/shoes.png" />
          <input class="clothing-desc-input" placeholder-class="placeholder-input" placeholder-style="font-size: 28rpx;color: rgba(0,0,0,0.20)" v-model="shoesDesc" type="text" placeholder="颜色、款式等描述" />
        </view>
        <button @click="updateInfo" plain="true" class="save-btn" hover-class="hover-btn" >更新</button>
      </view>
      <user-info-pane :show="showAuthorize" @hidePane="hideAuthorize" @getUserInfoSuc="authorizedSuc" />
    </view>
    <view v-else class="weui-loadmore loading-wrapper">
        <view class="weui-loading"></view>
        <!-- <view class="weui-loadmore__tips loading-tip">正在加载</view> -->
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
      avatarUrl: '',
      nickName: '',
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
      const { clothsDesc, trousersDesc, shoesDesc, } = this;
      if (!clothsDesc && !trousersDesc && !shoesDesc) {
        wx.showToast({
          title: '请填写穿着描述哦',
          icon: 'none',
          duration: 1500
        })
      } else if (this.nickName) {
        const userInfo = {
          clothsDesc,
          trousersDesc,
          shoesDesc
        }
        await wxCloudSync('saveUserInfo', userInfo, true)
        // wx.switchTab({
        //   url: '/pages/index/main'
        // })
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
      if (nickName && this.init) {
        this.nickName = nickName;
        this.avatarUrl = avatarUrl;
      } else if (nickName) {
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
  .content {
    padding: 36rpx 62rpx;
  }

  .card {
    width: 100%;
    box-sizing: border-box;
    background: #FFF;
    box-shadow: 0 4rpx 8rpx 2rpx rgba(231,231,231,0.50);
    border-radius: 16rpx;
  }

  .profile-wrapper {
    padding: 70rpx 0 38rpx;
    text-align: center;
    margin-bottom: 36rpx;
  }

  .profile-wrapper text {
    font-size: 28rpx;
    color: rgba(0,0,0,0.20);
  }
        
  .avatar {
    width: 104rpx;
    height: 104rpx;
    margin-bottom: .54rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .description-wrapper {
    padding: 46rpx 50rpx 50rpx;
  }

  .clothing-desc {
    display: flex;
    align-items: flex-end;
    padding-bottom: 81rpx;
  }

  .clothing {
    width: 80rpx;
    height: 80rpx;
    margin-right: 23rpx;
  }

  .clothing-desc-input {
    flex: 1;
    font-size: 28rpx;
    border-bottom: 2rpx solid #F4F4F4;
  }
  
  .placeholder-input {
    font-size: 28rpx;
    color: rgba(0,0,0,0.20);
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

  .save-btn {
    border: 2rpx solid #F0F0F0;
    border-radius: 14rpx;
    font-family: PingFangSC-Medium;
    font-size: 36rpx;
    color: #EAEAEA;
    background-color: #fff;
  }

  .hover-btn {
    background-color: rgba(0, 0, 0, .05);
  }
</style>
