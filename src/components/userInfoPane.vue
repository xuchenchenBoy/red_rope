<template>
  <view>
    <view v-show="show" class="weui-panel pane" :class="{show: show}">
      <view class="weui-panel__hd center">用户授权操作</view>
      <view class="weui-panel__bd">
        <view class="weui-media-box weui-media-box_text center">
          <button @getuserinfo="getUserInfo" open-type="getUserInfo" class="weui-btn" type="primary" size="mini">确定</button>
        </view>
      </view>
    </view>
    <view v-show="show" class="mask" @click="hidePane"></view>
  </view>
</template>

<script>
  import wxCloudSync from '@/utils/cloudSync'

  export default {
    props: {
      show: {
        type: Boolean,
        require: true,
        default: false
      }
    },
    methods: {
      async getUserInfo(e) {
        let userInfo = e.target.rawData;
        if (userInfo) {
          userInfo = JSON.parse(userInfo)
          await wxCloudSync('saveUserInfo', userInfo)
          this.$emit('hidePane')
          this.$emit('getUserInfoSuc')
        } else {
          // ...
        }
      },
      hidePane() {
        this.$emit('hidePane')
      }
    }
  }
</script>

<style scoped>
  .center {
    text-align: center;
  }

  @keyframes slide {
    from {
      bottom: -242rpx;
    }
    to {
      bottom: 0;
    }
  }

  .pane {
    position: fixed;
    left: 0;
    bottom: -242rpx;
    width: 100%;
    z-index: 999;
  }

  .show {
    animation: slide 1s forwards;
  }

  .mask {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .55);
  }
</style>