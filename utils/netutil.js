var app = getApp();

function uploadimg(data, _this, callback) {
  var that = _this,
    i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
  var successArray = new Array();


  wx.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: 'file',
    formData: {
      token: wx.getStorageSync(app.globalData.token)
    },
    success: function (res) {
      success++;
      console.log(res)
      console.log(i);
      successArray.push(i);
    },
    fail: function (res) {
      fail++;
      console.log('fail:' + i + "fail:" + fail);
    },
    complete: function (res) {
      console.log(i);
      i++;
      if (i == data.path.length) {  //当图片传完时，停止调用     
        console.log('执行完毕');
        console.log('成功：' + success + " 失败：" + fail);
        if (typeof callback === "function") {
          console.log('I am here')
          callback(successArray);
        }
      } else {
        console.log(i);
        data.i = i;
        data.success = success;
        data.fail = fail;
        uploadimg(data, _this, callback);
      }
    }
  })
}

module.exports = {
  uploadimg: uploadimg
}