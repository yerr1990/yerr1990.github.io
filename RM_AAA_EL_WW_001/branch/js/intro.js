/*	
 * by zyj
 * help.js
 * */


var freshAllow=true;
var sSwitchMeterTop="420px";
var sSwitchMeterLeft="602px";
//是否点开了面板以及面板的位置
var isOpenSwitch=0;
var SwitchMeterTop=sSwitchMeterTop;
var SwitchMeterLeft=sSwitchMeterLeft;
//是否点开了左侧导航面板
var isOpenLeftNavi=0;
//是否点开了右侧工具面板
var isOpenRightTool=0;
//是否点开了控制面板
var isOpenBottomCtrl=0;
//开始新手引导前先打开工具等东西
function openAllStep(){
		//弥补angularjs加载慢的特性
		$(".alert-contain").removeClass("hide-important");
		
	 	//获取导航列表点击对象并点击=======================================================
	 	var objNavi=$(".sideBar-navi-button")[0];
	 	//记录下状态
	 	isOpenLeftNavi=objNavi.name;
	 		//打开面板（没有动画效果的打开）
	  	$(objNavi).css("background","url(images/comm_icon/navi_btn_bg_in.png)");
		$(".sideBar-navi").css("left","0px");
		objNavi.name=1;
	  
	  
	  
	  	//获取工具列表点击对象并点击======================================================
	  	var objTool=$(".sideBar-tool-button")[0];
	  	//记录下状态
	  	isOpenRightTool=objTool.name;
	  		//打开面板（没有动画效果的打开）
	  	$(objTool).css("background","url(images/comm_icon/tool_btn_bg_in.png)");
		$(".sideBar-tool").css("right","0px")
		$(".sideBar-tool").removeClass("z-index-99");
		objTool.name=1;


		
		//获取点火面板点击对象并点击=====================================================
//		var objSwitchMeter=$(".switch-meter .meter");
//		//获取面板的位置
//		SwitchMeterTop=objSwitchMeter.css("top");
//		SwitchMeterLeft=objSwitchMeter.css("left");
//		//打开面板
//		$(".switch-meter .switch-btn").addClass("hide-important");
//		$(".switch-meter .meter").removeClass("hide-important");
//  	$(".switch-meter .meter").removeClass("z-index-12");
//		//面板恢复原位置
//		$(".switch-meter .meter").css({"top":sSwitchMeterTop,"left":sSwitchMeterLeft});
////		objSwitchMeter[0].name=1
		
		
		
		//获取 控制中心 面板点击对象并点击=====================================================
		var objCtrlMeter=$(".bottomBar-lock-button")[0];
	 	//记录下状态
	 	isOpenBottomCtrl=objCtrlMeter.name;
	 		//打开面板（没有动画效果的打开）
	  	$(objCtrlMeter).css("background","#F1A703 url(images/comm_icon/lock_icon_down.png) no-repeat 8px 5px");
		$(".bottomBar-lock").css("bottom","0px");
		objCtrlMeter.name=1;
	
}
//判断并恢复工具面板之前的状态（打开或关闭）
function restoreAllStep(){
	//恢复 左侧导航 状态============================================================
  	if(isOpenLeftNavi==1){
  		//保持打开状态
  	}else{
  		//关闭左侧导航（0是个错误的参数，原参数应该传一个对象，这里刚好可以走else方法）
  		sideNaviToggle($(".sideBar-navi-button")[0]);
  	}
  	//恢复 右侧工具 状态============================================================
  	if(isOpenRightTool==1){
  		//保持打开状态
  	}else{
  		//关闭右侧工具
  		sideToolToggle($(".sideBar-tool-button")[0]);
  	}
  	//恢复 仪表 状态============================================================
  	if(isOpenSwitch==1){
  		//保持打开，并把之前储存的位置赋给面板
  		$(".switch-meter .meter").css({"top":SwitchMeterTop,"left":SwitchMeterLeft});
  		//保持打开状态
  	}else{
  		//关闭仪表面板
  		dashboardToggle(0);
  	}
  	//恢复 控制中心 状态============================================================
  	if(isOpenBottomCtrl==1){
  		//保持打开状态
  	}else{
  		//关闭 控制面板
  		bottomLockToggle($(".bottomBar-lock-button")[0]);
  	}
}





//插入指引说明文字==================================================================================================================
var jInfo=[
	{
		step:"#step1",
		sInfoText:"<b>结构原理 </b>点击此项后弹出 系统概述、系统组成、系统原理等，可以进行学习<br><br><b>诊断测量 </b>点击此项后弹出  检测方法（文本）、元件检测<br><br><b>故障排除 </b>点击此项后出现   故障设置   及故障模式下的检测<br><br><b>知识拓展 </b>点击此项后出现知识拓展内容<br><br><b>技能测试 </b> 可以进行课前及课后测试<br><br>",
		positionCss:"intro-right"
	},
	{
		step:"#step2",
		sInfoText:"<b>万用表 </b>通过点击相应的表笔,然后点击想要测量的点，万用表表笔就连接到相应的点上，可以用于测量电路及一些元件的电阻、电压值。<br><br>",
		positionCss:"intro-left"
	},
	//{
	//	step:"#step3",
	//	sInfoText:"<b>界面元件</b>仪表台包含了四个界面元件：仪表、加速踏板（用手拖动）、 制动踏板（用手拖动）、点火开关（用手点击）， 点火开关四个档位 LOCK ACC ON START<br><br><b>仪表和警告灯</b>仪表台包含有冷却水温、发动机转速（RPM）、车速表和燃油表，仪表台左右两侧分布着如下警告灯：发动机故障指示灯、充电系统警告灯、ABS警告灯、制动系统警告灯、机油油压过低警告灯、安全带警告灯、SRS警告灯。<br>",
	//	positionCss:"intro-top-right"
	//},
	{
		step:"#step3",
		sInfoText:"<b>控制中心 </b>控制中心是可操作元件集合体。点击要操作的元件，出现放大图，在上面点击可操作部位，系统原理和系统电路讲有对应动画出现。点击左上角“ X ”关闭操作元件。点击“控制中心”显示或隐藏中心元件。<br>",
		positionCss:"intro-top-left"
	},
];
//第几步
var stepNo=1;
//延迟显示引导框信息的定时器
var timerIntroInfo;
//先插入所有引导元素
function newIntro(){
	//插入主要帮助框架
	$("body").append('<div class="intro-mask-background"><div><div id="intro-show-box" class="intro-show-box" onclick="event.stopPropagation();"><div class="intro-show-box-info" onclick="event.stopPropagation();"><i class="intro-step-sign"></i><div class="intro-show-box-info-text"></div><div class="intro-select"><button class="intro-select-stop">跳过</button><button class="intro-select-prev intro-select-disable">上一步</button><button class="intro-select-next">下一步</button></div></div></div><div class="intro-show-box intro-show-box-mark" onclick="event.stopPropagation();"></div></div></div>')
	
//	//插入step1
//	$("#step1").clone().appendTo($("#intro-show-box")).attr("id","intro-step1-copy").css({"top":"0px","left":"0px","margin":"5px"}).hide();
//	//插入step2
//	$("#step2").clone().appendTo($("#intro-show-box")).attr("id","intro-step2-copy").css({"top":"0px","left":"0px","margin":"5px"}).hide();
//	//插入step3
//	$("#step3").clone().appendTo($("#intro-show-box")).attr("id","intro-step3-copy").css({"top":"0px","left":"0px","margin":"5px"}).hide();
//	//插入step4
//	$("#step4").clone().appendTo($("#intro-show-box")).attr("id","intro-step4-copy").css({"top":"0px","left":"0px","margin":"5px"}).hide();
	//插入step1/step2/step3/step4
	for(var i=1;i<=jInfo.length;i++){
		$("#step"+i).clone().appendTo($("#intro-show-box")).attr("id","intro-step"+i+"-copy").css({"top":"0px","left":"0px","margin":"5px"}).hide();
	}
	
	//给蒙版加上关闭事件===========================================================================================================================
	$(".intro-mask-background").on("click",stopIntro);
	//绑定各大事件（跳出）----------------------------------------------------------
	$(".intro-select-stop").bind("click",stopIntro);
	//绑定各大事件（上一步）
	$(".intro-select-prev").bind("click",prevIntro);
	//绑定各大事件（下一步）
	$(".intro-select-next").bind("click",nextIntro);
}

setTimeout(newIntro,1000);
//===========================================================================================================================================================================================
//入口方法
function startIntro(){
	
	//打开所有的工具
	openAllStep();
	//显示蒙版
	$(".intro-mask-background").css("display","block");
	
	//建立引导（第一个引导层）==================================================================================================================================================================================================================================================
	//建立第一步引导的框框
	var obj=$("#step"+stepNo);
	var widthStep=parseInt(obj.width())+5+"px";
	var heightStep=parseInt(obj.height())+15+"px";
	var leftStep=parseInt(obj.offset().left);
	var topStep=parseInt(obj.offset().top)-5;
	
		//设置引导框框的属性值
	$(".intro-show-box").css({"width":widthStep,"height":heightStep}).offset({top:topStep,left:leftStep})
	$(".intro-show-box").addClass("intro-show-box-animation");
	
	//将第一个引导拷贝并复制到引导框框内
	$("#intro-step1-copy").show();
	//将第一个信息注入到引导框里
	$(".intro-step-sign").text(stepNo);
	$(".intro-show-box-info-text").html(jInfo[stepNo-1].sInfoText).parent().addClass(jInfo[stepNo-1].positionCss);
	//==================================================================================================================================================================================================================================================
}
//初始化
function InitializeIntro(){
	//改为上一步置灰下一步显示
	$(".intro-select-next").removeClass("intro-select-disable");
	$(".intro-select-prev").addClass("intro-select-disable");
	//把 关闭 换成 跳过
	$(".intro-select-stop").text("跳过");
	for(var i=1;i<=jInfo.length;i++){
		//删除所有的引导框内容
		$("#intro-step"+i+"-copy").hide();
	}
	//修改 引导框框的 属性值
	$(".intro-show-box").css({"width":"0px","height":"0px"}).offset({top:"0px",left:"0px"})
	$(".intro-show-box").parent().removeClass("switch-meter");
	//删除引导信息的位置样式
	$(".intro-show-box-info").removeClass().addClass("intro-show-box-info");
	//去除动画
	$(".intro-show-box").removeClass("intro-show-box-animation");
}

//关闭引导（并不是真的remove掉）
function stopIntro(){
	stepNo=1;
	InitializeIntro();
	$(".intro-mask-background").css("display","none");
	//恢复那些面板原来的位置
	restoreAllStep();
}

//上一步
function prevIntro(){
	if(stepNo<=1){
		stepNo=1;
		return;
	}
	stepNo--;
	$(".intro-show-box-info-text").parent().removeClass(jInfo[stepNo].positionCss).hide();
	//展示下一步信息
	showIntro();
}

//下一步
function nextIntro(){
	if(stepNo>=jInfo.length){
		stepNo=jInfo.length;
		return;
	}
//	alert(stepNo)
	stepNo++;
	$(".intro-show-box-info-text").parent().removeClass(jInfo[stepNo-2].positionCss).hide();
	//展示下一步信息
	showIntro();
}

//渲染显示等计算
function showIntro(){
	//判断下一步，上一步的按钮置灰==================================
	if(stepNo==1){
		$(".intro-select-next").removeClass("intro-select-disable");
		$(".intro-select-prev").addClass("intro-select-disable");
		//把 关闭 换成 跳过
		$(".intro-select-stop").text("跳过");
	}else if(stepNo==jInfo.length){
		$(".intro-select-prev").removeClass("intro-select-disable");
		$(".intro-select-next").addClass("intro-select-disable");
		//把 跳过 换成 关闭
		$(".intro-select-stop").text("关闭");
	}else{
		$(".intro-select-prev").removeClass("intro-select-disable");
		$(".intro-select-next").removeClass("intro-select-disable");
		//把 关闭 换成 跳过
		$(".intro-select-stop").text("跳过");
	}
	//===========================================================
	//增加样式===========================================================
	if(stepNo==3){
		$(".intro-show-box").parent().addClass("switch-meter");
		//仪表面板的特殊样式去掉
		$("#intro-step"+stepNo+"-copy").removeClass("hide-important");
	}else{
		$(".intro-show-box").parent().removeClass("switch-meter");
	}
	
	
	//===========================================================
	//获取 引导的框框
	var obj=$("#step"+stepNo);
	
	var widthStep=parseInt(obj.width())+10+"px";
	var heightStep=parseInt(obj.height())+10+"px";
	var leftStep=parseInt(obj.offset().left)-5;
	var topStep=parseInt(obj.offset().top)-5;
	
	//将引导信息 拷贝并复制到引导框框内
//		//删掉上一个复制的引导信息对象
	for(var i=1;i<=jInfo.length;i++){
		//删除所有的引导框内容
		$("#intro-step"+i+"-copy").hide();
	}
	
	
	//修改 引导框框的属性值===================================================================================
	$(".intro-show-box").css({"width":widthStep,"height":heightStep}).offset({top:topStep,left:leftStep});
	
	if(timerIntroInfo){clearTimeout(timerIntroInfo)};
	timerIntroInfo=setTimeout(function(){
		//拷贝引导信息对象
		$("#intro-step"+stepNo+"-copy").show();
		//将引导信息 信息注入到引导框里（标号）
		$(".intro-step-sign").text(stepNo);
		//将引导信息 信息注入到引导框里（说明文字）
		$(".intro-show-box-info-text").html(jInfo[stepNo-1].sInfoText).parent()
		.addClass(jInfo[stepNo-1].positionCss).show();
	},300);
}




