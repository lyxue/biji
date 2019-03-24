main.js设置

##### 一、全局loading效果

```
// 引入axios以及mint ui中的Indicator和Toast组件
import axios from 'axios'
import { Indicator, Toast } from 'mint-ui';
// 超时时间
axios.defaults.timeout = 20000
// http请求拦截器
axios.interceptors.request.use(config => {
  Indicator.open({
    text: '加载中....',
    spinnerType: 'fading-circle'
  });
  return config
}, error => {
  Indicator.close();
  Toast({
    message: '加载超时',
    position: 'center',
    duration: 2000
  });
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
  Indicator.close();
  //===============================
  //若有token，则与后端确认token过期状态码
  if(data.data.code==206||data.data.code==207){
    Toast({
      message: '登录过期，请重新登录',
      position: 'center',
      duration: 2000
    });
    window.sessionStorage.setItem('token','');
    store.state.token='';// token过期
    return data
  }else{
    return data
  }
  //==========================
  //没有token直接return data
}, error => {
  Indicator.close();
  Toast({
    message: '加载失败',
    position: 'center',
    duration: 2000
  });
  return Promise.reject(error)
})
```

##### 二、路由守卫   判断该路由是否需要登录权限

###### 1、写拦截器之前需要的操作

router文件index.js路由配置文件

首先在定义路由的时候就需要多添加一个自定义字段requireAuth，用于判断该路由的访问是否需要登录。如果用户已经登录，则顺利进入路由，  否则就进入登录页面。 （to.meta、requireAuth为自定义字段 ）

```
const routes = [
    {
        path: '/',
        name: '/',
        component: Index
    },
    {
        path: '/repository',
        name: 'repository',
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Repository
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];
```

###### 2、main.js配置

```
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})
```

##### 三、统一处理请求，登录后存在token就在每一个请求头加上token       当后端接口返回401 Unauthorized（未授权），让用户重新登录。 

###### 1、vuex+sessionStrong保存token

登录成功后分别用vuex和sessionStrong保存token

```
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    token: window.sessionStorage.getItem('token') || '',
  },
  mutations: {
    token(state, val) {
      state.token = val;
    }
  }
})
```

###### 2、配置拦截器

```
axios.interceptors.request.use(
  config => {
    if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['Authorization'] = `Bearer ${store.state.token}`;//注意！！！Bearer这个字段一定要跟后端确认叫什么！！！
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT);
          router.replace({
            path: '/my/login',
            query: { redirect: router.currentRoute.fullPath }
          })
      }
    }
  return Promise.reject(error.response) // 返回接口返回的错误信息
});
```

