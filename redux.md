#### redux的基本使用

有一定的缺陷，所以在后边推出了react-radux

```
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

//首先还是先下载redux
// 引入redux提供的createStore方法
import {createStore} from 'redux';

// 创建数据仓库
// 指定state的修改逻辑：Reducer

//创建了下边使用，列子；
let initData = {
	age:18,
	username:'xxx'
}

// reducer
// 根据不同的action操作旧的state，并返回新的state
let reducer = (state=initData,action)=>{
	//根据action来修改state，并返回新的state
	
	//判断类型，如果类型符合，就会执行相应的代码，返回新的数值，后渲染页面数据；
	switch(action.type){
		case 'UPDATE_AGE':  
			return {
				...state,
				age:action.payload.age
			}
		case 'UPDATE_USERNAME':
			return {
				...state,
				username:action.payload.username
			}
		// ....
		default:
			return state;
	}
}
let store = createStore(reducer);

store.subscribe(function(){
每一次都会触发这个函数，所以 可以在这进行相应的操作；
	console.log(666)
});


// 获取初始state
console.log(store.getState());

// action:告诉store要求改什么
let action = {
	type:'UPDATE_AGE',//取名字，为了switch语句进行判断；
	payload:{          //方法
		age:20
	}
}

//告诉store要修改什么，调用这个就会触发reducer函数，然后更改数据
store.dispatch(action);

// 获取修改后的数据
console.log(store.getState());
//在这修改数据，一定是在这里修改数据；记好了；
store.dispatch({
	type:'UPDATE_USERNAME',
	payload:{
		username:'laoxie'
	}
});

console.log(store.getState());

ReactDOM.render(<div/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

```

