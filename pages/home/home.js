// pages/home/home.js
var app = getApp();
var currentPage = 1;
var PAGE_SIZE = 4;

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
    isAuthLocation: false,
    isNoMoreData: false
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
      that.getNearbySkiller(currentPage);
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
        that.setData({
          isAuthLocation: true
        })
        that.getNearbySkiller(currentPage);
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
    console.log("onPullDownRefresh")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom");
    if(!this.data.isNoMoreData){
      this.getNearbySkiller(++currentPage);
    }
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
  getNearbySkiller: function(page){
    wx.showNavigationBarLoading();
    let _this = this;
    wx.request({
      url: app.globalData.urlBase2 + 'skillerUser/nearlyskillers',
      method: 'POST',
      data:{
        latitude: app.globalData.latitude,
        longitude: app.globalData.longitude,
        pageNo: page,
        pageSize: PAGE_SIZE
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        if(res.data.data.nearlyskillers == null || res.data.data.nearlyskillers.length == 0){
          _this.setData({
            isNoMoreData: true
          });
        } else if (res.data.data.nearlyskillers.length == PAGE_SIZE){
          _this.setData({
            recommends: _this.data.recommends.concat(res.data.data.nearlyskillers)
          });
        }else{
          _this.setData({
            isNoMoreData: true,
            recommends: _this.data.recommends.concat(res.data.data.nearlyskillers)
          });
        }
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function(){
        wx.hideNavigationBarLoading();
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