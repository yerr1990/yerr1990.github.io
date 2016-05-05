//周玉杰（zyj）图片预加载（img preload）2015-06-24


//要加载的图片文件url数组（从后台获取图片url，再组成这个数组）
var aImgurl =["images/comm_icon/007_bg.png","images/comm_icon/007_select1.png","images/comm_icon/007_select2.png","images/comm_icon/007_select3.png","images/comm_icon/007_select4.png","images/comm_icon/007_select5.png","images/comm_icon/all_icon.png","images/comm_icon/amp.png","images/comm_icon/clickbtn1.png","images/comm_icon/guanbi.png","images/comm_icon/logo.jpg","images/comm_icon/nar.png","images/comm_icon/tishianniu.png","images/comm_icon/tn_bg.png","images/comm_icon/touming.png","images/comm_icon/xyt_bg.png","images/comm_icon/zz_1.png","images/svg/wbt.svg","images/dj_21.jpg"]
//预加载函数
function ImagePreload(arr){
	var newImages=[];
	var loadImages=0;
	//确保该参数是数组
	var arr = (typeof arr != "object") ? [arr] : arr;
	//图片加载完一张时执行的函数
	function ImageLoaded(){
		loadImages++;
//		alert("加载了"+loadImages+"张");
//		$(".color").css("width",(loadImages/arr.length)*100+"%")
		if(loadImages==arr.length){
			return;
//			alert("图片全部加载完成");
		}
	}
	//用for来加载每一张图片
	for(var i=0;i<arr.length;i++){
		newImages[i]=new Image();
		newImages[i].src=arr[i];
		//如果已经存在于缓存中则不用再走onload或onerror了
		if(newImages[i].complete){
			ImageLoaded();
			continue;
		}else{
			//当图片加载正确时
			newImages[i].onload=function(){
				ImageLoaded();
			}
			//当图片加载失败时
			newImages[i].onerror=function(){
//				alert("加载失败")
				ImageLoaded();
			}
		}				
	}
}
