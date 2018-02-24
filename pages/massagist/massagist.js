// pages/masterlist/masterlist.js
var util = require('../../utils/util.js');
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    massagist: {
      master_dec: "",
      phone: ""
    },
    formatPhone: "",
    shows: [],
    registerUser: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.getMassigistDetail(options.id);
    if(app.globalData.isLogin){
      this.setData({
        registerUser: true
      })
    }
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
          massagist: res.data.data,
          formatPhone: util.formatSecretData(res.data.data.phone),          
        });
        if (res.data.data.pic_show_path != null && res.data.data.pic_show_path.length > 0){
          _this.setData({
            shows: res.data.data.pic_show_path.split(",")
          });
        }
        console.log("shows = " + _this.data.shows);
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  },
  onLaunchLogin: function(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  onPreview: function(event){
    console.log(event);
    wx.previewImage({
      current: event.currentTarget.dataset.item, // 当前显示图片的http链接
      urls: event.currentTarget.dataset.set // 需要预览的图片http链接列表
    })
  }
})