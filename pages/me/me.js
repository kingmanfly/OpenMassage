// pages/me/me.js
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    nickName: "登录/注册",
    personShows: [],
    profile: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad");
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (app.globalData.isLogin){
      this.setData({
        isLogin: true
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
          if (_this.data.profile.pic_show_path != null && _this.data.profile.pic_show_path.length > 0){
            _this.setData({
              personShows: _this.data.profile.pic_show_path.split(",")
            });
          }
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