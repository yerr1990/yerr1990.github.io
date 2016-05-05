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

//start档的定时器
var timerIgnitionStartUp;

//诊断仪的控制器
dashboardModule.controller('dashboardCtrl',['$scope','$rootScope','$timeout','$interval','dashboardService','obdscanService','pageService',function($scope,$rootScope,$timeout,$interval,dashboardService,obdscanService,pageService){

	//点火仪表盘的ng-include的src初始值
	$scope.switchMeterSrc='framework/dashboard/template/switchMeter.html';
	$scope.dashboardServiceDdata = dashboardService.Ddata;
	$scope.dashboardServiceDint = dashboardService.Dint;
	$scope.dashboardServiceDout = dashboardService.Dout;
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
		//档位判断的参数赋值
		dashboardService.Ddata.dashboarstalls=stalls;
		if(dashboardService.Ddata.dashboarstalls==1){
			//钥匙旋转
			$(".key").css("transform","rotate(0deg)");
			//诊断仪页面关闭
			obdscanService.Zdata.obdscanOpen=false;
			//控制诊断仪页面显示
			if(obdscanService.Zdata.url!="framework/obdscan/template/obdscan/car.html"&&obdscanService.Zdata.url!="framework/obdscan/template/obdscan/obdscanMenu.html"){
				obdscanService.Zdata.url = "framework/obdscan/template/obdscan/guzhang.html";
				memory=['obdscanMenu','car'];
			}
			//模型传档位参数
			dashboardService.Dint.In1IgnKey_x_LOCK_x_x= '1',//	点火钥匙LOCK档位
			dashboardService.Dint.In1IgnKey_x_ACC_x_x= '0',//	点火钥匙ACC档位
			dashboardService.Dint.In1IgnKey_x_ON_x_x= '0',//	点火钥匙ON档位
			dashboardService.Dint.In1IgnKey_x_START_x_x= '0'//	点火钥匙START档位
			//隐藏表盘显示器
			$scope.dashboardShowmonitor=false;
				
			closeIgnitionLineAnimate();	
			
			
		}else if(dashboardService.Ddata.dashboarstalls==2){
			//钥匙旋转
			$(".key").css("transform","rotate(50deg)");
			//诊断仪页面关闭
			obdscanService.Zdata.obdscanOpen=false;
			//控制诊断仪页面显示
			if(obdscanService.Zdata.url!="framework/obdscan/template/obdscan/car.html"&&obdscanService.Zdata.url!="framework/obdscan/template/obdscan/obdscanMenu.html"){
				obdscanService.Zdata.url = "framework/obdscan/template/obdscan/guzhang.html";
				memory=['obdscanMenu','car'];
			}
			//模型传档位参数
			dashboardService.Dint.In1IgnKey_x_LOCK_x_x= '0',//	点火钥匙LOCK档位
			dashboardService.Dint.In1IgnKey_x_ACC_x_x= '1',//	点火钥匙ACC档位
			dashboardService.Dint.In1IgnKey_x_ON_x_x= '0',//	点火钥匙ON档位
			dashboardService.Dint.In1IgnKey_x_START_x_x= '0'//	点火钥匙START档位
			//隐藏表盘显示器
			$scope.dashboardShowmonitor=false;
			
			closeIgnitionLineAnimate();
			
			
		}else if(dashboardService.Ddata.dashboarstalls==3){
			//钥匙旋转
			$(".key").css("transform","rotate(90deg)");
			//诊断仪页面关闭
			obdscanService.Zdata.obdscanOpen=true;
			//控制诊断仪页面显示
			if(obdscanService.Zdata.url=="framework/obdscan/template/obdscan/guzhang.html"){
				obdscanService.Zdata.url = "framework/obdscan/template/obdscan/car.html";
				memory=['obdscanMenu']
			}
			//模型传档位参数
			dashboardService.Dint.In1IgnKey_x_LOCK_x_x= '0',//	点火钥匙LOCK档位
			dashboardService.Dint.In1IgnKey_x_ACC_x_x= '0',//	点火钥匙ACC档位
			dashboardService.Dint.In1IgnKey_x_ON_x_x= '1',//	点火钥匙ON档位
			dashboardService.Dint.In1IgnKey_x_START_x_x= '0'//	点火钥匙START档位
			//显示表盘显示器
			$scope.dashboardShowmonitor=true;
			
			//点火的线路动画
			openIgnitionLineAnimate(circuitAnimateTime);
			
			
			//记录进度
			recordHistory('A006');
		}else if(dashboardService.Ddata.dashboarstalls==4){
			//钥匙旋转
			$(".key").css("transform","rotate(140deg)");
			//模型传档位参数
//			dashboardService.Dint.In1IgnKey_x_LOCK_x_x= '0',//	点火钥匙LOCK档位
//			dashboardService.Dint.In1IgnKey_x_ACC_x_x= '0',//	点火钥匙ACC档位
//			dashboardService.Dint.In1IgnKey_x_ON_x_x= '0',//	点火钥匙ON档位
//			dashboardService.Dint.In1IgnKey_x_START_x_x= '1'//	点火钥匙START档位
			obdscanService.Zdata.obdscanOpen=true;
			//控制诊断仪页面显示
			if(obdscanService.Zdata.url=="framework/obdscan/template/obdscan/guzhang.html"){
				obdscanService.Zdata.url = "framework/obdscan/template/obdscan/car.html";
				memory=['obdscanMenu']
			}
			//显示表盘显示器
			$scope.dashboardShowmonitor=true;
			
			//销毁定时器
			if(timerIgnitionStartUp){$timeout.cancel(timerIgnitionStartUp)}
			target.onmouseup=function(){
				if(dashboardService.Ddata.dashboarstalls==4){
					timerIgnitionStartUp=$timeout(function () {
						dashboardService.Dint.In1IgnKey_x_LOCK_x_x= '0',//	点火钥匙LOCK档位
						dashboardService.Dint.In1IgnKey_x_ACC_x_x= '0',//	点火钥匙ACC档位
						dashboardService.Dint.In1IgnKey_x_ON_x_x= '1',//	点火钥匙ON档位
						dashboardService.Dint.In1IgnKey_x_START_x_x= '0'//	点火钥匙START档位
						//钥匙回到on档
						$(".key").css("transform","rotate(90deg)");
					},100)
				}
			}
			
			//点火的线路动画
			openIgnitionLineAnimate(circuitAnimateTime);
			
			
			//记录进度
			recordHistory('A007');			
		}else{
			stalls=1;
			$(".key").css("transform","rotate(0deg)");
			obdscanService.Zdata.obdscanOpen=false;
		}
	}
}])

