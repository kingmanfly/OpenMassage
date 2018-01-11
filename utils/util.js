function trim(str, is_global){
  if(str != null && str.length > 0){
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global != null && is_global.toLowerCase() == "all") {
      result = result.replace(/\s/g, "");
    }
    return result;
  }else{
    console.log("处理空的数据");
    return "";
  }
}

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function removeObjWithArr(_arr, _obj) {
  var length = _arr.length;
  for (var i = 0; i < length; i++) {
    if (_arr[i] == _obj) {
      if (i == 0) {
        _arr.shift(); //删除并返回数组的第一个元素
        return;
      }else if (i == length - 1) {
        _arr.pop();  //删除并返回数组的最后一个元素
        return;
      }else {
        _arr.splice(i, 1); //删除下标为i的元素
        return;
      }
    }
  }
}

module.exports = {
  formatTime: formatTime,
  trim: trim,
  removeObjWithArr: removeObjWithArr
}
