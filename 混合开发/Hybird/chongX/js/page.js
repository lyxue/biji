		// H5+所有API接口都暴露在window.plus对象下
		// h5+是先触发plusready自定义事件,然后再调用onPlusReady事件,所以要先写入这句话
		document.addEventListener( "plusready", onPlusReady);
		function onPlusReady(){
			mui.init();
// 			//轮播图
			var gallery = mui('.mui-slider');
			gallery.slider({
			  interval:2000
			});
			
        	// 拍照
// 			let _btnCamer=document.getElementById('btnCamer')
// 			console.log(_btnCamer);
			let cme = plus.camera;
			console.log(cme);
// 			_btnCamer.onclick = () =>{
// 				console.log("1111")
// 			}
		}