App({
  globalData: {
    token: 'token',
    urlBase: "http://106.14.176.248/kingman/",
    urlBase2: "http://localhost:8080/",
    isLogin: false,
    isFromLoginUI: false,
    userInfo: null,
    latitude: -1,
    longitude: -1
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var that = this;
    this.globalData.isLogin = wx.getStorageSync(this.globalData.token) != null ? true : false;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          that.getUserInfo();
        } else {
          console.log("not auth");
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              that.getUserInfo();
            }
          })
        }
      }
    });
    that.getLocation();
  },
  getUserInfo: function(){
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo

        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    }) 
  },
  getLocation: function(){
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        that.globalData.latitude = res.latitude;
        that.globalData.longitude = res.longitude;
        if (that.globalData.isLogin){
          wx.request({
            url: that.globalData.urlBase2 + 'user/flashposition',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              token: wx.getStorageSync(that.globalData.token),
              latitude: that.globalData.latitude,
              longitude: that.globalData.longitude,
            },
            success: function (res) {
              console.log(res.data);
            },
            fail: function(res){
              console.log(res.data);
            }
          })
        }
      }
    })
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})
