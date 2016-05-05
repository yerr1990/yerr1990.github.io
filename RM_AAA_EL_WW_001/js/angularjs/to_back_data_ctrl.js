//后台通信的控制器
mainModule.controller('toBackDataCtrl',['$scope','$state','$timeout','serviceData','xcjService','$rootScope',function($scope,$state,$timeout,serviceData,xcjService,$rootScope){
	//学习时间
	$scope.styTime=parseInt(0);
	//学习时间，小于2分钟的时间零头；

	var addTime=parseInt(1);

	var autoTime=function() {
		$timeout(function () {
			addTime += parseInt(1);
			//给改变全局时间
			allStudyTime=allStudyTime+parseInt(1);
			autoTime();
		}, 1000);
	}
	

	//第一步先获取后台数据======================================================================================================
	var pdata = JSON.parse(window.parent.document.getElementById("historyData").innerHTML);
	$scope.user = {
		domainName: pdata.data.domainName,
		userEmail: pdata.data.userEmail,
		token: pdata.token,
		sessionId: pdata.data.sessionId,
		courseName: pdata.data.courseName
	};
	
	var isFirst=xcjService.content.study.initStudyData($scope.user);

	//获取后台的数据对象
	function getData(){
		if(isFirst||(!xcjService.content.study.parame.character.param)||(!xcjService.content.study.parame.character.param.progress)){
			//开始计算零碎的时间
			autoTime();
			return;
		}
		var toBack=xcjService.content.study.parame.character.param.progress[0];
		//获取上次学习的时间
		$scope.styTime=parseInt(toBack.styTime)||0;
//		allStudyTime=parseInt(toBack.styTime)||0;
		//获取上次的具体历史记录数据（一个装满记录点的数组）
		var sHistory=toBack.styHistory;
		aHistory=sHistory.split("_");
		//清理出一个没有带时间戳的数组
		for(var i=0;i<=aHistory.length-1;i++){
			snapHistroy.push(aHistory[i].split("#")[0])
		}
		
		//开始计算零碎的时间
		autoTime();
	}
	getData();
	//每两分钟提交一次
	$rootScope.submitByTime=function(){
		$timeout(function(){
			//小于2分钟时间的置0；
			addTime=parseInt(0);
			//每隔120秒累加一次时间
			$scope.styTime=parseInt($scope.styTime)+parseInt(120);
			//提交后台
			$rootScope.SubmitHistory();
			//传给后台方法调用
			xcjService.content.study.commitStudyData();
			//回调
			$rootScope.submitByTime();
		},$.xcj.content.study.baseParame.setTime)
	}
	$rootScope.submitByTime();

	$rootScope.SubmitHistory=function(){

		//给要传给后台的json赋值
		//吧具体的历史记录数组传给后台（一个装满记录点的数组）
		//计算百分比
		percentPage=parseInt((deleRepeat(aHistory).length/nAllStudent)*100);
		if(percentPage>=100){
			percentPage=100;
			percentPage=percentPage.toString();
		}
		sHistory=aHistory.join("_");
		//存我自己要用的参数
		xcjService.content.study.parame.character.param={
			progress:[
				{
					styHistory:sHistory,
					percent:percentPage,
					styTime:$scope.styTime
				}
			]
		};
		//存入action
		xcjService.content.study.parame.character.action=sHistory;
		//把学习进度传给后台
		xcjService.content.study.parame.progress=percentPage;
		//把学习时间传给后台
		xcjService.content.study.parame.actionTime=$scope.styTime;
//		console.log(aHistory+"============="+$scope.styTime+"==========="+percentPage);
//		alert(xcjService.content.study.parame.actionTime)
	};
	$scope.isExitStudy=false;
	$rootScope.exitStudy=function(){
		//关闭模型
		$rootScope.exit();
		$scope.isExitStudy=true;
//		alert('退出提交');
		$rootScope.SubmitHistory();
		xcjService.content.study.parame.actionTime=parseInt(xcjService.content.study.parame.actionTime)+parseInt(addTime);
		xcjService.content.study.parame.character.param.progress[0].styTime=parseInt(xcjService.content.study.parame.character.param.progress[0].styTime)+parseInt(addTime);
		//关闭页面
		$.xcj.content.study.exit();
		CloseWindow();
	}
	window.onbeforeunload = function(){
		//记录数据
		if((!$scope.isExitStudy&&freshAllow)){
			//关闭模型
			$rootScope.exit();
			//alert('监听提交');
			$rootScope.SubmitHistory();
			xcjService.content.study.parame.actionTime=parseInt(xcjService.content.study.parame.actionTime)+parseInt(addTime);
			xcjService.content.study.parame.character.param.progress[0].styTime=parseInt(xcjService.content.study.parame.character.param.progress[0].styTime)+parseInt(addTime);
			//关闭后台通讯
//			$.xcj.content.study.exit();
			//不关闭后台通讯，仅仅提交后台数据
			xcjService.content.study.commitStudyData();
		}
		return; // 可以阻止关闭
	}
}])
