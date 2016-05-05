
//点火面板动画=====================================================================
//旋转开关角度
function stallsAngle(stalls){
	if(stalls==1){
		stallsIgnition =0;
		$(".key").css("transform","rotate(0deg)");
	}else if(stalls==2){
		stallsIgnition =0;
		$(".key").css("transform","rotate(50deg)");
	}else if(stalls==3){
		stallsIgnition =1;
		$(".key").css("transform","rotate(90deg)");
		circuitAnimateOn();
	}else if(stalls==4){
		stallsIgnition=1;
		$(".key").css("transform","rotate(140deg)");
		circuitAnimateOn();
	}
}
//灯全亮,再熄灭
function lightingThenLightOff(){
	$(".switch_meter .meter .light .transparent").removeClass("transparent");
	if(timer){
		clearTimeout(timer);
	};
	var timer=setTimeout(function(){
		$(".switch_meter .meter .light img").not(".monitor").addClass("transparent");
	},2000);
}
//灯指针初始化
function lightAndPointerInitialize(){
	$(".switch_meter .meter .light img").addClass("transparent");
}
//转速指针旋转
function rotatePointerRotate(rotateEndValue){
	if(timer){
		clearInterval(timer);
	}
	if(rotateEndValue>rotateValue){
		var timer=setInterval(function(){
			rotateValue++;
			$(".switch_meter .pointer .pointer_roate").css("transform","rotate("+rotateValue+"deg)");
			if(rotateValue>=rotateEndValue){
				clearInterval(timer);
			}
		},20)
	}
	if(rotateEndValue<rotateValue){
		var timer=setInterval(function(){
			rotateValue--;
			$(".switch_meter .pointer .pointer_roate").css("transform","rotate("+rotateValue+"deg)");
			if(rotateValue<=rotateEndValue){
				clearInterval(timer);
			}
		},20)
	}
	
}
//邮箱指针转动
function oilPointerRotate(oilEndValue){
	if(timer){
		clearInterval(timer);
	}
	var timer=setInterval(function(){
		oilValue++;
		$(".switch_meter .pointer .pointer_oil").css("transform","rotate(-"+oilValue+"deg)");
		if(oilValue>=oilEndValue){
			clearInterval(timer);
		}
	},5);
}
//水温表转动
function warte(){
	
}
//指针初始化
function pointerInitialize(){
	if(timer_r){
		clearInterval(timer_r);
	}
	if(timer_o){
		clearInterval(timer_o);
	}
	var timer_r=setInterval(function(){
		rotateValue--;
		$(".switch_meter .pointer .pointer_roate").css("transform","rotate("+rotateValue+"deg)");
		if(rotateValue<=0){
			clearInterval(timer_r);
		}
	},20);
	var timer_o=setInterval(function(){
		oilValue--;
		$(".switch_meter .pointer .pointer_oil").css("transform","rotate(-"+oilValue+"deg)");
		if(oilValue<=0){
			clearInterval(timer_o);
		}
	},5);
}
//点火开关面板开关
function openSwitchMeter(){
	//显示大面板
	$(".switch_meter .meter").removeClass("hideImportant");
	//隐藏小面板
	$(".switch_btn").addClass("hideImportant");
	//加上大面板的拖拽事件
	dragDiv();
	dragDiv_pedal();
}
//关闭点火面板按钮
function closeSwitchShowBtn(obj){
	$(".switch_btn").removeClass("hideImportant");
	closeDiv(obj);
}
//面板拖拽事件
function dragDiv(){
	//给新面板加上拖拽事件
	$(".dragSource").draggable({
		containment:".main",
		cursor:"move"
	})
}
//x方向上拖拽事件
function dragDiv_pedal(){
	//给新面板加上拖拽事件
	$(".pedal_brake").draggable({
		containment:".pedal",
		cursor:"move",
		axis:"y",
		drag:function(){
			var top=parseInt($(this).css("top"))*2;
			$(".pedal_brake").text(top);
		}
	})
	//给新面板加上拖拽事件
	$(".pedal_accelerator").draggable({
		containment:".pedal",
		cursor:"move",
		axis:"y",
		drag:function(){
			var top=parseInt($(this).css("top"))*2+16;
			$(".pedal_accelerator").text(top);
			//改变转速表指针角度(点火后才有)
			if((stalls==3)||(stalls==4)){
				rotatePointerRotate(top);
			}
		}
	})
}

//点火开关交互==========================================================================================================================
function lockStalls(){
	//设置状态码
	stalls=1;
	//旋转开关角度
	stallsAngle(stalls);
	//灯指针初始化
	lightAndPointerInitialize();
	//转速表指针初始化
	pointerInitialize();
	//电路图初始化
	lineAnimateInitialize();
	//原理图初始化
	principleAnimateInitializeQuick();
}
function accStalls(){
	//设置状态码
	stalls=2;
	//旋转开关角度
	stallsAngle(stalls);
	//灯指针初始化
	lightAndPointerInitialize();
	//转速表指针初始化
	pointerInitialize();
	//电路图初始化
	lineAnimateInitialize();
	//原理图初始化
	principleAnimateInitializeQuick();
	
}
function onStalls(){
	//如果是从lock和acc到on档
	if((stalls!=3)&&(stalls!=4)){
		//设置状态码
		stalls=3;
		//旋转开关角度
		stallsAngle(stalls);
		//灯全亮,再熄灭
		lightingThenLightOff();
		//转速表指针转动
		rotatePointerRotate(16);
		//油表指针转动
		oilPointerRotate(90);
		//电路图动画
		lineAnimate();
	}
}
function startStalls(obj){
	//没有点击过on或start时
	if((stalls!=3)&&(stalls!=4)){
		//灯全亮,再熄灭
		lightingThenLightOff();
		//转速表指针转动
		rotatePointerRotate(16);
		//油表指针转动
		oilPointerRotate(90);
		//电路图动画开始
		lineAnimate();
	}
	
	//旋转开关角度
	stallsAngle(stalls);
	$(obj).mouseup(function(){
		if(timer){
			clearTimeout(timer);
		}
		//回到on档位
		var timer=setTimeout("stallsAngle(3);",200);
		//没有点击过start时
		if(stalls!=4){
			//原理动画开始
			principleAnimate();
			//电路动画超过90度变红色（start开始水温表才上升）
			lineChargeColor("r");
		}
		//设置状态码
		stalls=4;
	})
}










