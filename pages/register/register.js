// pages/register/register.js
var util = require('../../utils/util.js');
var app = getApp();
var countdown = 60;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // fromType 1. 来自注册，2. 来自忘记密码
    fromType: null,
    verifyCode: null,
    passwordTag: true,
    enableGet: true,
    countDownSecond: "60",
    userPhone: null
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
    } else {
      this.setData({ fromType: FROM_REGISTER });
    }
  },
  userPhoneInput: function (e) {
    this.setData({
      userPhone: e.detail.value
    })
  },
  onSendVerifyCode: function () {
    var that = this;
    this.setData({
      enableGet: (!that.data.enableGet)
    });
    that.settime(that);
    var phone = util.trim(that.data.userPhone,"all");
    if (phone == null || phone.length != 11){
      wx.showToast({
        title: '请输入手机号',
        icon: 'fail',
        duration: 3000
      });
      return;
    }
    wx.request({
      url: app.globalData.urlBase2 + 'user/getVerifyCode/',
      method: 'POST',
      data: {
        phone: phone
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res){
        console.log(res);
      },
      fail: function(res){
        console.log(res);
      }
    })
  },

  settime: function (that) {
    if (countdown == 0) {
      that.setData({
        enableGet: true
      })
      countdown = 60;
      return;
    } else {
      that.setData({
        enableGet: false,
        countDownSecond: countdown
      });
      countdown--;
    }
    setTimeout(function () {
      that.settime(that)
    }, 1000)
  },
  formSubmit: function (event) {
    console.log(event);
    if (this.checkFormSuccess(event)) {
      console.log("checkFormSuccess");
      let _this = this;
      if (this.data.fromType == 1){
        wx.request({
          url: app.globalData.urlBase2 + 'user/register/',
          method: 'POST',
          data: {
            phone: util.trim(event.detail.value.phone, 'all'),
            password: event.detail.value.password,
            checkcode: event.detail.value.validCode,
            nickname: event.detail.value.nickname
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data);
            if (res.data.code == 1) {
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
            } else {
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
        });
      }else{
        wx.request({
          url: app.globalData.urlBase2 + 'user/passwordBack/',
          method: 'POST',
          data: {
            phone: util.trim(event.detail.value.phone, 'all'),
            password: event.detail.value.password,
            checkcode: event.detail.value.validCode
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data);
            if (res.data.code == 1) {
              wx.showToast({
                title: '重置密码成功',
                icon: 'success',
                duration: 3000
              });
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/login/login',
                });
              }, 3000)
            } else {
              wx.showToast({
                title: '重置失败 ' + res.data.failureDetail,
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
      
    }
  },
  checkFormSuccess: function (event) {
    var result = util.trim(event.detail.value.phone, 'all');
    console.log("result=" + result);
    if (result.length != 11) {
      wx.showToast({
        title: '手机格式不正确',
        icon: 'success',
        duration: 2000
      })
      return false;
    } else if (event.detail.value.validCode.length != 4) {
      wx.showToast({
        title: '验证码不正确',
        icon: 'success',
        duration: 2000
      })
      return false;
    } else if (event.detail.value.password != event.detail.value.passwordConfirm) {
      wx.showToast({
        title: '密码输入不一致',
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    return true;
  },
  onTogglePasswordViewStatus: function () {
    this.setData({
      passwordTag: !this.data.passwordTag
    });
  }
})