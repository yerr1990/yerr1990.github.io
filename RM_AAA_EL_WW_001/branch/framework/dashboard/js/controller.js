/**
 * @createDate   2015-08-13 下午05:28:38
 * @author       xie guoliang
 * @email        gl.xie@xiaochejiang.com
 * @version      1.0
 */
var dashboardModule = angular.module('dashboardModule', []);

/*加载诊断仪的模板*/
dashboardModule.run(function ( $templateCache) {
	$templateCache.put("dashboardTemplate", "template/switchMeter.html");
});

dashboardModule.directive("dashboard", function ($templateCache) {
	return {
		restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
		templateUrl: $templateCache.get("dashboardTemplate"),
		replace: false //是否用模板替换当前元素，若为false，则append在当前元素上
	}
});

dashboardModule.controller('dashboardCtrl',['$scope','$rootScope','$timeout','$interval','dashboardService','obdscanService','pageService',function($scope,$rootScope,$timeout,$interval,dashboardService,obdscanService,pageService){
	//点火仪表盘的ng-include的src初始值
	$scope.switchMeterSrc='framework/_dashboard/template/switchMeter.html';
	$scope.dashboardServiceDdata = dashboardService.Ddata;
	$scope.dashboardServiceDint = dashboardService.Dint;
	$scope.dashboardServiceDout = dashboardService.Dout;
	$rootScope.isRun=0;
//	$scope.pageServiceMint = pageService.Mint;
	//用来控制表盘显示器显示
	$scope.dashboardShowmonitor = false;
	
	var timerDashBoardPointer;
//点火面板动画=====================================================================
//旋转开关角度
	$scope.stallsAngle =function(target,stall){
		if((stalls==4)&&(stall==3)){
			//如果已经点火了，就不允许点击on状态了
			stalls=4;
			return;
		}else{
			//把传过来的参数传给控制变量
			stalls=stall;
		}
		
		dashboardService.Ddata.dashboarstalls=stalls;
//		alert(dashboardService.Ddata.dashboarstalls);
		//仪表指针
		if((stalls==3)||(stalls==4)){
			if(timerDashBoardPointer){$interval.cancel(timerDashBoardPointer);}
			timerDashBoardPointer=$interval(function() {
				if (dashboardService.Dout.Out1Sen_x_CoolantTemp_x_x >= 40 && dashboardService.Dout.Out1Sen_x_CoolantTemp_x_x < 121) {
					$(".pointer-water").css("transform", "rotate(" + ((dashboardService.Dout.Out1Sen_x_CoolantTemp_x_x - 40) * 1.8) + "deg)");
				} else if (dashboardService.Dout.Out1Sen_x_CoolantTemp_x_x < 40) {
					$(".pointer-water").css("transform", "rotate(0deg)");
				} else if (dashboardService.Dout.Out1Sen_x_CoolantTemp_x_x > 120) {
					$(".pointer-water").css("transform", "rotate(120deg)");
				}
				//转速指针旋转
//				console.log(parseInt(dashboardService.Dout.Out1EngM_x_EngSpeed_x_x));
				$(".pointer-roate").css("transform", "rotate(" + parseInt(dashboardService.Dout.Out1EngM_x_EngSpeed_x_x / 40) + "deg)");
				//车速指针旋转
				$(".pointer-speed").css("transform", "rotate(" + parseInt(dashboardService.Dout.Out1EngM_x_VehSpeed_x_x * 1.1) + "deg)");
				
				/*//系统电路四条线的闪动传参数
				if(lineFlashNo==1){
					pageService.Mint.In1Sens_Inj_No1_2_x='1';
					pageService.Mint.In1Sens_Inj_No2_2_x='0';
					pageService.Mint.In1Sens_Inj_No3_2_x='0';
					pageService.Mint.In1Sens_Inj_No4_2_x='0';
				}else if(lineFlashNo==2){
					pageService.Mint.In1Sens_Inj_No1_2_x='0';
					pageService.Mint.In1Sens_Inj_No2_2_x='0';
					pageService.Mint.In1Sens_Inj_No3_2_x='1';
					pageService.Mint.In1Sens_Inj_No4_2_x='0';
				}else if(lineFlashNo==3){
					pageService.Mint.In1Sens_Inj_No1_2_x='0';
					pageService.Mint.In1Sens_Inj_No2_2_x='0';
					pageService.Mint.In1Sens_Inj_No3_2_x='0';
					pageService.Mint.In1Sens_Inj_No4_2_x='1';
				}else if(lineFlashNo==4){
					pageService.Mint.In1Sens_Inj_No1_2_x='0';
					pageService.Mint.In1Sens_Inj_No2_2_x='1';
					pageService.Mint.In1Sens_Inj_No3_2_x='0';
					pageService.Mint.In1Sens_Inj_No4_2_x='0';
				}else if(lineFlashNo==0){
					pageService.Mint.In1Sens_Inj_No1_2_x='0';
					pageService.Mint.In1Sens_Inj_No2_2_x='0';
					pageService.Mint.In1Sens_Inj_No3_2_x='0';
					pageService.Mint.In1Sens_Inj_No4_2_x='0';
				}*/
//				console.log(pageService.Mint.In1Sens_Inj_No1_2_x+"=="+pageService.Mint.In1Sens_Inj_No2_2_x+"=="+pageService.Mint.In1Sens_Inj_No3_2_x+"=="+pageService.Mint.In1Sens_Inj_No4_2_x)
			}, 40);
			$(".pointer-oil").css("transform","rotate(-80deg)");
		}else{
			$interval.cancel(timerDashBoardPointer);
			pageService.Mint.In1Sens_Inj_No1_2_x='0';
			pageService.Mint.In1Sens_Inj_No2_2_x='0';
			pageService.Mint.In1Sens_Inj_No3_2_x='0';
			pageService.Mint.In1Sens_Inj_No4_2_x='0';
		}

		if(dashboardService.Ddata.dashboarstalls==1){
			$(".key").css("transform","rotate(0deg)");
			$(".pointer-water").css("transform","rotate(0deg)");
			//转速指针旋转
			$(".pointer-roate").css("transform","rotate(0deg)");
			//转速指针旋转
			$(".pointer-speed").css("transform","rotate(0deg)");
			//转速指针旋转
			$(".pointer-oil").css("transform","rotate(0deg)");
			obdscanService.Zdata.obdscanOpen=false;
			//控制诊断仪页面显示
			if(obdscanService.Zdata.url!="framework/obdscan/template/obdscan/car.html"&&obdscanService.Zdata.url!="framework/obdscan/template/obdscan/obdscanMenu.html"){
				obdscanService.Zdata.url = "framework/obdscan/template/obdscan/guzhang.html";
				memory=['obdscanMenu','car'];
			}
			dashboardService.Dint.In1IgnKey_x_LOCK_x_x= '1',//	点火钥匙LOCK档位
			dashboardService.Dint.In1IgnKey_x_ACC_x_x= '0',//	点火钥匙ACC档位
			dashboardService.Dint.In1IgnKey_x_ON_x_x= '0',//	点火钥匙ON档位
			dashboardService.Dint.In1IgnKey_x_START_x_x= '0'//	点火钥匙START档位
			//让踏板归零
			$(".pedal-accelerator").css("top","0px");
			$(".pedal-accelerator").text(parseInt($(".pedal-accelerator").css("top"))+16);
			$(".pedal-brake").css("top","0px");
			$(".pedal-brake").text(parseInt($(".pedal-brake").css("top"))*2);
			//模型也初始化
			dashboardService.Dint.In1Sen_APP_NO1_x_x="16";
			dashboardService.Dint.In1Sen_x_BrakeSig_x_x="0";

			$rootScope.isRun=0;
			isRunAnimate=0;			
//			//原理图 初始化
			principleAnimateInitialize();
//			//电路图 初始化
			$rootScope.circuitAnimateInitialize();
			
//			//隐藏表盘显示器
			$scope.dashboardShowmonitor=false;
		}else if(dashboardService.Ddata.dashboarstalls==2){
			$(".key").css("transform","rotate(50deg)");
			$(".pointer-water").css("transform","rotate(0deg)");
			//转速指针旋转
			$(".pointer-roate").css("transform","rotate(0deg)");
			//转速指针旋转
			$(".pointer-speed").css("transform","rotate(0deg)");
			//转速指针旋转
			$(".pointer-oil").css("transform","rotate(0deg)");
			obdscanService.Zdata.obdscanOpen=false;
			//控制诊断仪页面显示
			if(obdscanService.Zdata.url!="framework/obdscan/template/obdscan/car.html"&&obdscanService.Zdata.url!="framework/obdscan/template/obdscan/obdscanMenu.html"){
				obdscanService.Zdata.url = "framework/obdscan/template/obdscan/guzhang.html";
				memory=['obdscanMenu','car'];
			}
			dashboardService.Dint.In1IgnKey_x_LOCK_x_x= '0',//	点火钥匙LOCK档位
			dashboardService.Dint.In1IgnKey_x_ACC_x_x= '1',//	点火钥匙ACC档位
			dashboardService.Dint.In1IgnKey_x_ON_x_x= '0',//	点火钥匙ON档位
			dashboardService.Dint.In1IgnKey_x_START_x_x= '0'//	点火钥匙START档位
			//让踏板归零
			$(".pedal-accelerator").css("top","0px");
			$(".pedal-accelerator").text(parseInt($(".pedal-accelerator").css("top"))+16);
			$(".pedal-brake").css("top","0px");
			$(".pedal-brake").text(parseInt($(".pedal-brake").css("top"))*2);
			//模型也初始化
			dashboardService.Dint.In1Sen_APP_NO1_x_x="16";
			dashboardService.Dint.In1Sen_x_BrakeSig_x_x="0";

			$rootScope.isRun=0;
//			//原理图初始化
			isRunAnimate=0;
			principleAnimateInitialize();
			//电路图 初始化
			$rootScope.circuitAnimateInitialize();
			
			//隐藏表盘显示器
			$scope.dashboardShowmonitor=false;
		}else if(dashboardService.Ddata.dashboarstalls==3){
			$(".key").css("transform","rotate(90deg)");
			obdscanService.Zdata.obdscanOpen=true;
			//控制诊断仪页面显示
			if(obdscanService.Zdata.url=="framework/obdscan/template/obdscan/guzhang.html"){
				obdscanService.Zdata.url = "framework/obdscan/template/obdscan/car.html";
				memory=['obdscanMenu']
			}
			dashboardService.Dint.In1IgnKey_x_LOCK_x_x= '0',//	点火钥匙LOCK档位
			dashboardService.Dint.In1IgnKey_x_ACC_x_x= '0',//	点火钥匙ACC档位
			dashboardService.Dint.In1IgnKey_x_ON_x_x= '1',//	点火钥匙ON档位
			dashboardService.Dint.In1IgnKey_x_START_x_x= '0'//	点火钥匙START档位
			//显示表盘显示器
			$scope.dashboardShowmonitor=true;
			
//			//执行系统原理动画(给了执行口令，开始执行动画才能执行)

//			//系统原理 On状态动画
			principleAnimateOn();
//			//系统电路 On状态动画
			circuitAnimateOn();
			//on状态
			isRunAnimate=1;
			$rootScope.isRun=1;
			//
			if($(".btn-active").hasClass("mist")){
				$scope.miststalls(1);
			}
			if($(".btn-active").hasClass("int")){
				$scope.intstalls()
			}
			if($(".btn-active").hasClass("lo")){
				$scope.loStalls()
			}
			if($(".btn-active").hasClass("hi")){
				$scope.hiStalls()
			}
			if($(".btn-active").hasClass("spray")){
				$scope.waterStalls(1)
			}
			//记录进度
			recordHistory('A006');
			
			
			
		}else if(dashboardService.Ddata.dashboarstalls==4){
			$(".pointer-oil").css("transform","rotate(-80deg)");
			$(".key").css("transform","rotate(140deg)");
			obdscanService.Zdata.obdscanOpen=true;
			//控制诊断仪页面显示
			if(obdscanService.Zdata.url=="framework/obdscan/template/obdscan/guzhang.html"){
				obdscanService.Zdata.url = "framework/obdscan/template/obdscan/car.html";
				memory=['obdscanMenu']
			}
			dashboardService.Dint.In1IgnKey_x_LOCK_x_x= '0',//	点火钥匙LOCK档位
			dashboardService.Dint.In1IgnKey_x_ACC_x_x= '0',//	点火钥匙ACC档位
			dashboardService.Dint.In1IgnKey_x_ON_x_x= '0',//	点火钥匙ON档位
			dashboardService.Dint.In1IgnKey_x_START_x_x= '1'//	点火钥匙START档位
			//显示表盘显示器
			$scope.dashboardShowmonitor=true;
			
			//故障1时的动画 长按start
			//goMalfunctionStartDown();
			
			target.onmouseup=function(){
				if(dashboardService.Ddata.dashboarstalls==4){
					$timeout(function () {
						dashboardService.Dint.In1IgnKey_x_LOCK_x_x= '0',//	点火钥匙LOCK档位
						dashboardService.Dint.In1IgnKey_x_ACC_x_x= '0',//	点火钥匙ACC档位
						dashboardService.Dint.In1IgnKey_x_ON_x_x= '1',//	点火钥匙ON档位
						dashboardService.Dint.In1IgnKey_x_START_x_x= '0'//	点火钥匙START档位
		
						$(".key").css("transform","rotate(90deg)");
						
						//故障1时的动画 松开start
						//goMalfunctionStartUp();
						target.onmouseout=null;
						target.onmouseup=null;
					},100)
				}
			}
			target.onmouseout=function(){
				if(dashboardService.Ddata.dashboarstalls==4){
					$timeout(function () {
						dashboardService.Dint.In1IgnKey_x_LOCK_x_x= '0',//	点火钥匙LOCK档位
						dashboardService.Dint.In1IgnKey_x_ACC_x_x= '0',//	点火钥匙ACC档位
						dashboardService.Dint.In1IgnKey_x_ON_x_x= '1',//	点火钥匙ON档位
						dashboardService.Dint.In1IgnKey_x_START_x_x= '0'//	点火钥匙START档位
		
						$(".key").css("transform","rotate(90deg)");
						
						//故障1时的动画 松开start
						//goMalfunctionStartUp();
						target.onmouseout=null;
						target.onmouseup=null;
					},100)
				}
			}
			
			//系统原理 Start状态动画
			principleAnimateStart();
			//系统电路 Start状态动画
			circuitAnimateStart();
//			//执行系统原理动画(给了执行口令，开始执行动画才能执行,这里是为了预防点不着火的交互)
			isRunAnimate=2;
			$rootScope.isRun=1;
			//
			if($(".btn-active").hasClass("mist")){
				$scope.miststalls(1);
			}
			if($(".btn-active").hasClass("int")){
				$scope.intstalls()
			}
			if($(".btn-active").hasClass("lo")){
				$scope.loStalls()
			}
			if($(".btn-active").hasClass("hi")){
				$scope.hiStalls()
			}
			if($(".btn-active").hasClass("spray")){
				$scope.waterStalls(1)
			}
			
			//记录进度
			recordHistory('A007');
			
		}else{
			stalls=1;
			$(".key").css("transform","rotate(0deg)");
			$(".pointer-water").css("transform","rotate(0deg)");
			//转速指针旋转
			$(".pointer-roate").css("transform","rotate(0deg)");
			//转速指针旋转
			$(".pointer-speed").css("transform","rotate(0deg)");
			//转速指针旋转
			$(".pointer-oil").css("transform","rotate(0deg)");
			obdscanService.Zdata.obdscanOpen=false;
		}
//		console.log(stalls)
	}
//灯全亮,再熄灭
	$scope.lightingThenLightOff=function (){
		$(".switch-meter .meter .light .transparent").removeClass("transparent");
		$timeout(function(){
			$(".switch-meter .meter .light img").not(".monitor").addClass("transparent");
		},2000);
	}
//灯指针初始化
	$scope.lightAndPointerInitialize=function (){
		$(".switch-meter .meter .light").addClass("transparent");
	};
//点火开关面板开关
	$scope.openSwitchMeter=function (){
//		//显示大面板
//		dashboardService.Ddata.dashboardStatus=true;
//		//隐藏小面板
//		dashboardService.Ddata.dashboarSmaill=false;
		//加上大面板的拖拽事件
		$scope.dragDiv();
		$scope.dragDivPedal();
		//转速指针旋转
		if(dashboardService.Dout.Out1Sen_x_CoolantTemp_x_x>=40&&dashboardService.Dout.Out1Sen_x_CoolantTemp_x_x<121){
		$(".pointer-water").css("transform","rotate("+((dashboardService.Dout.Out1Sen_x_CoolantTemp_x_x-40)*1.8)+"deg)");
		}else if(dashboardService.Dout.Out1Sen_x_CoolantTemp_x_x<40){
			$(".pointer-water").css("transform","rotate(0deg)");
		}else if(dashboardService.Dout.Out1Sen-x_CoolantTemp_x_x>120){
			$(".pointer-water").css("transform","rotate(120deg)");
		}
		//转速指针旋转
		$(".pointer-roate").css("transform","rotate("+(dashboardService.Dout.Out1EngM_x_EngSpeed_x_x/36)+"deg)");
		//转速指针旋转
		$(".pointer-speed").css("transform","rotate("+(dashboardService.Dout.Out1EngM_x_VehSpeed_x_x*1.1)+"deg)");
		//转速指针旋转
//		$(".pointer_oil").css("transform","rotate(-80deg)");
	};
//关闭点火面板按钮
	$scope.closeSwitchShowBtn=function (obj){
//		//显示大面板
//		dashboardService.Ddata.dashboardStatus=false;
//		//隐藏小面板
//		dashboardService.Ddata.dashboarSmaill=true;
		if(dashboardService.Ddata.dashboarstalls==1){
			$(".key").css("transform","rotate(0deg)");

		}else if(dashboardService.Ddata.dashboarstalls==2){
			$(".key").css("transform","rotate(50deg)");
		}else if(dashboardService.Ddata.dashboarstalls==3||dashboardService.Ddata.dashboarstalls==4){
			$(".key").css("transform","rotate(90deg)");
		}
	}
//面板拖拽事件

	//面板拖拽事件
	$scope.dragDiv=function (){
		//给新面板加上拖拽事件
		$(".dragSource").draggable({
			containment:".main",
			cursor:"move"
//			drag:function(){
//				$(document).bind("mouseup",function(){console.log(stalls+"======"+"aaaaaa")
//					if(dashboardService.Ddata.dashboarstalls==4){
//						$timeout(function () {
//							dashboardService.Dint.In1IgnKey_x_LOCK_x_x= '0',//	点火钥匙LOCK档位
//							dashboardService.Dint.In1IgnKey_x_ACC_x_x= '0',//	点火钥匙ACC档位
//							dashboardService.Dint.In1IgnKey_x_ON_x_x= '1',//	点火钥匙ON档位
//							dashboardService.Dint.In1IgnKey_x_START_x_x= '0'//	点火钥匙START档位
//			
//							$(".key").css("transform","rotate(90deg)");
//							console.log(stalls+"======"+"bbbbbb")
//							//故障1时的动画 松开start
//							goMalfunctionStartUp();
//							$(this).unbind("mouseup")
//						},100)
//					}else{
//						$(this).unbind("mouseup")
//					}
//				})
//			}
		})
	}
//x方向上拖拽事件
	$scope.dragDivPedal=function (){
		//给新面板加上拖拽事件
		$(".pedal-brake").draggable({
			containment:".pedal",
			cursor:"move",
			axis:"y",
			drag:function(){
				var top=parseInt($(this).css("top"))*2;
				dashboardService.Dint.In1Sen_x_BrakeSig_x_x=top.toString();
				$(".pedal-brake").text(top);
			}
		})
		//给新面板加上拖拽事件
		$(".pedal-accelerator").draggable({
			containment:".pedal",
			cursor:"move",
			axis:"y",
			drag:function(){
				var top=parseInt($(this).css("top"))*2+16;
				dashboardService.Dint.In1Sen_APP_NO1_x_x=top.toString();
				$(".pedal-accelerator").text(top);
			}
		})
	}
}])

