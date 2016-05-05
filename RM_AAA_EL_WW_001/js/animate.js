//系统原理动画============================================================================================================================================
//转杆钟摆的定时器
var
//设置动画执行的状态码（是否运行执行动画，是就为1，不是就为0，一般是到on档才让执行动画）
	isRunAnimate=0,
	//刮水电动机角度
	wiperMotorDeg=0,
	//刮水电动机旋转的定时器
	wiperMotorTimer,
	//让刮水电动机停止
	wiperMotorStop=0,
	//间歇档位判断是运动还是间歇
	intStopOrPlay=0,
	//高速档位要加速度
	hiStopOrPlay=0;




//开始On状态动画=====================================================================================================
function principleAnimateOn(){
	//

}
//开始Start状态动画===================================================================================================
function principleAnimateStart(){


}
//acc和lock状态（初始化 系统原理 动画状态）
function principleAnimateInitialize(){
	//原理线路
	$('.line-1-1').css("background","#000");
	//原理电动机停下来
	//animateStop();
}





//系统电路动画====================================================================================================================================================
//开始On状态动画=====================================================================================================
function circuitAnimateOn(){
	if(isRunAnimate==1||isRunAnimate==2){
		return;
	}
	//电路流动动画
	circuitAnimateFlow();
}

//开始Start状态动画=====================================================================================================
function circuitAnimateStart(){
	if(isRunAnimate==1||isRunAnimate==2){
		return;
	}
	//电路流动动画
	circuitAnimateFlow();
}


//电路on档流动的动画
function circuitAnimateFlow(){
	//$(".circuit-led").attr("stroke","#1D86B1");
	$(".circuit-switch1").attr({"x2":"741.259","stroke":"#f00"});
	$(".line-1").stop().animate({"height":"62px"},100,function(){
		$(".line-2").stop().animate({"width":"132px"},100,function(){
			$(".circuit-on-line1").attr("stroke","#f00");
			$(".line-3").stop().animate({"height":"29px"},50,function(){
				$(".line-4").stop().animate({"height":"19px"},50,function(){
					$(".line-5").stop().animate({"width":"244px"},500,function(){
					});
				});
			});
			$(".line-6").stop().animate({"height":"26px"},50,function(){
				$(".circuit-on-line2").attr("stroke","#f00");
				$(".line-7").stop().animate({"height":"358px"},500,function(){
					$(".line-8").stop().animate({"width":"244px"},300,function(){
						$(".line-9").stop().animate({"height":"28px"},50,function(){
							$(".circuit-on").attr("stroke","#f00");
							$(".line-animate-flow .height").css("height","0px");
							$(".line-animate-flow .width").css("width","0px");
							//offstalls();
						});
					});
				});
			});
		});
	});
}


//喷水第一步
function sprayStep1(){

	//step1
	$(".circuit-int-step1,.circuit-line-b1").attr("stroke","#f00");
	$(".circuit-water-dash,.circuit-line5").attr("stroke","#817325");
	$(".circuit-line-b2").attr("stroke","#817325");
	//step2
	$(".circuit-switch2").attr({"x2":"287.507","stroke":"#f00"});
	$(".circuit-dash-link5,.circuit-dash-link6,.circuit-off-dash-g").attr("stroke","#1AD041");
	$(".circuit-int-step2").attr("stroke","#f00");
	$(".circuit-dash-link4,.circuit-off-dash,.circuit-line3").attr("stroke","#f00");


}
//
function scroll(){
	$(".principle-scroll").remove();
	$(".scroll-con").append("<div class='principle-scroll'></div>");
	function _insert(){
		$(".scroll-con").append("<div class='principle-scroll'></div>");
		$(".principle-scroll:last").css("top","8px");
		$(".principle-scroll:last").stop().animate({"top":"-8px"},1000,'linear',function(){});
		$(".principle-scroll:first").stop().animate({"top":"-8px"},500,'linear',function(){
			$(this).remove();
			_insert();
		});
	}
	_insert();

}

//原理页面动画=====================================================
var  wiperDeg=-50,wiperLeverDeg=0,centerMotorDeg= 0,swingTimer;
//手柄的选装
function  handleRotate(id,length){
	$('.wiper-handle,.principle-handle').css({"transform":"rotate("+id+"deg)","-ms-transform":"rotate("+id+"deg)"});
	var _top=38;
	$('.wiper-handle').css("top",_top+length+'px');
	$('.principle-handle').css("top",33+(length+1)/2+'px');
}
//元件检测测试的手柄
function  handleRotateTest(id,length){
	$('.component-handle').css({"transform":"rotate("+id+"deg)","-ms-transform":"rotate("+id+"deg)","top":45+(length)*2+'px'});
}
//面板拖拽事件=====================================================
function dragDiv(){
	//给新面板加上拖拽事件
	$(".dragSource-alert").draggable({
		containment:".main",
		handle: ".alert-header",
		cursor:"move"
	})
	//给新面板加上拖拽事件
	$(".dragSource").draggable({
		containment:".main",
		cursor:"move"
	})
}


//故障动画===============================================================================================
//故障状态1  按住start----------------------------
function goMalfunctionStartDown(){
	if(goCheckStay!="1"){
		return;
	}
	//全部回到acc状态
	principleAnimateInitialize();
	//on状态动画
	principleAnimateOn();
	//低压油路箭头动画
	arrowColorAnimate("g");
	//缸内动画
	principleEngineAnimate();
	//系统电路四个信号闪动初始化
	lineAnimateFlashInitialize();
	
}
//故障状态1  松开start
function goMalfunctionStartUp(){
	if(goCheckStay!="1"){
		return;
	}
	//全部回到acc状态
	principleAnimateInitialize();
	//on状态动画
	principleAnimateOn();
	//系统电路四个信号闪动初始化
	lineAnimateFlashInitialize();
	//回到on状态的识别码
	isRunAnimate=1;
}


// 诊断仪动作测试==================================================================================================
//左键是下降
function mouseleft()
{
	$("#gooff").html("<b>DOWN</b>");
	//车窗下降
	windowUpOrDown1(0);
	//分两种情况，一个是手动档，一个是自动档
	if(manuOrAuto==0){
		//原理线路亮一下
		$(".line-1-1,.line-1-2,.line-1-3").css("background","#f00");
	}else{
		//原理线路亮一下
		$(".line-2-1,.line-2-2,.line-2-3").css("background","#f00");
	}
	//电机左红右边棕
	$(".circuit-man-left").attr("stroke","#f00");
	$(".circuit-man-right").attr("stroke","#7E712A");

}
//右键是上升
function mouseright()
{
	$("#gooff").html("<b>UP</b>");
	//车窗上升
	windowUpOrDown1(1);
	//分两种情况，一个是手动档，一个是自动档
	if(manuOrAuto==0){
		//原理线路亮一下
		$(".line-1-1,.line-1-2,.line-1-3").css("background","#f00");
	}else{
		//原理线路亮一下
		$(".line-2-1,.line-2-2,.line-2-3").css("background","#f00");
	}
	//电机左棕右红
	$(".circuit-man-left").attr("stroke","#7E712A");
	$(".circuit-man-right").attr("stroke","#f00");
}

//鼠标弹起，恢复初始状态
function mouseUp()
{
	$("#gooff").html("<b>OFF</b>");
	//原理线路不亮
	$(".line-1-1,.line-1-2,.line-1-3").css("background","#000");
	$(".line-2-1,.line-2-2,.line-2-3").css("background","#000");
	//主要电机左右都变黑
	$(".circuit-man-left").attr("stroke","#000");
	$(".circuit-man-right").attr("stroke","#000");
	//不光是要关掉上升和下降的定时器，还要关掉角度旋转的定时器
	clearInterval(windowLeft1UpAndDownTimer);
	clearInterval(windowLeft1RotateTimer);
}





