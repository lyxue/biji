# 服务器代理

<img src="proxy.png" />

它能跨域的根本原因是因为，跨域只存在于前端和后端之间

但是后端于后端是没跨域的概念的

所以我们可以自己搭建一个服务器（比如：express），用自己的服务器去请求目标服务器（比如：微博的服务器），把数据请求回来给自己服务器，然后在自己服务器下把数据交给自己前端，因为数据已经在自己服务器了，你就可以自己选择对应的跨域方案来解决（比如：cors，jsonp）

服务器代理的本质是出现了两个以上的服务器

# 后端

搭建一个服务器，在该服务器用 request 模块模拟请求微博的数据，然后返回给自己的前端
```js
var express = require("express");
var request = require("request");
// 代理
var app = express();
app.get("/",(req,res)=>{
    // cors
    res.append("Access-Control-Allow-Origin","*");
    request.get("https://m.weibo.cn/api/container/getIndex?containerid=102803&openApp=0",(err,response,body)=>{
        console.log(body);
        res.send(body);
    })
})
app.listen(12345)
```

# 前端


前端不直接请求微博，而转而请求的是 express 的代理服务器
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <!-- https://m.weibo.cn/api/container/getIndex?containerid=102803&openApp=0 -->
    <button onclick="ajax('http://localhost:12345')">发送</button>
    <script>
        function ajax(url) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    //console.log(xhr.responseText);
                    var data = xhr.responseText;
                    console.log(JSON.parse(data))
                }
            }
            xhr.open("GET", url, true);
            xhr.send();
        }
    </script>
</body>
</html>
```