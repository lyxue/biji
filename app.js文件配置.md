### app.js文件配置

```
const {
  ajax
} = require('./utils/ajax.js');
let WebIM = require("./utils/WebIM")["default"];
const config = require('./config.js');

const monitor = require('./tingyun-mp-agent.js');
monitor.config({
  beacon: 'https://beacon-mp.tingyun.com',
  key: '7EIVYkKU4Bk',
  id: 'OD9bH7WPG4E',
  sampleRate: 1
});

App({
  onLaunch: function({
    query
  }) {

    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    // 下载新版本
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '为了您更好的体验，我们已经提供了新的版本，点击确定即可立即体验！',
        success(res) {
          if (res.confirm) {
            // 重启应用
            updateManager.applyUpdate()
          }
        }
      })
    })
    let user_id, businessid;
    if (query.share) {
      const statusArr = query.share.split('-_-');
      wx.setStorage({
        key: `share-info-${statusArr[1]}`,
        data: query.share,
      });
      user_id = statusArr[2];
      businessid = statusArr[1];
    } else if (query.q) {
      if (/share%3D/.test(query.q)) {
        const statusArr = query.q.replace(/.*share%3D/, '').split('-_-');
        wx.setStorage({
          key: `share-info-${statusArr['1']}`,
          data: query.q.replace(/.*share%3D/, ''),
        });
        user_id = statusArr[2];
        businessid = statusArr[1];

      } else {

        businessid = query.q.replace(/.*chat%2F/, '');
      }
    }

    this.globalData.currentBusinessId = businessid;
    wx.login({
      success: res => {
        wx.request({
          url: `${this.globalData.host}/api/wechat/website/login`,
          method: "POST",
          data: JSON.stringify({
            user_id,
            businessid,
            code: res.code
          }),
          success: (res) => {
            if (!this.globalData) {
              this.globalData = {};
            }
            const resultData = res.data ? res.data.data : {};
            this.globalData.unionid = resultData.wechat_user_id + '';
            if (res.header['Set-Cookie']) {
              this.globalData.cookie = res.header['Set-Cookie'];
            }
            this.globalData.logged = true;
            this.globalData.session_key = resultData.session_key + '';
            this.globalData.binded = resultData.is_bind;
            this.globalData.bindedEmployee = resultData.user_id;
            this.globalData.bindedBusiness = resultData.bind_bid;
            this.loginSuccess && this.loginSuccess();
          }
        })
      },fail(a){
        console.log(a)
      }
    })
  },
  onShow({
    query
  }) {
    let user_id, businessid;
    if (query.share) {
      const statusArr = query.share.split('-_-');
      wx.setStorage({
        key: `share-info-${statusArr[1]}`,
        data: query.share,
      });
      businessid = statusArr[1];
    } else if (query.q) {
      if (/share%3D/.test(query.q)) {
        const statusArr = query.q.replace(/.*share%3D/, '').split('-_-');
        wx.setStorage({
          key: `share-info-${statusArr['1']}`,
          data: query.q.replace(/.*share%3D/, ''),
        });
        user_id = statusArr[2];
        businessid = statusArr[1];

      } else {
        businessid = query.q.replace(/.*chat%2F/, '');
      }
    } else if (query.businessid) {
      businessid = query.businessid;
    }
    this.globalData.currentBusinessId = businessid;
  },
  registerCallback(callback) {
    console.log(callback);
    this.hxLoginSuccess = () => {
      callback && callback();
      this.hxLoginSuccess = null;
    };
  },
  hxLogin(callback) {
    if (this.globalData.hxUser) {
      if (!this.globalData.online) {
        this.registerCallback(callback);
        this.login();
      } else {
        callback && callback();
      }
      return;
    }

    this.registerCallback(callback);
    this.identifyUser(callback);

    WebIM.conn.listen({
      onOpened: (message) => {
        this.globalData.online = true;
        this.globalData.hxUser.accessToken = message.accessToken;

        console.log(this.hxLoginSuccess)
        this.hxLoginSuccess && this.hxLoginSuccess();
      },
      onPresence: (message) => {
        switch (message.type) {
          case "unsubscribe":
            pages[0].moveFriend(message);
            break;
          case "subscribe":
            if (message.status === "[resp:true]") {

            } else {
              pages[0].handleFriendMsg(message);
            }
            break;
          case "joinChatRoomSuccess":
            console.log("Message: ", message);
            wx.showToast({
              title: "JoinChatRoomSuccess",
            });
            break;
          case "memberJoinChatRoomSuccess":
            console.log("memberMessage: ", message);
            wx.showToast({
              title: "memberJoinChatRoomSuccess",
            });
            break;
          case "memberLeaveChatRoomSuccess":
            console.log("LeaveChatRoom");
            wx.showToast({
              title: "leaveChatRoomSuccess",
            });
            break;
          default:
            break;
        }
      },
      onInviteMessage: (message) => {
        console.log('aaaaaaaaaaaaaaaaa', message)
      },
      onRoster: (message) => {
        console.log('aaaaaaaaaaaaaaaaa', message)
      },
      onReceivedMessage: (message) => {
        console.log('aaaaaaaaaaaaaaaaa', message)
      },
      onVideoMessage: (message) => {
        console.log("onVideoMessage: ", message);
        this.onReceiveMessage('video', message);
      },
      onAudioMessage: (message) => {
        console.log("onAudioMessage", message);
        this.onReceiveMessage('audio', message);

      },
      onLocationMessage: (message) => {
        console.log("Location message: ", message);
        this.onReceiveMessage('location', message);
      },
      onTextMessage: (message) => {
        console.log('text message ....', message);
        this.onReceiveMessage('txt', message);

      },

      onCmdMessage(message) {
        console.log("onCmdMessage", message);
      },
      onEmojiMessage: (message) => {
        console.log('onEmojiMessage', message)
        this.onReceiveMessage('emoji', message);

      },
      onPictureMessage: (message) => {
        this.onReceiveMessage('img', message);
      },
      // 各种异常
      onError: (error) => {
        console.log('error.......', error);
        this.globalData.online = false;
      },
      onClosed: (error) => {
        console.log('closed.......', error);
        this.globalData.online = false;
      },
      onReconnect: (error) => {
        console.log('onReconnect.......', error);
        this.globalData.online = false;
      },
      onSocketConnected: (error) => {
        console.log('onSocketConnected.......', error);
        // this.globalData.online = false;
      },
      onOffline: (error) => {
        console.log('onOffline.......', error);
        this.globalData.online = false;
      },
      onOnline: (error) => {
        console.log('onOnline.......', error);
        this.globalData.online = false;
      },
    });
  },

  identifyUser(callback) {
    ajax({
      url: '/api/wechat/service/creat/hx',
      success: (hxUser) => {
        this.globalData.hxUser = hxUser;
        this.login(callback);
      }
    }, this);
  },

  login() {
    const hxUser = this.globalData.hxUser;
    if (this.connectOptions) {
      WebIM.conn.open(this.connectOptions);
    } else {
      this.connectOptions = {
        apiUrl: WebIM.config.apiURL,
        user: hxUser.sns_user_id,
        pwd: hxUser.pwd,
        accessToken: hxUser.accessToken,
        grant_type: "password",
        appKey: WebIM.config.appkey,
        autoReconnectInterval: 1000 * 20
      }
      WebIM.conn.open(this.connectOptions);
    }
  },
  onReceiveMessage(type, message) {
    this.onReceiveMessageCallback && this.onReceiveMessageCallback(type, message);
  },
  globalData: {
    host: config.host,
    userInfo: null,
    hxUser: null,
    logged: false,
    online: false,
    unionid: '',
    session_key: '',
    currentBusinessId: 1,
    binded: false,
    bindedEmployee: 0,
    bindedBusiness: 0,
    lastVisitTime:0,
    lastQueryData:'',
    lastQueryData:''
  }
})

```

