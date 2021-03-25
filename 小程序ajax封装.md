### ajax封装

```
let cookie = '';
const app = getApp()
function ajax(opts, appInstance) {
  const app = appInstance || getApp();
  let businessid = '';
  let user_id;
  const cacheInfo = wx.getStorageSync(`share-info-${app.globalData.currentBusinessId}`);
  if (cacheInfo) {
    user_id = cacheInfo.split('-_-')[2];
  }
  if (opts.data && opts.data.businessid) {
    businessid = opts.data.businessid;
  } else {
    if (app.globalData.currentBusinessId && app.globalData.currentBusinessId !== 'undefined') {
      businessid = app.globalData.currentBusinessId;
    } else {
      businessid = '';
    }
  }
  
  let data = opts.data || {};
  const lastVisited = app.globalData[`lastVisitTime-${opts.url}`];
  const lastQueryData = app.globalData[`lastQueryData-${opts.url}`];
  const lastUrl = app.globalData[`lastVisitedUrl`];
  if (lastUrl === opts.url && new Date().getTime() - Number(lastVisited) < 1000 * 5 && JSON.stringify(data) === lastQueryData) {
    console.error(`请求过于频繁，已限流:${opts.url}`);
    return
  }
  app.globalData[`lastVisitTime-${opts.url}`] = new Date().getTime();
  app.globalData[`lastQueryData-${opts.url}`] = JSON.stringify(data);
  app.globalData['lastVisitedUrl'] = opts.url;
  
  wx.request({
    url: `${app.globalData.host}${opts.url}`,
    data: JSON.stringify({
      ...opts.data,
      from_wechat: 1,
      user_id: (opts.data && opts.data.user_id) ? opts.data.user_id : user_id,
      session_key: app.globalData.session_key,
      wechat_user_type: 2,
      businessid: businessid,
    }),
    method: (opts.method || 'post').toUpperCase(),
    header: {
      'Cookie': app.globalData && app.globalData.cookie,
      'Set-Cookie': app.globalData && app.globalData.cookie,
    },
    success: function (result) {
      if (result.data.status === 1) {
        opts.success && opts.success(JSON.parse(JSON.stringify(result.data.data).replace(/:null/g, ':""')));
      } else {
        console.error(`接口(${opts.url})调用失败：${result.data.msg},错误代码：${result.statusCode}`, opts);
        wx.showToast({
          icon: 'none',
          title: result.data.msg || '系统错误',
        })
      }
    },
    complete: function complete(res) {
      if (res.header['Set-Cookie']) {
        if (app.globalData) {
          app.globalData.cookie = res.header['Set-Cookie'];
        } else {
          app.globalData = {
            cookie: res.header['Set-Cookie']
          };
        }
      }
    }
  })
}

module.exports = {
  ajax: ajax
}

```

### 使用

```
const {
  ajax
} = require('../../utils/ajax.js');


ajax({
      url: '/api/wechat/program/get/business/list',
      method: 'post',
      success: (result) => {
        
      }
    });
    
    ajax({
      url: '/api/wechat/get/business/home',
      data: {
        businessid: id || this.data.companyDetail.business_id
      },
      success: (companyDetail) => {
          
      }
      })
```

