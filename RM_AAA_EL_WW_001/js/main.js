//zyj 2015-8-4
//全局变量(1,2,3,4分别代表lock、acc、on、start档)
var stalls=1,
//选择题的题号，第几套题
	questionNo=0,
//选择题答案（用户回答的答案）；
	jAnswer={
		no0:'',
		no1:'',
		no2:'',
		no3:'',
		no4:'',
		no5:'',
		no6:'',
		no7:'',
		no8:'',
		no9:''
	},
//是否点击了提交按钮
	bSubmit=false,
//原理图中弹出框（0代表没有点击，1代表点击的是点火线圈，2代表点击的是火花塞，3代表点击的是凸轮轴位置传感器，4代表点击的是爆震传感器，5代表点击的是曲轴位置传感器）
	sysPrincipleAlert=0,
//电路图中弹出框（0代表没有点击，1代表点击的是点火线圈，2代表点击的是火花塞，3代表点击的是凸轮轴位置传感器，4代表点击的是爆震传感器，5代表点击的是曲轴位置传感器）
	sysCircuitAlert=0,
//记录跳转到哪个系统页面了(1代表系统电路，2代表系统原理)
	sysStay=2,
//记录左侧导航跳到了那个模块(0代表没有选择任何一个，1代表结构原理，2代表诊断测量，3代表故障排除，4代表只是拓展，5代表技能测试)
	leftNaviStay=0,
//故障排除页面中三个故障状态码（0代表没有进入故障，1代表进入vsv泄露，2 代表进入vsv断路，3代表炭罐破裂）
	goCheckStay=0,
//每个工具使用状态判别码（0代表没被使用，1代表正在被使用）
	diagnosticStay=0,
	multimeterStay=0,
//是否在系统电路图中打开了元件检测
	circuitAlertStay=0,
//用来记忆进度的数组(带时间，即有#加时间)
	aHistory=[],
//用来记忆进度的数组(不带时间，即去掉#后的数组)
	snapHistroy=[],
//学完所有的时；
	nAllStudent=47,
//传给后台的百分比进度
	percentPage=0,
//全局时间
	allStudyTime=0;
//获取时间戳
//	sysTimestamp=JSON.parse($("#historyData",window.parent.document).html()).currentTime;
	
//comm=========================================================================================================================================================
//获取元素在数组中的索引值
function getArrIndex(n,arr){
	for(var i=0;i<arr.length;i++){
		if(n==arr[i]){
			return i;
			break;
		}
	}
}
//拼接alertBodySrc
function toAlertBodySrc(str){
	var src='template/router_template/'+str;
	return src;
}
//去除数组中重复的数字
function deleRepeat(arr){
	var aResult=[],isRepeat;
	for(var i=0;i<arr.length;i++){
		isRepeat=false;
		for(var j=i+1;j<arr.length;j++){
			//如果只有一个值，则没有arr[2]这个值，数组越界了，所以这里不能判断，直接跳出
			if(arr.length==1){
				break;
			}
			if(arr[i]==arr[j]){
				isRepeat=true;
				break;
			}
		}
		if(!isRepeat){
			aResult.push(arr[i]);
		}
	}
	return aResult;
}
//记录进度
//function recordHistory(obj){
//	if($.inArray(obj,snapHistroy)!=-1){
//		return;
//	}
//	obj=obj.toString();
//	snapHistroy.push(obj);
//	//字符串拼接，加上时间
////	if(typeof(obj)=="string"){
////		aHistory.push(obj+"#"+((JSON.parse(allStudyTime)*1000)+sysTimestamp));
////		//没有带时间的数组，用来判断进度
////		snapHistroy.push(obj);
////	}
////	console.log(snapHistroy)
//	//percentPage=parseInt((deleRepeat(aHistory).length/nAllStudent)*100)
//	//console.log(deleRepeat(aHistory)+","+deleRepeat(aHistory).length+","+percentPage);
//}

//关闭浏览器窗口，兼容多个浏览器下的关闭方法
function CloseWindow(){
	//关闭父类窗口(兼容多个浏览器的关闭)
	var userAgent = navigator.userAgent;
	if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {
		top.window.parent.opener = top;
		top.window.parent.open('', '_self', '');
		top.window.parent.close();
	} else {
		window.parent.opener = null;
		window.parent.open("", "_self");
		window.parent.close();
	}
}






//提交进度
//function SubmitHistory(){
//	alert(deleRepeat(aHistory)+","+deleRepeat(aHistory).length);
//};
//关闭按钮这个只是displaynone了====================================================
function closeDiv(obj){
	$(obj).parent().addClass("hide-important");
}
//彻底移除这个节点的关闭
function removeDiv(obj){
	$(obj).parent().remove();
}
//左侧导航栏============================================================================================================================================================================================================================
//左侧导航栏收缩伸展切换状态
function sideNaviToggle(obj){
	//弥补angularjs加载慢的特性
	$(".alert-contain").removeClass("hide-important");
	if(obj.name==0){
		$(obj).css("background","url(images/comm_icon/navi_btn_bg_in.png) no-repeat");
		$(".sideBar-navi").animate({
			left:'0px'
		},200);
		obj.name=1;
	}else{
		$(obj).css("background","url(images/comm_icon/navi_btn_bg_out.png) no-repeat");
		$(".sideBar-navi").animate({
			left:'-137px'
		},200);
		obj.name=0;
	}
}
//仪表显示======================================================================
	//仪表板初始位置
var sSwitchMeterTop="420px";
var sSwitchMeterLeft="602px";
function dashboardToggle(val){
	if(val==1){
		//关闭点火面板判别码
		isOpenSwitch=1;
		$(".switch-meter .switch-btn").addClass("hide-important");
		$(".switch-meter .meter").removeClass("hide-important");
	}else{
		//关闭点火面板判别码
		isOpenSwitch=0;
		$(".switch-meter .switch-btn").removeClass("hide-important");
		$(".switch-meter .meter").addClass("hide-important");
	}
	//面板恢复原位置
	$(".switch-meter .meter").css({"top":sSwitchMeterTop,"left":sSwitchMeterLeft});
}

//右侧工具栏=====================================================================
//右侧工具栏收缩伸展切换状态
function sideToolToggle(obj){
	//弥补angularjs加载慢的特性
//	$(".resistanceWarn").removeClass("hide-important");
	if(obj.name==0){
		$(obj).css("background","url(images/comm_icon/tool_btn_bg_in.png) no-repeat");
		$(".sideBar-tool").animate({
			right:'0px'
		},200);
		obj.name=1;
	}else{
		$(obj).css("background","url(images/comm_icon/tool_btn_bg_out.png) no-repeat");
		$(".sideBar-tool").animate({
			right:'-137px'
		},200);
		obj.name=0;
	}
}
//底部钥匙框=====================================================================
//底部钥匙框收缩伸展切换状态
function bottomLockToggle(obj){
	//加上拖拽事件
	dragDiv();
	if(obj.name==0){
		$(obj).css("background","#F1A703 url(images/comm_icon/lock_icon_down.png) no-repeat 8px 5px");
		$(".bottomBar-lock").animate({
			bottom:'0px'
		},200);
		obj.name=1;
	}else{
		$(obj).css("background","#F1A703 url(images/comm_icon/lock_icon_up.png) no-repeat 8px 5px");
		$(".bottomBar-lock").animate({
			bottom:'-63px'
		},200);
		obj.name=0;
	}
}



//显示万用表热区点
function showAHot(){
	if(multimeterStay!=1){
		return;
	}
	//系统电路下============================================
	if(circuitAlertStay==1){
		//让电路图上的热区的点隐藏掉
		$(".circuit-multimeter-hot").addClass("hide-important");	
		//让元件检测上的热区的点显示
		$(".circuit-body .component-multimeter-hot").removeClass("hide-important");	
	}else{
		//让电路图上的热区的点显示出来
		$(".circuit-multimeter-hot").removeClass("hide-important");
		//让元件检测上的热区的点隐藏
		$(".circuit-body .component-multimeter-hot").addClass("hide-important");
	}
	//系统原理下============================================
	//让元件检测上的热区的点显示
	$(".principle-body .component-multimeter-hot").removeClass("hide-important");
}
function hideAHot(){
	//让电路图上的热区的点隐藏掉
	$(".circuit-multimeter-hot").addClass("hide-important");
	//让元件检测上的热区的点隐藏
	$(".circuit-body .component-multimeter-hot").addClass("hide-important");
	$(".principle-body .component-multimeter-hot").addClass("hide-important");
}

//技能测试选择题答案加上触发事件====================================================================
//function answerToActive(id){
//	//一旦提交了，则不能再选择答案了
//	if(bSubmit){
//		return;
//	}
//	//先去掉选择题样式，在加上触发样式
//	$(".alert-body-question ul.answerChoice button").removeClass("active");
//	$("#"+id).addClass("active");
//	//记录选择了的答案
//	var answer="no"+questionNo;
//	jAnswer[answer]=id;
//	//记录进度
//	$rootScope.recordHistory("HA0"+(10+questionNo));
//}
//检测答案情况，判断样式
function answerCheck(){
	//把questNo转化成答案下标，questionNo可以表示当前所在页面
	var answer="no"+questionNo;
	if(jAnswer[answer]){
		//先去掉再加上
		$(".alert-body-question ul.answerChoice button").removeClass("active");
		$("#"+jAnswer[answer]).addClass("active");
	}else{
		//如果没有选中答案，则去掉触发样式
		$(".alert-body-question ul.answerChoice button").removeClass("active");
	}
}
//判断上一步下一步是否禁止
function isShowPreONext(){
	$(".question-pre,.question-next").removeClass("disable").addClass("cursor-pointer");
	$(".question-pre,.question-next").removeClass("disable").addClass("cursor-pointer");
	if(questionNo==0){
			$(".question-pre").addClass("disable").removeClass("cursor-pointer");
		}
	if(questionNo==9){
		$(".question-next").addClass("disable").removeClass("cursor-pointer");
	}
}

//生产大图弹出框
//	function toBigImg(){
//		//生成一个新的大的图
//		$("body").append('<div class="systemCompositionBig z-index-1000"><img src="images/systemComposition.jpg" /><button class="close cursor-pointer z-index-1" onclick="closeSystemComposition();">X</button></div>');
//	}
//	function closeSystemComposition(){
//		$(".systemCompositionBig").remove();
//	}
////生成故障清除提示框
//	function clearMalFunctionAlert(){
//		$("body").append('<div class="clearMalFunctionAlert-contain z-index-1000" onclick="removeAlert();"><span class="clearMalFunctionAlert-alert cursor-pointer radius"><p>故障已经清除</p><button class="cursor-pointer radius" onclick="removeAlert();">确定</button></span></div>')
//	}
//	function removeAlert(){
//		$(".clearMalFunctionAlert-contain").remove();
//	}

