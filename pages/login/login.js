var util = require('../../utils/util.js');
var app = getApp();

Page({
  data:{

  },

  onLogin: function(token){
    wx.setStorageSync(app.globalData.token, token);
    app.globalData.isLogin = true;
    app.globalData.isFromLoginUI = true;
    wx.switchTab({
      url: '/pages/me/me',
    })
  },
  onRegister: function(){
    wx.navigateTo({
      url: '/pages/register/register?type=1',
    })
  },
  onForgetPassword: function(){
    wx.navigateTo({
      url: '/pages/register/register?type=2',
    })
  },
  formSubmit: function(event){
    console.log(event);
    let _this = this;
    if (this.checkFormSuccess(event)){
      wx.request({
        url: app.globalData.urlBase2 + 'user/login',
        method: 'POST',
        data: {
          phone: event.detail.value.account,
          password: event.detail.value.password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
          if(res.data.code == 1){
            _this.onLogin(res.data.data.token);
          }else{
            wx.showToast({
              title: '登录 ' + res.data.failureDetail,
              icon: 'success',
              duration: 3000
            });
          }
        },
        fail: function (res) {
          console.log(res);
        }
      })
    }
  },
  checkFormSuccess: function(event){
    var result = util.trim(event.detail.value.account, 'all');
    console.log("result=" + result);
    if (result.length != 11) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'success',
        duration: 2000
      })
      return false;
    } 
    return true;
  }
})