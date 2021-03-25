```
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getUrlList = (imgs, common) => {
  if (!imgs || (typeof imgs !== 'string' && !imgs.length)) {
    return [];
  }
  try {
    const urlList = imgs instanceof Array ? imgs : JSON.parse(imgs ? imgs : '[]');
    return (urlList.length ? urlList : []).map(img => getUrl(img, common))
  } catch (e) {
    return [];
  }
}

function getUrl(img, common) {
  if (!img) {
    return '';
  }

  if (typeof img === 'string' && /http/.test(img)) {
    return img.replace(' http://wx.qlogo.cn', ' http://thirdwx.qlogo.cn') + '?x-oss-process=image/resize,w_750';
  } else {
    try {
      const image = typeof img === 'string' ? JSON.parse(img) : img;
      return `http://${image.host}:8000/file/read/${image.id},${image.secret},${common ? 'common' : 'thumb'}`;
    } catch (e) {
      return '';
    }
  }
}

function getSubstr(list) {
  let newList = [];
  if ((list || []).length > 0) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].indexOf('?') !== -1) {
        newList.push(list[i].substr(0, list[i].lastIndexOf('?')))
      } else {
        newList.push(list[i])
      }
    }
  }
  return newList;
}


function getSingleSubstr(str) {//截取单个文件地址？后面的字符串
  let newStr = '';
  if (str && typeof (str) == 'string' && str.indexOf('?') !== -1) {
    newStr = str.substr(0, str.lastIndexOf('?'))
  } else {
    newStr = str
  }
  return newStr;
}

function getVideoInfo(data) {
  if (data && typeof data === 'string') {
    try {
      return JSON.parse(data);

    } catch (ex) {
      return {}
    }
  } else {
    return data;
  }
}

function getLogo(path, type) {
  const defaultLogo = '../../images/default-service-avatar.png';
  const app = getApp();
  if (/^\[/.test(path)) {
    try {
      return getUrlList(path)[0] || defaultLogo;
    } catch (e) {
      return defaultLogo;
    }
  }
  if (/^http/.test(path)) {
    return path;
  } else if (['men.png', 'man.png', 'women.png'].find(item => item === path)) {
    return `/images/man.png`;
  } else if (!path) {
    return defaultLogo;
  } else {
    return `${app.globalData.host}/api/pic/download/${path}?type=${type || 'group'}`
  }
}


function base64_encode(str) { // 编码，配合encodeURIComponent使用
  var c1, c2, c3;
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var i = 0,
    len = str.length,
    strin = '';
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      strin += base64EncodeChars.charAt(c1 >> 2);
      strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
      strin += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      strin += base64EncodeChars.charAt(c1 >> 2);
      strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      strin += base64EncodeChars.charAt((c2 & 0xF) << 2);
      strin += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    strin += base64EncodeChars.charAt(c1 >> 2);
    strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    strin += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    strin += base64EncodeChars.charAt(c3 & 0x3F)
  }
  return strin
}

function base64_decode(input) { // 解码，配合decodeURIComponent使用
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  while (i < input.length) {
    enc1 = base64EncodeChars.indexOf(input.charAt(i++));
    enc2 = base64EncodeChars.indexOf(input.charAt(i++));
    enc3 = base64EncodeChars.indexOf(input.charAt(i++));
    enc4 = base64EncodeChars.indexOf(input.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output = output + String.fromCharCode(chr1);
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
  }
  return utf8_decode(output);
}


function utf8_decode(utftext) { // utf-8解码
  var string = '';
  let i = 0;
  let c = 0;
  let c1 = 0;
  let c2 = 0;
  while (i < utftext.length) {
    c = utftext.charCodeAt(i);
    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if ((c > 191) && (c < 224)) {
      c1 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
      i += 2;
    } else {
      c1 = utftext.charCodeAt(i + 1);
      c2 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
      i += 3;
    }
  }
  return string;
}

function getDecodedUrl(str) {
  return base64_decode(str.replace(new RegExp('_eq_', 'g'), '='));
}

function getEncodedUrl(str) {
  return base64_encode(str).replace(new RegExp('=', 'g'), '_eq_');
}

function getSharePath(str, type, item_id) {
  const app = getApp();
  const {binded, currentBusinessId, bindedEmployee} = app.globalData;
  if (binded) {
    return `${str}&state=${type}-_-${currentBusinessId}-_-${bindedEmployee}-_-${item_id}-_-0`
  } else {
    const shareInfo = wx.getStorageSync(`share-info-${currentBusinessId}`);
    if (shareInfo) {
      const shareArr = shareInfo.split('-_-');
      return `${str}&state=${type || ''}-_-${currentBusinessId}-_-${shareArr[2]}-_-${item_id || ''}-_-0`;
    }
  }
  return str;
}

function translateBaiduToGCJ02(latitude, longitude) {
  const xPI = 3.14159265358979324 * 3000.0 / 180.0;
  const x = longitude - 0.0065;
  const y = latitude - 0.006;
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xPI);
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xPI);
  return {latitude: z * Math.cos(theta), longitude: z * Math.sin(theta)};
}

module.exports = {
  formatTime,
  getUrlList,
  getSingleSubstr,
  getVideoInfo,
  getUrl,
  getLogo,
  base64_encode,
  base64_decode,
  getEncodedUrl,
  getDecodedUrl,
  getSharePath,
  getSubstr,
  translateBaiduToGCJ02
}

```

