// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 广告栏
    imgUrls: [
      app.globalData.urlBase + 'massage/images/banner1.png',
      app.globalData.urlBase + 'massage/images/banner1.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    // 附近按摩技师
    recommends: [],
    isAuthLocation: false
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    if (app.globalData.latitude > 0){
      that.setData({
        isAuthLocation: true
      })
      that.getNearbySkiller();
    }
  },
  getLocation: function(){
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        app.globalData.latitude = res.latitude;
        app.globalData.longitude = res.longitude;
        console.log("latitude = " + app.globalData.latitude);
        console.log("longitude = " + app.globalData.longitude);
        that.getNearbySkiller();
      },
      fail: res => {
        console.log("fail res = " + res);
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  onItemClick: function (event) {
    console.log(event);
    wx.navigateTo({
      url: '/pages/massagist/massagist?id=' + event.currentTarget.id,
    })
  },
  getNearbySkiller: function(){
    let _this = this;
    wx.request({
      url: app.globalData.urlBase2 + 'skillerUser/nearlyskillers',
      method: 'POST',
      data:{
        latitude: app.globalData.latitude,
        longitude: app.globalData.longitude,
        pageNo: '1',
        pageSize: '10'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        _this.setData({
          recommends:res.data.data.nearlyskillers
        });
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  onAuthLocation: function(){
    console.log("onAuthLocation");
    var that = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userLocation']) {
          // 已经授权，可以直接调用 getLocation，不会弹框
          that.getLocation();
        } else {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting['scope.userLocation'] == true){
                that.setData({
                  isAuthLocation: true
                })
                that.getLocation();
              }
            }
          });
        }
      }
    });
  }
})