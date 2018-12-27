<template>
  <div class="container">
    <view class="profile-wrapper">
      <image
        class="avatar"
        src=""
      ></image>
      <view>
        <text>xxx</text>
      </view>
    </view>
    <view class="weui-cells__title">性别</view>
      <view class="weui-cells weui-cells_after-title">
          <checkbox-group >
              <label class="weui-cell weui-check__label" v-for="item in checkboxItems" :key="item.value">
                  <checkbox class="weui-check" value="item.value" checked="item.checked"/>
                  <view class="weui-cell__hd weui-check__hd_in-checkbox">
                      <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
                      <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="item.checked"></icon>
                  </view>
                  <view class="weui-cell__bd">{{item.name}}</view>
              </label>
          </checkbox-group>
      </view>
    <view class="weui-cells__title">穿着 描述</view>
      <view class="weui-cells weui-cells_after-title">
        <view class="weui-cell weui-cell_input">
            <view class="weui-cell__hd">
                <view class="weui-label">衣服</view>
            </view>
            <view class="weui-cell__bd">
                <input class="weui-input" placeholder="颜色、款式等描述"/>
            </view>
        </view>
        <view class="weui-cell weui-cell_input">
            <view class="weui-cell__hd">
                <view class="weui-label">裤子</view>
            </view>
            <view class="weui-cell__bd">
                <input class="weui-input" placeholder="颜色、款式等描述"/>
            </view>
         </view>
         <view class="weui-cell weui-cell_input">
            <view class="weui-cell__hd">
                <view class="weui-label">鞋子</view>
            </view>
            <view class="weui-cell__bd">
                <input class="weui-input" placeholder="颜色、款式等描述"/>
            </view>
         </view>
      </view>
    <view class="save-wrapper">
      <button class="weui-btn" type="primary">更新</button>
    </view>
  </div>
</template>

<script>

export default {
  data() {
    return {
      checkboxItems: [
        { name: '男', value: 'male', checked: true },
        { name: '女', value: 'female' }
      ],
    }
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
    padding: 80rpx 30rpx 10rpx;
  }
</style>
