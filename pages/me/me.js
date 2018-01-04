// pages/me/me.js
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    nickName: "登录/注册",
    personShows: [
      { id: -1, img: '/images/meinv1.jpg' },
      { id: -1, img: '/images/meinv2.jpg' },
      { id: -1, img: '/images/meinv1.jpg' },
      { id: -1, img: '/images/meinv2.jpg' },
    ],
    profile: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (app.globalData.isLogin){
      this.setData({
        isLogin: true,
        nickName: '粉红佳人'
      });
      this.getProfile();
      
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.isFromLoginUI){
      this.setData({
        isLogin: true
      });
      this.getProfile();
      this.setData({ nickName: "一叶知秋" })
    }
  },
  getProfile: function(){
    let _this = this;
    wx.request({
      url: app.globalData.urlBase2 + 'user/getprofile',
      method: 'GET',
      data: {
        token: wx.getStorageSync(app.globalData.token)
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 1) {
          _this.setData({
            profile: res.data.data.PersonalInformation[0]
          });
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  onNickNameClick: function () {
    if (!this.data.isLogin) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  onLogout: function(){
    wx.setStorageSync(app.globalData.token, null);
    app.globalData.isLogin = false;
    app.globalData.isFromLoginUI = false;
    this.setData({
      isLogin:false,
      nickName: '登录/注册'
      
    });
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  onMassagistData: function(){
    wx.navigateTo({
      url: '/pages/massagistdata/massagistdata',
    })
  },
  onEditMassagistData: function () {
    wx.navigateTo({
      url: '/pages/massagistdata/massagistdata',
    })
  },
})