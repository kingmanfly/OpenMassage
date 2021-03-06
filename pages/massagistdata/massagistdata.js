// pages/massagistdata/massagistdata.js
var util = require('../../utils/util.js');
var netutil = require('../../utils/netutil.js');
var app = getApp();
var userInfo = {};

Page({
  /**
   * 页面的初始数据
   */
  data: {
    radioValues: [
      { 'value': '高级技师', 'selected': true },
      { 'value': '中级技师', 'selected': false },
      { 'value': '初级技师', 'selected': false },
      { 'value': '实习技师', 'selected': false }
    ],
    clazz: [],
    radioSexValues: [
      { 'value': '女', 'selected': true },
      { 'value': '男', 'selected': false }
    ],
    clazzSex: [],
    // 最多6张
    personShows: [
      '/images/icon-add.png',
    ],
    uploadShowsList:[],
    deleteShowsList: [],
    avatarShow: null,
    massagistLevel: 1,
    gender: 0,
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.initStatus();
    this.initSexStatus();
  },
  indexChanged: function (e) {
    // 点中的是组中第个元素
    var subIndex = e.target.dataset.index;
    var index = e.currentTarget.dataset.itemIndex;

    // 读取原始的数组
    var radioValues = this.data.radioValues;
    for (var i = 0; i < radioValues.length; i++) {
      // 全部改为非选中
      radioValues[i].selected = false;
      // 当前那个改为选中
      radioValues[subIndex].selected = true;
    }
    this.data.radioValues = radioValues;
    // 写回数据
    this.setData({
      radioValues: this.data.radioValues,
      massagistLevel: subIndex + 1
    });
    // clazz状态
    this.clazzStatus(index);
  },
  clazzStatus: function (index) {
    /* 此方法分别被加载时调用，点击某段时调用 */
    // class样式表如"selected last","selected"
    var clazz = [];
    // 参照数据源
    var radioValues = this.data.radioValues;
    for (var i = 0; i < radioValues.length; i++) {
      // 默认为空串，即普通按钮
      var cls = '';
      // 高亮，追回selected
      if (radioValues[i].selected) {
        cls += 'selected ';
      }
      // 最后个元素, 追加last
      if (i == radioValues.length - 1) {
        cls += 'last ';
      }
      //去掉尾部空格
      cls = cls.replace(/(\s*$)/g, '');
      clazz[i] = cls;
    }
    this.data.clazz = clazz;
    // 写回数据
    this.setData({
      radioValues: this.data.radioValues,
      clazz: this.data.clazz
    });
  },
  initStatus: function () {
    /* 此方法分别被加载时调用，点击某段时调用 */
    // class样式表如"selected last","selected"
    var clazz = [];
    // 参照数据源
    var radioValues = this.data.radioValues;
    for (var i = 0; i < radioValues.length; i++) {
      // 默认为空串，即普通按钮
      var cls = '';
      // 高亮，追回selected
      if (radioValues[i].selected) {
        cls += 'selected ';
      }
      // 最后个元素, 追加last
      if (i == radioValues.length - 1) {
        cls += 'last ';
      }
      //去掉尾部空格
      cls = cls.replace(/(\s*$)/g, '');
      clazz[i] = cls;
    }
    this.data.clazz = clazz;
    // 写回数据
    this.setData({
      radioValues: this.data.radioValues,
      clazz: this.data.clazz
    });
  },
  indexSexChanged: function (e) {
    // 点中的是组中第个元素
    var subIndex = e.target.dataset.index;
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;

    // 读取原始的数组
    var radioValues = this.data.radioSexValues;
    for (var i = 0; i < radioValues.length; i++) {
      // 全部改为非选中
      radioValues[i].selected = false;
      // 当前那个改为选中
      radioValues[subIndex].selected = true;
    }
    this.data.radioSexValues = radioValues;
    // 写回数据
    this.setData({
      radioSexValues: this.data.radioSexValues,
      gender: subIndex
    });
    // clazz状态
    this.clazzSexStatus(index);
    this.data.gender = subIndex;
  },
  clazzSexStatus: function (index) {
    /* 此方法分别被加载时调用，点击某段时调用 */
    // class样式表如"selected last","selected"
    var clazz = [];
    // 参照数据源
    var radioValues = this.data.radioSexValues;
    for (var i = 0; i < radioValues.length; i++) {
      // 默认为空串，即普通按钮
      var cls = '';
      // 高亮，追回selected
      if (radioValues[i].selected) {
        cls += 'selected ';
      }
      // 最后个元素, 追加last
      if (i == radioValues.length - 1) {
        cls += 'last ';
      }
      //去掉尾部空格
      cls = cls.replace(/(\s*$)/g, '');
      clazz[i] = cls;
    }
    this.data.clazzSex = clazz;
    // 写回数据
    this.setData({
      radioSexValues: this.data.radioSexValues,
      clazzSex: this.data.clazzSex
    });
  },
  initSexStatus: function () {
    /* 此方法分别被加载时调用，点击某段时调用 */
    // class样式表如"selected last","selected"
    var clazz = [];
    // 参照数据源
    var radioValues = this.data.radioSexValues;
    for (var i = 0; i < radioValues.length; i++) {
      // 默认为空串，即普通按钮
      var cls = '';
      // 高亮，追回selected
      if (radioValues[i].selected) {
        cls += 'selected ';
      }
      // 最后个元素, 追加last
      if (i == radioValues.length - 1) {
        cls += 'last ';
      }
      //去掉尾部空格
      cls = cls.replace(/(\s*$)/g, '');
      clazz[i] = cls;
    }
    this.data.clazzSex = clazz;
    // 写回数据
    this.setData({
      clazzSex: this.data.clazzSex
    });
  },
  onAvatarShow: function () {
    let _this = this;
    if (this.data.avatarShow == null){
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          console.log("tempFilePaths = " + tempFilePaths);
          _this.setData({
            avatarShow: tempFilePaths[0]
          });
        }
      })
    }
    
  },
  onDeleteAvatarShow: function () {
    this.setData({
      avatarShow: null
    })
  },
  onPreviewPic: function (event) {
    let _this = this;
    if (event.currentTarget.dataset.item == '/images/icon-add.png') {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          var pS = _this.data.personShows;
          pS.splice(pS.length - 1, 0, tempFilePaths[0]);
          _this.data.uploadShowsList.push(tempFilePaths[0]);
          _this.setData({
            personShows: pS,
            uploadShowsList: _this.data.uploadShowsList
          });
          if (_this.data.personShows.length > 6) {
            pS.pop();
            _this.setData({
              personShows: pS
            });
          }
        }
      });
    } else {
      wx.previewImage({
        current: 'http://106.14.176.248/kingman/massage/images/icon_me.png',
        urls: ['http://106.14.176.248/kingman/massage/images/banner_me.png', 'http://106.14.176.248/kingman/massage/images/breakfast.png', 'http://106.14.176.248/kingman/massage/images/icon_me.png']
      })
    }
  },

  onDeletePersonShow: function (event) {
    console.log("onDeletePersonShow" + event.currentTarget.id);
    var pS = this.data.personShows;
    pS.splice(parseInt(event.currentTarget.id), 1);
    console.log(event.currentTarget.dataset.item);
    if (String(event.currentTarget.dataset.item).substr(0,10) == 'http://tmp'){
      console.log("tmp");
      util.removeObjWithArr(this.data.uploadShowsList, event.currentTarget.dataset.item);
    }else{
      
      this.data.deleteShowsList.push(event.currentTarget.dataset.item);
    }
    if (pS[pS.length - 1] != '/images/icon-add.png') {
      pS.push('/images/icon-add.png');
    }
    this.setData({
      personShows: pS,
      uploadShowsList: this.data.uploadShowsList,
      deleteShowsList: this.data.deleteShowsList
    });
  },
  formSubmit: function (event) {
    console.log('event=' + event);
    if (this.checkFormSuccess(event)){
      this.saveMassigistInfo();
    }
  },
  checkFormSuccess: function (event) {
    var nickname = util.trim(event.detail.value.nickname, '');
    userInfo.nickname = nickname;
    if (nickname == null || nickname.length < 2) {
      wx.showToast({
        title: '取个风骚一点的名字吧',
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    var contact = util.trim(event.detail.value.contact, '');
    userInfo.contact = contact;
    if (contact == null || contact.length < 4) {
      wx.showToast({
        title: '微信格式不对呀，请认真填写',
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    var age = util.trim(event.detail.value.age, '');
    userInfo.age = age;
    if (age == null || age.length == 0){
      wx.showToast({
        title: '年龄字段不能为空',
        icon: 'success',
        duration: 2000
      })
      return false;
    } else if (parseInt(age) < 18) {
      wx.showToast({
        title: '还是去读书吧',
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    var height = util.trim(event.detail.value.height, '');
    userInfo.height = height;
    if (height == null || height.length == 0) {
      wx.showToast({
        title: '身高字段不能为空',
        icon: 'success',
        duration: 2000
      })
      return false;
    }else if (parseInt(height) < 150) {
      wx.showToast({
        title: '太矮了吧',
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    var introduce = util.trim(event.detail.value.introduce, '');
    userInfo.introduce = introduce;
    if (introduce == null || introduce.length == 0) {
      wx.showToast({
        title: '个人介绍不能为空',
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    var workspace = util.trim(event.detail.value.workspace, '');
    userInfo.workspace = workspace;
    if (workspace == null || workspace.length == 0) {
      wx.showToast({
        title: '工作地点不能为空',
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    if (this.data.avatarShow == null){
      wx.showToast({
        title: '头像不能为空',
        icon: 'success',
        duration: 2000
      })
      return false;
    }else{
      userInfo.avatarShow = this.data.avatarShow
    }
    return true;
  },
  saveMassigistInfo: function(){
    var _this = this;
    var uploadTask = wx.uploadFile({
      url: app.globalData.urlBase2 + 'skillerUser/skillerRegister',
      filePath: userInfo.avatarShow,
      name: 'file',
      formData: {
        phone: userInfo.contact,
        token: wx.getStorageSync(app.globalData.token),
        age: userInfo.age,
        height: userInfo.height,
        description: userInfo.introduce,
        level: this.data.massagistLevel,
        sex: this.data.gender,
        location: userInfo.workspace,
        latitude: '-1',
        longitude: '-1',
      },
      header: {
        'content-type': 'multipart/form-data'
      },
      success: function (res) {
        var data = JSON.parse(res.data);
        if (data.code == 1){
          _this.deletePersonShowsInServer(_this);
          console.log("基础信息写入成功");
          wx.redirectTo({
            url: '/pages/me/me',
          });
        }else{
          wx.showToast({
            title: '更新失败skillerRegister',
            icon: 'fail',
            duration: 2000
          })
        }
      },
      fail: function(res){
        console.log("uploadFile skillerUser/skillerRegister Fail res = " + res);
        wx.showToast({
          title: '更新失败skillerRegister',
          icon: 'fail',
          duration: 2000
        })
      }
    })
    /*uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })*/
  },
  deletePersonShowsInServer: function (that) {
    if (that.data.deleteShowsList.length == 0) {
      that.commitPersonShowsInServer(that);
    } else {
      wx.request({
        url: app.globalData.urlBase2 + 'skillerUser/delete',
        method: 'POST',
        data: {
          token: wx.getStorageSync(app.globalData.token),
          items: that.data.deleteShowsList.toString()
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if(res.statusCode == 0){
            that.commitPersonShowsInServer(that);
          }else{
            wx.showToast({
              title: '更新失败delete',
              icon: 'fail',
              duration: 2000
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '更新失败delete',
            icon: 'fail',
            duration: 2000
          })
        }
      })
    }
  },
  commitPersonShowsInServer: function(that){
    if(that.data.uploadShowsList.length == 0){
      wx.switchTab({
        url: '/pages/me/me',
      });
    }else{
      netutil.uploadimg({
        url: app.globalData.urlBase2 + 'skillerUser/insertPicShow',
        path: that.data.uploadShowsList
      }, 
      that,
      function (res) {
        console.log('res = ' + res);
        if (res == null || res.length == 0) {
          wx.showToast({
            title: '上传方法异常，请工程师调试',
            icon: 'fail',
            duration: 2000
          })
          return;
        } else {
          if (res.length > 0){
            that.setData({
              uploadShowsList: []
            });
            wx.switchTab({
              url: '/pages/me/me',
            })
          }
        }
      })
    }
  }
})