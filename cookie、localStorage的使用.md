# cookie的使用

### 一、保存拖拽位置

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style type="text/css">
        #box{width: 200px;height: 200px;background: red;position:absolute;left: 0;top: 0;}
    </style>
   <!--  <script type="text/javascript" src="../../../common.js"></script> -->
</head>
<body>
    <div id="box">
    </div>
    <script type="text/javascript">
        // 一、cookie的基本设置及获取
        //  * 客户端与服务器端进行通讯使用的，一个能够在浏览器本地化存储的技术。
        //  * 设置 document.cookie = "name=value";
        //      * 每一次都只能设置一条cookie
        //  * 获取 document.cookie 
        //      * 返回值的格式为字符串"name=laoxie; left=283; top=229"
        //      * 一次性获取到所有cookie
        var box = document.getElementById("box");
        box.onmousedown = function(evt){
            var ox = evt.offsetX;   //获取鼠标弹起时的位置
            var oy = evt.offsetY;	//获取鼠标弹起时的位置
            document.onmousemove = function(e){
                box.style.left = e.pageX - ox + 'px';
                box.style.top = e.pageY - oy + 'px';
                e.preventDefault();
            }
        }
        // box.onmouseup = function(){
        //     document.onmousemove = null;
        //     var left = box.offsetLeft;
        //     var top = box.offsetTop;
        //     document.cookie = "left="+left;
        //     document.cookie = "top="+top;
        // }
        // //1.当鼠标弹起时，记录box到浏览器左上角的位置box.offsetLeft  box.offsetTop,存入cookie
        // //2.当重新进入页面时，获取cookie，拿到left与top对应的值，再给box设置样式。
        // var cookies = document.cookie;
        // var cookiesArr = cookies.split("; ");
        // console.log(cookiesArr);
        // cookiesArr.forEach(function(item){
        //     var arr = item.split("=");
        //     if(arr[0] == "left" || arr[0] == "top"){
        //         box.style[arr[0]] = arr[1] + 'px';
        //     }
        // })
        // box.style.left = Cookie.getCookie("left") +'px';
        // box.style.top = Cookie.getCookie("top") + 'px';


    </script>
    <!-- ctrl+shift+p ====>pcip==>sublimeserver==>安装 -->
    <!-- tool-sublimeserver-start server-view in  sublime -->
</body>
</html>
```

### 二、七天免登录

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>10天免登录</title>
    <style type="text/css">
            body{
                background-color:rgb(177, 208,224); font: normal 12px Trebuchet MS; color:#000;
            }
            form{ 
                width:220px; padding:10px;
                background-color:#DDEEF6; 
                box-shadow: 0px 0px 10px 0px #888888;
                border:1px solid #DDEEF6;
                border-radius:6px;
                margin: auto;
            }
            .roundedCorners-textbox{ 
                border:1px solid #999; width:160px;
            }
            .checkbox {
                margin-left: 30px;
                border:1px solid #999; width:20px;
            }
    </style>
</head>
<script>
    window.onload = function(){
        var username = document.getElementById("username");
        var password = document.getElementById("password");
        var btnSubmit = document.getElementById("btnSubmit");
        var checkbox = document.getElementsByClassName("checkbox")[0];
        //1.账号与密码必须存在值，才能点击提交到百度.取消浏览器的默认行为
        //  * 注意去除值的前后空格
        btnSubmit.onclick = function(e){
            e.preventDefault();
            var _username = username.value;
            var _password = password.value;
            if(_username.trim().length == 0 || _password.trim().length == 0){
                alert("用户名或密码为空,不允许登录");
                return;
            }
            //2.如果多选框被选中时，用cookie保存用户名及密码
            if(checkbox.checked){
                var d = new Date();
                d.setDate(d.getDate()+7);
                document.cookie = "uname="+_username+"; expires="+d.toUTCString();
                document.cookie = "upwd="+_password+"; expires="+d.toUTCString();
            }
            location.href = "http://www.baidu.com";
        }

        //3.再次进入页面的时候，拿到所有的cookie，从中判断是否存在用户名及密码的cookie，说明可以直接跳转
        var cookies = document.cookie;
        var cookieArr = cookies.split("; ");
        console.log(cookieArr);
        cookieArr.forEach(function(item){
            var arr = item.split("=");
            if(arr[0] == "uname" ){
                location.href = "http://www.baidu.com";
            }
        })
    }
</script>
<body>
    <form action="http://www.baidu.com" method="get">   
        <label>账号</label>
        <input id="username" type="text" /><br /><br />
        <label>密码</label>
        <input id="password" type="text" /><br /><br /> 
        <label><input type="checkbox" class="checkbox"  />
        7天内免登陆</label>
        <br/><br/>
        <input type="submit" value="确定" id="btnSubmit" />
        <input type="reset" value="清空" />
    </form> 
</body>
</html>

```

### 三、cookie的其他参数

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Document</title>
</head>
<body>
    <script type="text/javascript" src="../../../common.js"></script>
    <script type="text/javascript">
        var d = new Date();
        d.setDate(d.getDate()+7);
        // document.cookie = "car=che; expires="+ d.toUTCString()+"; path=/";
        Cookie.setCookie("car","che",d.toUTCString(),"/");
        // Cookie.setCookie("car","che");
        // var res = Cookie.getCookie("car");
        // console.log(res);
        Cookie.removeCookie("car","che","/");

        // 二.cookie的其他参数
        // 1.设置： document.cookie = "name=value[; expires=date][; path=/]"
        //      * expires 有效期
        //          * session 默认为临时存储
        //          * date 具体日期的字符串 toUTCString()
        //      * path 保存cookie的位置
        //          * 默认当前文件所在目录
        //          * / 存储到根目录
        //
        //
        // 2.获取：document.cookie
        //      一次性获取到当前目录往上找到根目录的所有cookie
        // 3.设置路径，其目的是为了让其他不同于当前文件夹的文件获取到其他文件的cookie值
    </script>
</body>
</html>
```

### 四、localStorage的基本使用

1、存储

```
实例：
let storage=window.localStorage;
storage.setItem("随便取名",要存储的值)
```

2、获取

```
let storage=window.localStorage;
storage.getItem("就是上面存储的名字")；
```

3、以上两步就是localstorage存储数据的基本方法













