# vue的开发流程

### 一、搭建vue脚手架，并安装相应的环境

1、脚手架命令。

```
vue init webpack 项目名称 
```

2、除了安装路由选择 “Y”，其他地方（一般）都选择 “N”。

3、安装完成 在输入命令 

```
cd 项目名称
```

4、启动项目(在没有更改过端口号的情况下，端口号都是8080)

```
npm run dev
```

5、安装脚手架会遇到的问题

​	【1】、npm版本太低，需要更新它

```
npm install npm -g
```

​	【2】、使用淘宝镜像会比较快

```
淘宝镜像命令：cnpm install npm -g 
```



### 二、文件的解释

1、目录结构

![](C:\Users\吕运学\Desktop\git笔记\vue脚手架\图片目录\vue脚手架目录.png)



2、build：  编译 配置文件

3、config：  配置文件  可以修改端口号  可配置服务器代理  ......

（1）、index.js  (可以在此文件里边配置服务器代理)

```
 proxyTable: {
        '/api' :{                             //服务器代理的api接口
            target : 'http://127.0.0.1:3000', //代理的路径（也就是需要访问的路径，不带参数）
            changeOrigin:true,				  //是否允许代理
            pathRewrite:{'^/api':''}		  //匹配api接口，找到以api开头的需要先去除掉
        },
        //这里是对象，所以可以配置多个代理服务器
		'/app':{           
				target:'http://m.lizi.com/', 
				changeOrigin:true, 
				pathRewrite:{'^/app':''}
		}
    },
    host: 'localhost', 		
    port: 8080, 			//端口号
    autoOpenBrowser: true,  //默认为flase，如果改为true的时候，启动项目就会自动在浏览器打开
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, 

  
```

4、dist：打包上线的文件，一开始是没有的，当执行打包的命令，就会自动生成，集合了所有的css文件和js文件

```
编译打包：npm run build
```

5、node_modules：文件执行的依赖包

6、src：源码文件，在里边编写组件等代码

7、static：放文件资源   图片   js文件   css 文件等   放在这里的文件引入要用根路径/static.....

（1）、例如存放字体图标的css文件

​	1>、百度搜索http://www.fontawesome.com.cn/（Awesome字体图标库）

​	2>、点击下载，解压后将css、fonts文件复制到vue脚手架的static文件夹下

​	3>、在index.html入口文件里边引入

```
<link rel="stylesheet" type="text/css" href="static/css/font-awesome.css"/>
```

8、index.html：项目入口文件

​	（1）、不用多说，直接复制这段代码到目录下替换掉原有的文件，或者将添加不同的部分

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    //以下也有补充（initial-scale=1.0）
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>yunnanunicom</title>
	<link rel="stylesheet" type="text/css" href="static/css/font-awesome.css"/>
	<script>
	//设置适配不同的机型
    //根元素字体大小=不同适配机屏幕宽度/10在加上单位（这样就能适配所有的机型）
   document.documentElement.style.fontSize=document.documentElement.clientWidth/10+"px"
		</script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>

```

​	（2）、然后就可以在需要的地方引入字体图标标签了

```
如：<i class="fa fa-user" aria-hidden="true"></i>直接引入使用
```

9、src下的文件

（1）、assets  存放图片 这里图片会被变成base64 这里一般放图标等小图
（2）、xxx.vue 组件文件    模板 js   css
（3）、app.vue  也叫作根组件

### 三、配置less文件（函数式的样式文件）

1、配置less文件

（1）、安装less文件的命令【--save-dev（表示不上线）】

```
npm install less  less-loader --save-dev
```

（2）、直接执行命令即可

（3）、在 组件的style标签里添加解析less文件的东西

```
不用考虑直接替换即可：<style type="text/css" lang="less" scoped>
```

2、添加less文件的相关文件+解释

（1）、在src文件下新建一个文件夹styles

![](C:\Users\吕运学\Desktop\git笔记\vue脚手架\图片目录\less相关文件.png)



（2）、main.less:在此引入mixin.less和variable.less方便后续使用一次性引入

```
@import url('./mixin.less');
@import url('./variable.less');
```

（3）、mixin.less:存放相关的混合操作(函数式的样式文件)

```
例如：
.w(@px){
	width: unit(@px/37.5,rem);  //unit自动给数值添加rem单位
}
.h(@px){
	height: unit(@px/37.5,rem);
}
.fs(@px){
	font-size: unit(@px/37.5,rem);
}
.lh(@px){
	line-height: unit(@px/37.5,rem);
}
```

（4）、reset.less:这是全局配置样式的存放文件

```
例如：
*{
	padding: 0px;
	margin: 0px;
}
```

（5）、variable.less：存放变量信息（为了相同的色调等可以一次性替换）

```
例如：
@headbb:#58bc58;
```

3、以上文件的使用

（1）、reset.less全局文件在main.js文件里边引入、之后就会被全部文件使用了

```
//引入全局的配置样式 
import "./styles/reset.less"
```

（2）、其它less文件的使用，在需要使用的css文件里边引入使用即可，只要引入一个即可main.less，就能使用其它两个了。

```
例如：
<style type="text/css" lang="less" scoped>
@import url("../../styles/main.less");
	#header{
		width: 100%;
		background: @headbb;//引入变量直接使用即可
	}
</style>
```

### 四、swiper（轮播图的使用）

1、下载安装

```
npm install swiper --save
```

2、在主要使用的组件里引用

（1）、在js里引入

```
import Swiper from "swiper";
```

（2）、在css里边引入

```
@import url("../../../../node_modules/swiper/dist/css/swiper.min.css");
```

3、直接上官网（搜索swiper）进入官网后复制html代码和js代码,放在组件的相应位置即可

4、实例代码

```
<template>
	<div id="banner">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item,index) in img" :key="index">
					<img src="{{item}}" alt="">
				</div>

			</div>
			<div class="swiper-pagination"></div>
		</div>
	</div>
</template>

<script>
import Swiper from "swiper";
export default {
	name: 'Banner',
	data() {
		return {
			name:"这是Banner组件"
			img:[]
		}
	},
	mounted(){
		var mySwiper = new Swiper ('.swiper-container', {
		loop: true, // 循环模式选项
		pagination: {
		  el: '.swiper-pagination',
		}
	  })        
	}
}
</script>
<style type="text/css" lang="less" scoped>
@import url("../../../../node_modules/swiper/dist/css/swiper.min.css");
.swiper-slide img {
    width: 100%;
    height: 4.53rem;
} 
</style>

```

### 五、经典轮播图使用（layui）

1、直接进入官网下载，解压将layui这个文件夹复制到静态资源（static）目录下

2、在入口文件index.html下引入css文件跟js文件

```
<link rel="stylesheet" type="text/css" href="./static/layui/css/layui.css">
<script type="text/javascript" src="./static/layui/layui.js"></script>
```

3、打开文档找到【轮播图】，查看代码

4、不要管代码的结构，直接把相关的代码复制到vue组件的相应的地方【html、js】。

5、通过在js代码里边输入相关的参数，改变视图的结构，以达到自己想要的目的。

6、例如改变此轮播图的视图高度，只需要查看文档参数，修改参数值，即可改变视图容器的大小

【height:"170px",】这是使用时添加在参数

```
mounted(){
		layui.use('carousel', function(){
		  var carousel = layui.carousel;
		  //建造实例
		  carousel.render({
			elem: '#test1',
			width: '100%', //设置容器宽度
			arrow: 'always',//始终显示箭头
			height:"170px",
			//,anim: 'updown' //切换动画方式
		  });
		});
		}
	}
```



### 六、补充一个监听滚动条触发的知识

1、监听滚动条，处理相关的问题

```
实例：
created(){
	      window.addEventListener('scroll',()=>{
	        let y=window.scrollY
	        if (y>=this.distance) {
	          if (this.show==false) {
	            this.show=true
	          }
	          
	        }else{
	          if (this.show==true) {
	              this.show=false
	          }
	          
	        }
	      })
		}
```

### 七、安装动画

1、npm安装动画（安装的动画存放在node_modules中）

```
npm install animate.css --save
```

2、使用：【在哪使用就在哪引用(也可以在全局中引用)，只要文件存在node_modules中的，那么都可以使用import引用】

```
例如：
import "../node_modules/animate.css/animate.css";
```

3、在使用的地方使用标签引起来【<transition></transition>】然后在标签中使用相应的类名，改变动画效果

```
例如：
<transition
	enter-active-class="animated slideInLeft"
	leave-active-class="animated slideOutLeft"
>
	<div class="nlz" @click="nlzhi" v-show="nlzhi1">{{nun}}</div>
</transition>
```

4、用事件来改变显示隐藏的值，从而控制动画的出现

5、做了这几步，你的动画就应该会跑了

### 八、计算属性【仅仅对单元素属性使用】

1、实例

```
<template>
	<div id="my">
		<Header></Header>
		{{test}}{{com}}
	</div>
</template>
<script>
export default {
	name:"My",
	components:{
	},
	data(){
		return {
			test:"后边会拼接字符："
		}
	},
	computed: {
	//可以在此进行数据处理
		com() {
			let name=this.test;
			name+="我是后边拼接的数据";
			return name;
		}
	},
}
</script>
```

2、结果：

![](C:\Users\吕运学\Desktop\git笔记\vue脚手架\图片目录\计算属性 .PNG)

### 九、过滤器

（一）、基本结构

1、结构

```
vue实例.filter("过滤器的名字",function(要过滤的数据){
    return 过滤完的数据
})
```

2、使用

```
{{test|过滤器的名字}}
```

（二）、基本使用【在全局里边引用】

1、将一个时间戳变成一个时间日期格式

```
vue.filter('getDate',function(value){
    return new Date(value).getDay()
})
```

2、在显示时间戳的地方使用过滤器

```
{{item.time|getDate}}
```

3、以上就会将时间戳变成时间日期格式了，item.time相当于过滤器回调函数里边的参数值value

### 十、axios

（一）、在哪使用在哪引入操作

1、axios属于第三方插件，需要下载

```
npm install axios --save
```

2、在哪使用在哪引用

```
import Axios from "axios"
```

3、结构

```
Axios.get(url,data)
.then((res)=>{
    console.log(res)
})
.catch((err)=>{
    console.log(err)
})			
```

4、在vue的created(){}生命周期里边发起ajax请求

```
created(){
//首先得要引入import Axios from "axios"
	Axios.get(url,data)
	//data里边可以不需要有数据，可以加个"{里边是放参数的地方}"
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })	
}
```

5、在使用vue的时候，有时候需要使用到vue的实例，所以在使用的时候，得先引入vue的实例

```
import Vue from "vue"
```

6、直接使用网络请求图片不显示的处理方式

```
实例：
<img :src="'https://images.weserv.nl/?url='+item.pic">
```

(二）、在全局里边引入，然后在组件里边使用 

1、全局引入

```
import Axios from "axios"
```

2、vue实例之前如果没有，那么就需要引入，如果需要引入【import Vue from "vue"】

3、挂载在原型链上【组件是vue实例的一个子类，所以vue原型链原型链上的属性，子类也会继承】

```
import Axios from "axios"
Vue.prototype.$axios=Axios
```

（三）、接下来的组件ajax请求就会这样写

1、ajax请求模板【get】

```
created(){
	this.$axios.get("求情数据的路径","请求数据的参数")
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })	
}
```

2、

```
var params = new URLSearchParams();
params.append('us',this.val);
params.append('ps',this.pas);
this.$axios.post("my/Users/reg",params)
.then((res)=>{
	console.log(res);
})
```

### 补充：路由拦截

#### 一、代码模块

###### 1、axios发起请求都会经过这里【请求拦截器】

```
axios.interceptors.request.use(function (config) {
	console.log("config");
	//此时你会看到，请求发送的数据都打印出来了，可以做一下请求前的处理
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
```

###### 2、axios请求回来的数都会经过这里【响应拦截器】

```
axios.interceptors.response.use(function (response) {
	console.log(response);
	//此时打印response，和axios请求时，打印的res一样，所以，可以说response=res，是请求回来的数据信息，可以再此做一些简单的处理，以减少请求后对数据的处理
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
```

#### 二、引用

1、在main.js中直接插入代码

```
例如：
import Vue from 'vue'
import App from './App'
import router from './router'

//全局引入axios
import Axios from 'axios';
Vue.prototype.$axios=Axios;

// ======== 路由拦截==========================
// 1、发起axios的时候都会经过下面这个函数				【请求拦截】
axios.interceptors.request.use(function (config) {
	return config;
  }, function (error) {
    return Promise.reject(error);
  });

//2、请求回来的参数都会经过下面这个函数				   【响应拦截】
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

// ===================================================
Vue.config.productionTip = false
import  store from './store'

new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>'
})

```



### 十一、vue的基本使用相关连接http://www.cnblogs.com/amunamuna/p/8709491.html

### 十二、组件之间参数的传递

##### 一、利用props传递参数

###### （一）：实例1

1、父子组件

```
父组件：
<div>
    <ul>
    	<li v-for="(item,index) in navlist" :key="index" :list="item.path"></li>
    </ul>
</div>
```

2、子组件

```
props:['list'],
```

###### （二）：实例2

###### 第一种：父传子

1、父子组件

```
<template>
  <div>
    <input v-model="message">
    <!--将childmessage与message通过v-bind指令绑定!-->
    <child :childmessage="message"></child>
  </div>
</template>
<script>
  import child from "./components/child.vue"
  export default{
    //构建child组件
    components:{
      child
    },
    data(){
      return {
        //初始化message
        message:''
      }
    }
  }
</script>
```

2、子组件

```
<template>
  <div>
    <p>childmessage is:{{childmessage}}</p>
  </div>
</template>
<script>
  export default{
    //将childmessage传递给child
    props:['childmessage']
  }
</script>
```

##### 注意：

【prop是单向绑定的，不应该在子组件内部改变prop。不过这里的props传过来的值会随之父组件的值的改变而改变，是动态改变的。】

###### 第二个：子传父

1、![](C:\Users\吕运学\Desktop\git笔记\vue脚手架\图片目录\子传父（1）.png)

2、![](C:\Users\吕运学\Desktop\git笔记\vue脚手架\图片目录\子传父（2）.png)

##### 二、路由传参

###### （一）、在路由的path路径下传参

1、路由配置

```
   {path: '/describe/:id',name: 'describe',component: Describe}
```

2、使用方式

```
//直接调用$router.push 实现携带参数的跳转
 this.$router.push({
    path: /describe/${id}`,//这个id是一个变量,随便是什么值都可以
 })

补充： 
goDetails(id,imgUrl,price,salesCount,title){
     this.$router.push({name:'detailCont',params:{
         img:`${imgUrl}`,
         title:`${title}`,
         id:`${id}`,
         price:`${price}`,
         renshu:`${salesCount}`,
         title:`${title}`,
     }})
}
```

3、参数获取

```
this.$route.params.id
```

###### （二）、通过路由属性中的name来确定匹配的路由，通过params来传递参数。

1、路由配置

```
{path: '/describe',name: 'describe',component: Describe}
```

2、使用方式

```
this.$router.push({name: 'describe',params: {id: id}})
```

3、参数获取

```
this.$route.params.id
```

###### （三）、把params换成了query

1、路由配置

```
{path: '/describe',name: 'describe',component: Describe}
```

2、使用方法

```
this.$router.push({
    path: '/describe',
    query: {
         id: id
    }
})
```

3、获取参数

```
this.$route.query.id
```

### （三）、vuex的基本使用

1、vuex属于第三方插件，需要下载

```
npm install  vuex --save
```

2、在src下建立新的文件夹，一般取名store，再建立js文件index.js。

```
import Vue from 'vue';
import Vuex from 'vuex';  //vuex属于第三方插件，需要下载
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    name:'vuex的基本使用'
  },
  mutations: {
    setName(state,name){
    	state.name=name
    }
  } 
})
//state 存放所有全局状态值（全局变量） 这里的数据只能通过mutation里的方法修改
//mutations 里面有一堆方法  方法的作用是修改  state 里的值
export default store
```

3、在需要使用的组件里直接使用

```
例子：
<template>
    <div>{{this.$store.state.name}}</div>
</template>
```

4、如果要更改数据，可以借助点击事件，点击后触发相应的数据改变，

```
<template>
    <div @click="navShow">{{this.$store.state.name}}</div>
</template>
<script>
	export default{
			data() {
				return {
					vall:"这是什么鬼"
				}
			},
			methods:{
				navShow(){
					let val=this.vall
					this.$store.commit('setName',val)
				}
			}
			}
	}
</script>

========================================使用=========================================
    this.$store.state.name(变量名使用) 推荐用计算属性
    修改
    this.$store.commit("mutation里的方法",'点击后传递的参数')
```

#### （四）、[keep-alive](https://cn.vuejs.org/v2/api/#keep-alive)

1、作用：【主要用于保留组件状态或避免重新渲染】

2、基本使用

```
//一般将组件App.vue的<router-view/>包起来
<template>
  	<div id="app">
        <keep-alive exclude="home">
          <router-view/>
        </keep-alive>
  	</div>
</template>
```

3、<keep-alive exclude="home">此处的exclude="home"代表除路由名字为home的组件都会被缓存

4、<keep-alive>里边的参数有：

- `include` - 字符串或正则表达式。只有名称匹配的组件会被缓存。
- `exclude` - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
- `max` - 数字。最多可以缓存多少组件实例。

5、当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行。 

### 十三、路由

（一）、在安装脚手架的时候顺带下载

1、可以在安装脚手架的时候顺带安装，在 选择是否安装路由那点选择“Y”，即可顺带下载

（二）、在没有安装脚手架下顺带下载

1、下载安装

```
npm install vue-router --save
```

2、在src文件下新建router文件夹，在新建index.js文件【可以直接复制这段代码】

```
import Vue from 'vue'
//引入vue
import Router from 'vue-router'
//引入路由
Vue.use(Router)
export default new Router({
  routes: [
    {path: '',name: '',component: }
  ]
})

```

3、在main.js里边引入路由【进行路由全局配置】【有备注的地方就是需要添加的路由配置 】

```
import Vue from 'vue'
import App from './App'
import router from './router'//引入路由
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,  //目的是为了能够在实例的子类中可以使用this.$router能够获取到路由的实例
  components: { App },
  template: '<App/>'
})

```

4、在根组件下使用 <router-view/>，  相当于开辟一片空间 ， 当页面监听到hash 变化 匹配路由配置里的组件信息进行加载

```
<template>
  <div id="app">
    <router-view/>//此处是路由需要添加的内容
  </div>
</template>

```

5、使用

```
看实例：
import Vue from 'vue'
//引入vue
import Router from 'vue-router'
//引入路由
import Home from '../components/pages/Home/Home.vue'
import Activity from '../components/pages/Activity/Activity.vue'
import My from '../components/pages/My/My.vue'
//引入home组件
Vue.use(Router)
export default new Router({
  routes: [
    {path: '/',name: 'Home',component: Home},
    {path: '/activity',name: 'Activity',component: Activity},
    {path: '/my',name: 'My',component: My}
  ]
})

```

6、一个完整的路由已经搭建完毕

（三）、页面件组件的切换方式

1、<router-link to="变化的hash" tag  active-class>
   （1）、 to: 路由的变化
   （2）、tag  将该标签解析为其他元素 默认是a
   （3）、active-class  页面激活是的使用类名
   （4）、 没有点击事件

```
实例：
<template>
	<div id="home">
		<ul class="nav">
			<RouterLink v-for="(item,index) in navlist" 
			  :key="index"
			  @click="goPage(item.path)"
			  tag='li'
			  :to='item.path'
			  active-class='red' 
			  >
			  {{item.name}}
			</RouterLink>
		</ul>
	</div>
</template>
```

2、编程式导航

```
html部分：
<template>
	<div id="activity">
		<ul class="nav">
			<li @click="goBack">
				<i class="fa fa-chevron-left" aria-hidden="true"></i>
			</li>
		</ul>
	</div>
</template>
js部分：
methods:{
    goBack(){
    	this.$router.push({path:"/"})//点击后会寻找"/"所在的hash值，然后进行页面之间的切换
    }
}
```

### 十四、自定义事件【不能在<RouterLink > </RouterLink>里边使用】

1、一个组件

```
<template>
	<div id="home">
		<div @slideHide="hide"></div>
	</div>
</template>
js部分:
<script>
export default {
	name:"My",
	components:{
		Header,Footer
	},
	data(){
		return {
			test:"",
			show:false
		}
	},
	methods:{
    hide(){
    	this.show=!this.show
    }
}
}
</script>
```

2、另一个页面【可以理解为在另一个页面触发另一个页面事件，达到改变某些值的作用】

```
<script>
export default {
	name:"My",
	components:{
		Header,Footer
	},
	data(){
		return {
			test:"",
			show:false
		}
	},
	methods:{
    hide(){
    	this.$emit("slideHide")
    }
}
}
</script>
```

### 十五、简单的tab选项卡

```
<template>
	<div id="my">
		<div>
			<ul>
				<li 
                    class="li1" 
                    v-for="(item,index) in nav" 
                    :key="index" 
                    @click="chang(index)">{{item}}
				</li>
			</ul>
		</div>
		<div>
			<ul>											
				<li 
                    v-for="(item,index) in commonts" 
                    :key="index" 
                    v-show="index == num">{{item}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name:"My",
	components:{
		
	},
	data(){
		return {
			nav:["标题一","标题二","标题三"],
			commonts:["标题一的内容","标题二的内容","标题三的内容"],
			num:0
		}
	},
	 methods: {
        chang(index) {
          this.num = index;
        }
      }
}
</script>

<style type="text/css" lang="less" scoped>
#my{
	.li1{
		display: inline-block;
		justify-content: space-between;
		border: 1px solid red;
		width: 123px;
		height: 60px;
		background: green;
		line-height: 60px;
		text-align: center;
	}
}
</style>
```

### 十六、懒加载（使用的是mint-ui）

1、下载

```
npm install mint-ui --save
```

2、引入【看情况，如果使用的地方很多，那么建议采用全局引入】

```
//全局引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

```

3、使用

```
以全局引入为例：
<template>
	<div id="activity">
		<div class="jiazai"></div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';  //用哪个就先引入哪个，这里要使用Toast，所以先引入
export default {
	name:"Activity",
	components:{
		
	},
	data(){
		return {
			name:"活动"
		}
	},
	created(){  //一进入页面就会加载数据，以下就是懒加载的内容
		Toast({
		  message: '数据正在加载',
		  iconClass: 'fa fa-spinner fa-spin',  //字体图标的类名
		  position:'middle',   //加载图标的位置【居中】
		  duration: 500   //持续时间
		});
	},
	methods:{

	}
	
}
</script>

<style type="text/css" lang="less" scoped>
.jiazai{
	width: 100%;
	height: 8rem;
	background: yellow;
}
</style>
```

4、执行效果

![](C:\Users\吕运学\Desktop\git笔记\vue脚手架\图片目录\懒加载.png)

5、字体图标来源

```
Toast({
    message: '数据正在加载',
    iconClass: 'fa fa-spinner fa-spin',  //字体图标的类名
    position:'middle',   //加载图标的位置【居中】
    duration: 500   //持续时间
});
```

（1）、百度搜索http://www.fontawesome.com.cn/faicons/，直接【ctrl+f】查询spin

![](C:\Users\吕运学\Desktop\git笔记\vue脚手架\图片目录\字体图标.png)

（2）、随便选择喜欢的，点击进去后复制字体图标的类名，粘贴到iconClass: "  "引号里边即可，让图标动起来还需要添加 fa-spin类名。

### 十七、关于一个文本框的值的处理连接，【用户登录】

1、https://www.jb51.net/article/146656.htm

2、关于app点击输入框时，输入框视野拉近【输入框放大】的问题

```
直接在头文件下把原来的文件替换了：
 <meta content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=2.0, user-scalable=no, width=device-width" name="viewport">
```

### 十八、图片上传【实例】

1、图片上传（先在本地预览，点击提交按钮时再上传到服务器）

```
<template>
  <div>
    <div id="ddd">
      <div class="add-pic" @click="addPic()">
        <img src="../../image/u286_r2_c2.jpg" class="add-img"><!-- 一开始显示的图片，点击选择照片后隐藏 -->
        <input name="files" id="uploaderInput" type="file" accept="image/*" multiple />
      </div>
      <div id="img-group">
        <div class="img-item">
          <img :src="img" alt="">
          </div>
        </div>
      </div>
      <span>{{span}}</span>
      <br>
      <span @click="tijiao">提交</span>
    </div>
</template>
<script>
  import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      img:'',
      picFlag: true,
      span:'文字',
      file:{}
    }
  },
  created: function() {

  },
  methods: {
     addPic(){
        var vm = this;
        var input = document.getElementById('uploaderInput');
        input.addEventListener('change', function(e){
          var addImg = document.getElementsByClassName('add-img')[0];
          addImg.style.display='none';//隐藏
            var files = input.files;
            vm.file=files[0];//将file保存，用于上传服务器
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function () {
              vm.img=this.result;
            };
        });
    },
    tijiao(){
      let params = new FormData();
      params.append('file',this.file);
      params.append('street',this.span);
      this.$axios.post(this.API().addDistributionApplyUser,params,{headers: {'Content-Type': 'multipart/form-data'}})
      //提交给后端的接口this.API().addDistributionApplyUser
          .then((res) => {
            console.log(res.data);
            if (res.data.code == 0) {
              Toast({
                message: '已提交申请',
                iconClass: "fa fa-check-circle",
                position: 'center',
                duration: 1000
              });
              this.$router.push('/homecen/home');
            }else{
              Toast({
                message: res.data.message,
                iconClass: "fa fa-times-circle",
                position: 'center',
                duration: 1000
              });
            }
          })
          .catch((res) => {
            console.log(res.data.message)
          })
    }
  },

}

</script>
<style lang="less" scoped type="text/css">
@import url('../../styls/main.less');
/* less预处理语言 
.w(@px){
    width: unit(@px/37.5,rem);
}
*/
.hide {
  display: none;
}

#ddd {
  position: relative;
  .w(375);
  .h(165);
  display: flex;
  justify-content: center;

  .img-item {
    z-index: 100;
    .w(285);
    .h(165);
    .border-radius(10, 10, 10, 10);
  }

  .img-item img {
    width: 100%;
    height: 100%;
    .border-radius(10, 10, 10, 10);
  }

  .add-pic {
    .w(285);
    .h(165);
    .border-radius(10, 10, 10, 10);
    position: absolute;
    .top(0);
    .left(45);
    .lh(165);
    text-align: center;

    img {
      .w(285);
      .h(165);
    }

    .you {
      display: none;
    }
  }

  .add-pic input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}

</style>

```

### 十九、项目打包

（一）、打包

1、通过npm run build 打包生成dist文件夹，里面包含css、js；其中在css、js文件夹的map文件在部署时都要将其删除。

（二）、关于打包问题

1、页面出不来

（1）、找到项目的config文件夹里面的index.js，将

```
代码assetsPublicPath: '/',
改为assetsPublicPath: './',
```

2、背景图片出不来

（1）、找到build文件夹下面的utils.js

```
if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
}
改为：=======》 
if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath:"../../"     //增加的代码
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
}
```

3、打包上线后部分css不出来

（1）、首先注释掉webpack.prod.conf.js中下面的代码

```
new OptimizeCSSPlugin({
  cssProcessorOptions: config.build.productionSourceMap
    ? { safe: true, map: { inline: false } }
    : { safe: true }
}),

```

（2）、然后在utils.js中添加， minimize:true 

```
const cssLoader = {
   loader: 'css-loader',
   options: {
     sourceMap: options.sourceMap,
     minimize:true
   }
 }

```

（3）、然后重新打包传到线上  

###### （三）、打包  （开发、生产环境） api统一管理

1、在src文件夹里新建api文件夹 里面新建api.js；将以下代码倒进去

```
let baseURL = "/api";//直接npm run dev 运行项目用这个
//let baseURL = "http://192.168.0.43:8080";//打包时用这个	http://192.168.0.43:8080为开启后端服务我网址

export default function DISTRIBUTE(){
    return{
        "login":`${baseURL}/sys/auth/login`,  //登录
        "register":`${baseURL}/sys/auth/register` //注册
    }
}


//后端接口为http://192.168.0.43:8080/sys/auth/register
//这样写的好处   当IP发生变化时，只需改变一个  后端接口改变时，不要翻看代码
```

2、使用======》main.js引入

```
import API from './api/api.js'
Vue.prototype.API=API
```

3、要与后端交互发起请求

```
var params = new URLSearchParams();
params.append('us',this.val);
params.append('ps',this.pas);
this.$axios.post(this.API().login,params)
.then((res)=>{
	console.log(res);
})
//this.API().login相当于http://192.168.0.43:8080/sys/auth/login
```

### 二十、最后node.js短信验证相关参考连接

1、https://www.jb51.net/article/116579.htm

### 二十一、微信各种分享

1、https://blog.csdn.net/qq_29755359/article/details/79667577

### 二十二、微信分享

1、	https://blog.csdn.net/qq_22753743/article/details/78850815

​	https://blog.csdn.net/shooke/article/details/79069614

​	https://blog.csdn.net/weixin_39939012/article/details/83574090

```
<template>
  <div class="details">
    <player :videoUrl="details.videoUrl" :coverUrl="details.coverUrl" :videoId="details.videoId"/>
    <div class="description">
      <span class="label" :style="{backgroundColor: details.videoLabelColor}">{{details.videoLabel}}</span>
      <p class="title">{{details.videoTitle}}</p>
      <p class="info">
        <span>{{details.mtime}}</span>
        <i class="iconfont icon--"></i>
        {{details.videoPlayTimes}}
      </p>
      <p class="summary">简介</p>
      <p class="article ql-editor" v-html="details.videoDescription"></p>
    </div>
  </div>
</template>
<script>
import player from '@/components/player'
import { videoDtails, getApp } from '@/config/api'
 
/* eslint-disable no-undef */
export default {
  components: {
    player
  },
  data () {
    return {
      details: {},
      appId: '',
      signature: '',
      timestamp: '',
      nonceStr: ''
    }
  },
  beforeDestroy () {
    document.querySelector('.htmlTitle').text = 'title'
  },
  mounted () {
    // 获取详情数据
    let url = window.location.href.split("#")[0]
    this.$http.get(this, videoDtails, {videoId: this.$route.query.id}, res => {
      this.details = res
      document.querySelector('.htmlTitle').text = this.details.videoTitle
      this.$http.get(this, getApp, {url: url, refresh: true}, res => {
        this.appId = res.appId
        this.signature = res.signature
        this.timestamp = res.timestamp
        this.nonceStr = res.nonceStr
        this.shard(url)
      })
    })
  },
  methods: {
    shard (url) {
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.appId, // 必填，公众号的唯一标识
        timestamp: this.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.nonceStr, // 必填，生成签名的随机串
        signature: this.signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      wx.onMenuShareTimeline({
        title: this.details.videoTitle, // 分享标题
        link: url+'#/...', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: this.details.coverUrl, // 分享图标
        success () {
          alert('分享朋友圈成功')
          // 用户确认分享后执行的回调函数
        },
        cancel () {
          // 用户取消分享后执行的回调函数
        }
      })
 
      wx.onMenuShareAppMessage({
        title: this.details.videoTitle, // 分享标题
        desc: this.details.videoTitle, // 分享描述
        link: url+'#/...', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: this.details.coverUrl, // 分享图标
        type: 'video', // 分享类型,music、video或link，不填默认为link
        dataUrl: this.details.videoUrl, // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          alert('分享给朋友成功')
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.details {
  overflow: hidden;
  .description {
    padding: 10px;
    .label {
      display: inline-block;
      padding:0 10px;
      height: 22px;
      line-height: 22px;
      color: #fff;
      font-size: 12px;
      text-align: center;
    }
    .title {
      line-height: 30px;
      font-size: 18px;
    }
    .info {
      line-height: 26px;
      color: #949494;
      span {
        margin-right: 15px;
      }
      .iconfont {
        font-size: 12px;
      }
    }
    .summary {
      margin-top: 20px;
      color: #4b4b4b;
      font-size: 16px;
    }
    .article {
      margin-top: 10px;
    }
  }
}
</style>
```

2、https://cn.vuejs.org/v2/guide/transitions.html

3、http://www.jzdlink.com/studynotes/201711021406.html

4、http://www.hehaibao.com/vue-wechat-share/【微信分享实例】

5、https://www.jianshu.com/p/36c3144bdb54【隐藏掉一些默认的分享】

6、https://blog.csdn.net/chanlingmai5374/article/details/82343470【签到】

7、微信分享实例【认真阅读】

```
1、通过npm 安装 微信的js-sdk，当然你也可以在index.html页面中直接加script标签来引用，哪种方式都可以。命令如下：
npm install weixin-js-sdk --save-dev


2、在Vue目录下，比如：common文件夹，新建一个js文件，起名你随意，我这边叫wxapi.js，贴入下面代码(PS: Axios根据实际情况来使用)：
/**
 * 微信js-sdk
 * 参考文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
import wx from 'weixin-js-sdk'
import Axios from 'axios'
const wxApi = {
  /**
  * [wxRegister 微信Api初始化]
  * @param  {Function} callback [ready回调函数]
  */
  wxRegister (callback) {
    // 这边的接口请换成你们自己的
    Axios.post('/api/wechat/shares', { reqUrl: window.location.href }, { timeout: 5000, withCredentials: true }).then((res) => {
      let data = JSON.parse(res.data.data) // PS: 这里根据你接口的返回值来使用
      wx.config({
        debug: false, // 开启调试模式
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.noncestr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: data.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
    }).catch((error) => {
      console.log(error)
    })
    wx.ready((res) => {
      // 如果需要定制ready回调方法
      if (callback) {
        callback()
      }
    })
  },
  /**
  * [ShareTimeline 微信分享到朋友圈]
  * @param {[type]} option [分享信息]
  * @param {[type]} success [成功回调]
  * @param {[type]} error   [失败回调]
  */
  ShareTimeline (option) {
    wx.onMenuShareTimeline({
      title: option.title, // 分享标题
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success () {
        // 用户成功分享后执行的回调函数
        option.success()
      },
      cancel () {
        // 用户取消分享后执行的回调函数
        option.error()
      }
    })
  },
  /**
  * [ShareAppMessage 微信分享给朋友]
  * @param {[type]} option [分享信息]
  * @param {[type]} success [成功回调]
  * @param {[type]} error   [失败回调]
  */
  ShareAppMessage (option) {
    wx.onMenuShareAppMessage({
      title: option.title, // 分享标题
      desc: option.desc, // 分享描述
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success () {
        // 用户成功分享后执行的回调函数
        option.success()
      },
      cancel () {
        // 用户取消分享后执行的回调函数
        option.error()
      }
    })
  }
}
export default wxApi

3、如何使用呢？
在Vue页面，比如首页，先引入刚刚的js文件：
import wxapi from '@/common/wxapi.js'

在mounted()中加入调用的代码：
wxapi.wxRegister(this.wxRegCallback)
然后再methods中加入下面3个方法：
wxRegCallback () {
  // 用于微信JS-SDK回调
  this.wxShareTimeline()
  this.wxShareAppMessage()
},
wxShareTimeline () {
  // 微信自定义分享到朋友圈
  let option = {
    title: '限时团购周 挑战最低价', // 分享标题, 请自行替换
    link: window.location.href.split('#')[0], // 分享链接，根据自身项目决定是否需要split
    imgUrl: 'logo.png', // 分享图标, 请自行替换，需要绝对路径
    success: () => {
      alert('分享成功')
    },
    error: () => {
      alert('已取消分享')
    }
  }
  // 将配置注入通用方法
  wxapi.ShareTimeline(option)
},
wxShareAppMessage () {
  // 微信自定义分享给朋友
  let option = {
    title: '限时团购周 挑战最低价', // 分享标题, 请自行替换
    desc: '限时团购周 挑战最低价', // 分享描述, 请自行替换
    link: window.location.href.split('#')[0], // 分享链接，根据自身项目决定是否需要split
    imgUrl: 'logo.png', // 分享图标, 请自行替换，需要绝对路径
    success: () => {
      alert('分享成功')
    },
    error: () => {
      alert('已取消分享')
    }
  }
  // 将配置注入通用方法
  wxapi.ShareAppMessage(option)
}


会遇到的问题：
以上几步即实现了微信的分享功能，如果期间遇到问题，请自己开启debug调试模式，并根据错误提示的内容去解决。一般如果后端接口没问题的话，前端一般只会遇到：签名验证失败或者URL的问题。😆
config:fail,Error: AppID 不合法
由于后端返回的是json, 我前台没有将json转为对象，所以导致一直报appID不合法。这个细心点就不会遇到了。
写在最后
```



### 二十三、混合开发文档

1、http://www.html5plus.org/doc/zh_cn/accelerometer.html

### 二十四、vue+iview搭建项目

1、https://www.jianshu.com/p/976781ff4060















































































































