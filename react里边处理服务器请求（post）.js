// 引入模块
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// 链接数据库
const db = require('./mongo/Connect.js');

app.use(bodyParser.urlencoded({ extended:false }));

// 解决跨域的问题
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") {
        res.send(200);/*让options请求快速返回*/
    } else {
        next();
    }
});

// 路由
//登陆注册
const userRouter = require('./router/User.js');
app.use('/User',userRouter);
//购物车
const buyCarRouter = require('./router/buyCar.js');
app.use('/buyCar',buyCarRouter);



// 监听
app.listen(4000,()=>{
	console.log('server start in port' + 4000);
});