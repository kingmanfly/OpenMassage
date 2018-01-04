// pages/masterlist/masterlist.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    "massagist": {
      "stars": [0, 1, 2],
      "master_dec": "副主任医师,毕业于北京中医药大学中医系,师从于全国著名中医妇科专家郭志强教授,从事医疗工作二十余年.擅长治疗男女不育、不孕症,盆腔炎,顽固性痛经,崩漏,乳腺增生,子宫肌瘤,月经不调,更年期综合征等妇科疑难病症.",
      "choose_num": "666",
      
    },
    "shows": [
      {
        "img": app.globalData.urlBase + "massage/images/spa_detail1.png",
      },
      {
        "img": app.globalData.urlBase + "massage/images/spa_detail2.png",
      },
      {
        "img": app.globalData.urlBase + "massage/images/spa_detail3.png",
      },
      {
        "img": app.globalData.urlBase + "massage/images/spa_detail4.png",
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.getMassigistDetail(options.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
  getMassigistDetail: function(ID){
    let _this = this;
    wx.request({
      url: app.globalData.urlBase2 + 'skillerUser/skillerdetail',
      method:'GET',
      data:{
        id: ID
      },
      success: function(res){
        console.log(res.data);
        _this.setData({
          massagist: res.data.data
        });
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  }
})