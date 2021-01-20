### 小程序ajax

```
const {getGlobalBusinessId, setGlobalBusinessId} = require('./util')
let cookie = '';

function ajax(opts, appInstance) {
    const app = appInstance || getApp();
    let user_id;
    const cacheInfo = wx.getStorageSync(`share-info-${getGlobalBusinessId()}`);
    if (cacheInfo) {
        user_id = cacheInfo.split('-_-')[2];
    }

    const history = getCurrentPages();
    const visited = `${history[history.length - 1].route}-_-${opts.url}`;
    const lastVisited = wx.getStorageSync('lastVisited');
    const lastData = wx.getStorageSync('lastData');
    if (!opts.safty && visited === lastVisited && JSON.stringify(opts.data) === JSON.stringify(lastData)) {
        console.error('触发限流', lastVisited, visited);
        return;
    }
    wx.setStorageSync('lastVisited', visited);
    wx.setStorageSync('lastData', opts.data);

    wx.request({
        url: `${app.globalData.host}${opts.url}`,
        data: JSON.stringify({
            ...opts.data,
            from_wechat: 1,
            businessid: getGlobalBusinessId(),
            user_id: (opts.data && opts.data.user_id) ? opts.data.user_id : user_id,
            session_key: app.globalData.session_key,
            wechat_user_type: 4,
        }),
        method: (opts.method || 'post').toUpperCase(),
        header: {
            'Cookie': app.globalData && app.globalData.cookie,
            'Set-Cookie': app.globalData && app.globalData.cookie,
        },
        success: function (result) {
            if (result.data.status === 1) {

                let JSONString = JSON.stringify(result.data.data);
                JSONString = JSONString.replace(/:null/g, ':""').replace(/0000-00-00 00:00:00/g, '');
                JSONString = JSONString.replace(/"\d+\.\d\d00"/g, str => str.slice(0, str.length - 3) + '"');
                JSONString = JSONString.replace(/"\d+\.\d\d\d0"/g, str => str.slice(0, str.length - 2) + '"');

                opts.success && opts.success(JSON.parse(JSONString));
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

##### 页面引入使用

$$

$$

```
const app = getApp()
const {
  ajax
} = require('../../utils/ajax.js');


getInterestedCompany() {
    ajax({
      url: '/api/wechat/program/get/business/list',
      method: 'post',
      success: (result) => {
        this.setData({
          list:result
        });
      }
    })
  },
```

