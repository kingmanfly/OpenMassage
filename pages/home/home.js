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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getNearbySkiller();
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
        var ii = 1;
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }
})