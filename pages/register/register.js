// pages/register/register.js
var util = require('../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // fromType 1. 来自注册，2. 来自忘记密码
    fromType: null,
    verifyCode:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var FROM_REGISTER = 1;
    var FROM_FORGOT_PASSWORD = 2;
    if (options.type == FROM_FORGOT_PASSWORD) {
      this.setData({ fromType: FROM_FORGOT_PASSWORD });
      wx.setNavigationBarTitle({
        title: '忘记密码',
      })
    }else{
      this.setData({ fromType: FROM_REGISTER});
    }
  },
  onSendVerifyCode:function(){
    this.setData({
      verifyCode:1111
    })
  },
  formSubmit: function(event){
    console.log(event);
    if(this.checkFormSuccess(event)){
      console.log("checkFormSuccess"); 
      let _this = this;
      wx.request({
        url: app.globalData.urlBase2 + 'user/register/',
        method: 'POST',
        data:{
          phone: util.trim(event.detail.value.phone, 'all'),
          password: event.detail.value.password,
          checkcode:  1111,
          neckname: event.detail.value.nick
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
          if(res.data.code == 1){
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 3000
            });
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/login/login',
              });
            }, 3000)
          }else{
            wx.showToast({
              title: '注册' + res.data.failureDetail,
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
    var result = util.trim(event.detail.value.phone,'all');
    console.log("result=" + result);
    if (result.length != 11) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'success',
        duration: 2000
      })
      return false;
    } else if (event.detail.value.validCode != '1111'){
      wx.showToast({
        title: '验证码不正确',
        icon: 'success',
        duration: 2000
      })
      return false;
    }else if (event.detail.value.password != event.detail.value.passwordConfirm) {
      wx.showToast({
        title: '密码输入不一致',
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    return true;
  }
})