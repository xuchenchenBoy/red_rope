<template>
  <view class="container">
    <view v-if="init" class="container">
      <map 
        id="map"
        v-if="showMap"
        class="map" 
        :longitude="longitude" 
        :latitude="latitude" 
        scale="13" 
        show-location
        :markers="markers"
      >
        <cover-view @click="getSelfLocation" class="location-icon-wrapper">
          <cover-image class="location-icon" src="/static/imgs/location.png"></cover-image>
        </cover-view>
      </map>
      <authorizedSetting v-else @opensettingSuc="opensettingSuc" />
    </view>
    <loading v-else />
  </view>
</template>

<script>
import wxSync from '@/utils/wxApiSync'
import wxCloudSync from '@/utils/cloudSync'
import authorizedSetting from '@/components/authorizedSetting'
import loading from '@/components/loading'

export default {
  components: {
    authorizedSetting,
    loading
  },
  data() {
    return {
      longitude: 120.2, // 初始时的杭州经纬度
      latitude: 30.3,
      showMap: true, // 是否显示地图
      init: false, // 是否初始化
      markers: [], // 他人的定位点信息
      timer: null, // 轮询请求定位点信息
    }
  },
  methods: {
    async opensettingSuc(isAgree) { // 授权设置页返回
      if (isAgree) {
        wx.showLoading({ title: '加载地图中...' })
        await this.getSelfLocation()
        wx.hideLoading()
        this.showMap = true;
        await this.getOtherLocation()
        await this.updateOtherLocation();
      }
    },
    async getSelfLocation() { // 获取自身的定位坐标
      const location = await wxSync({ api: 'getLocation', params: { type: 'gcj02' } })
      const { latitude, longitude } = location;
      await wxCloudSync('saveUserInfo', { latitude, longitude })
      this.latitude = latitude;
      this.longitude = longitude;
      const mapConent = wx.createMapContext('map');
      mapConent.moveToLocation();
    },
    getOtherLocation() {
      this.timer = setInterval(async () => {
        await this.updateOtherLocation();
        await this.updateSelfLocation();
      }, 8 * 1000)
    },
    async updateOtherLocation() {
      const res = await wxCloudSync('getOtherLocation')
      this.markers = res.result.data;
    },
    async updateSelfLocation() {
      const location = await wxSync({ api: 'getLocation', params: { type: 'gcj02' } })
      const { latitude, longitude } = location;
      await wxCloudSync('saveUserInfo', { latitude, longitude })
    }
  },
  onShareAppMessage() {
    return {
      title: 'ta就在你走的这条小路上',
      path: '/pages/index/main'
    }
  },
  async onLoad() { // 定位授权
    const settings = await wxSync({ api: 'getSetting' })
    if (settings.authSetting['scope.userLocation']) {
      await this.getSelfLocation()
    } else {
      try {
        await wxSync({
          api: 'authorize',
          params: { scope: 'scope.userLocation' }
        })
        await this.getSelfLocation()
      } catch (e) {
        this.showMap = false;
      }
    }

    if (this.showMap) { // 更新他人的定位信息
      await this.updateOtherLocation();
      this.getOtherLocation();
    }

    this.init = true;
  },
  mounted() {
    const mapConent = wx.createMapContext('map');
    mapConent.moveToLocation();
  },
  onUnload() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style scoped>
  .map {
    width: 100%;
    height: 100%;
  }

  .location-icon-wrapper {
    position: fixed;
    left: 50rpx;
    bottom: 100rpx;
    width: 70rpx;
    height: 70rpx;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 3rpx 2rpx 0rpx #999;
  }

  .location-icon-wrapper:active {
    background-color: #f8f8f8;
  }

  .location-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 54rpx;
    height: 54rpx;
    transform: translate(-50%, -50%);
  }

  .loading-tip {
    color: #999999;
  }
</style>
