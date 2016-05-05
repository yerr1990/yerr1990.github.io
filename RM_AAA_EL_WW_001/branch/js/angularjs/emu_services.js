/**
 * @author Administrator
 */
var appService = angular.module('xcj.Service', [
					'xcj.validate'
		]);

	appService.factory('xcjService', function($http, $rootScope, $timeout,validateService) {

	$.xcj = $.xcj || {};

	$.xcj.content = $.xcj.content || {};

	$.xcj.content.study = $.xcj.content.study || {};

	/**
	 * 课件基础属性定义
	 */
	$.xcj.content.study.baseParame = {
		isAtive : true, //debug模式状态,类型: Boolean//日志统一方法
		isAuto : true, //是否自动提交数据状态,类型: Boolean
		autoTime : 0, //自动提交数据时间,毫秒-类型: Integer
		setTime:120000//自动提交的时间设置
	};
	
	/*
	 * 课件属性定义(和平台交互)
     */
	$.xcj.content.study.parame = {
		token : "", //token码,必填字段,类型: String
		courseNumber : "", //课件编号,必填字段,类型: String
		userEmail : "", //用户邮箱,必填字段,类型: String
		domainUsername : "", //域名称,必填字段,类型: String
		sessionId : "", //sessionId,必填字段,类型: String
		receive : "", //提交数据,类型: String
		character :{'action':"",'question':[],'param':{}} , //长字符串(传输数据用,可以为空),类型: String {'action':"",，‘question’：“”，'param':"characterC"}
		progress : 0, //进度,必填字段,类型: Integer
		score : 0, //得分,必填字段,类型: Integer
		isComplete : 1, //是否完成1完成;0未完成,必填字段,类型: Integer
		isPass : 1, //是否通过1通过;0未通过,必填字段,类型: Integer
		actionTime : 0
	};
//		console.log($.xcj.content.study.parame.character.param);
    /**
     * 验证测评属性
     */
    $.xcj.content.study.validaStudyData = function(){
	   	var parame = $.xcj.content.study.parame;
        if(validateService.checkString(parame.token,'token')
			&& validateService.checkString(parame.courseNumber,'courseNumber')
			&& validateService.checkString(parame.courseNumber,'courseNumber')
			&& validateService.isEmail(parame.userEmail,'userEmail')
			&& validateService.checkString(parame.domainUsername,'domainUsername')
			&& validateService.checkString(parame.sessionId,'sessionId')
			//&& validateService.checkString(parame.receive,'receive')
			//&& validateService.isString(parame.character,'character')
			//&&validateService.isNum(parame.progress,'progress')
			&&validateService.checkNumber(parame.score,'score')
			&&validateService.isPass(parame.isComplete,'isComplete')
			){
				return true;
        }
        return false;
    };

    /**
     * 初始化学习数据接口(第一次学习调用)
     */
    $.xcj.content.study.initStudyData = function(param){
		$.xcj.content.study.parame.userEmail=param.userEmail;
		$.xcj.content.study.parame.courseNumber=param.courseName;
		$.xcj.content.study.parame.domainUsername=param.domainName;
		$.xcj.content.study.parame.token=param.token;
		$.xcj.content.study.parame.sessionId=param.sessionId;
		if($.xcj.content.study.validaStudyData()){
			var init = content.study.startStudy($.xcj.content.study.parame.token,
				$.xcj.content.study.parame.courseNumber,
				$.xcj.content.study.parame.userEmail,
				$.xcj.content.study.parame.domainUsername,
				$.xcj.content.study.parame.sessionId);
//				console.log(JSON.stringify(init));
			if(init.errCode=="0"){
				if(init.data.characterC == null){
//					console.log("数据库里真的没有数据吗？好像是真的")
					//第一次学习
					//需要课件那边把所有章节赋值到characterC中？？？？？
					$.xcj.content.study.parame.actionTime = 0;
					$.xcj.content.study.parame.isComplete = 0;
					$.xcj.content.study.parame.isPass = 0;
					$.xcj.content.study.parame.score = 0;
					$.xcj.content.study.parame.progress = 0;
					$.xcj.content.study.parame.character = {};
					$.xcj.content.study.parame.receive = "";
					$.xcj.content.study.parame.actionTime = init.data.seconds;
					$.xcj.content.study.parame.character.param={
						progress:[
							{
								styHistory:'0',
								percent:'0',
								styTime:'0'
							}
						]
					};
					//存入缓存
//					$.cookie('toCookie', JSON.stringify(init));
					return true;
//					console.log(init.errMsg);
				}else{
					//非第一次学习
					$.xcj.content.study.parame.actionTime = init.data.seconds;
					$.xcj.content.study.parame.isComplete = init.data.isComplete;
					$.xcj.content.study.parame.isPass = init.data.isPass;
					//$.xcj.content.study.parame.score = 0;
					//$.xcj.content.study.parame.progress = init.data.topProgress;
					$.xcj.content.study.parame.character={};
					$.xcj.content.study.parame.character.param= JSON.parse(init.data.characterC);
					$.xcj.content.study.parame.receive = "";
					//存入缓存
//					$.cookie('toCookie', JSON.stringify(init));
					return false;
				}
			}else{
//				var fromCookie=JSON.parse($.cookie('toCookie'));
//				$.xcj.content.study.parame.actionTime = fromCookie.data.seconds;
//				$.xcj.content.study.parame.isComplete = fromCookie.data.isComplete;
//				$.xcj.content.study.parame.isPass = fromCookie.data.isPass;
//				//$.xcj.content.study.parame.score = 0;
//				//$.xcj.content.study.parame.progress = fromCookie.data.topProgress;
//				$.xcj.content.study.parame.character={};
//				$.xcj.content.study.parame.character.param= JSON.parse(fromCookie.data.characterC);
//				$.xcj.content.study.parame.receive = "";
//					console.log($.cookie('toCookie'));
				return false;
			}
    	}
    };

	/**
	 * 定时器，用于定时提交课件信息
	 */

	//setInterval($.xcj.content.study.autoCommitStudyData(),$.xcj.content.study.baseParame.autoTime);


     /**
     * 提交学习数据接口(课件学习和退出调用)
     */
    $.xcj.content.study.commitStudyData = function(){
		//$.xcj.content.study.parame.receive="提交";
		//计算进度方法
		//$.xcj.content.study.getStudyProgressData();

		//调用是否通过
		//$.xcj.content.study.getStudyCompleteData();
		//验证方法
		if($.xcj.content.study.validaStudyData()){
			 var data = $.extend(true, {}, $.xcj.content.study.parame);
			 data.character=JSON.stringify($.xcj.content.study.parame.character);
			var logs =	content.study.commitStudy(data);
//			 console.log(logs);
		}else{
//			console.log();
			//调用日志方法，输出错误日志
		}

    };

	/**
	 * 学习退出方法
	 * */
	$.xcj.content.study.exit=function(){
		$.xcj.content.study.parame.receive="退出";
		if($.xcj.content.study.validaStudyData()){
		 var data = $.extend(true, {}, $.xcj.content.study.parame);
		 data.character=JSON.stringify($.xcj.content.study.parame.character);
		 var logs = content.study.exitStudy(data);
//			 console.log(logs);
		}

//		var data = $.extend(true, {}, $.xcj.content.study.parame);
//		data.character=JSON.stringify($.xcj.content.study.parame.character);
//		var logs = content.study.exitStudy($.xcj.content.study.parame);
////		console.log(logs);
	};

    
	 /**
	 * 自动提交学习数据方法(定时2分钟自动调用)
	 */
	$.xcj.content.study.autoCommitStudyData = function(){
		if($.xcj.content.study.baseParame.isAuto){
			setInterval(function () {
				$.xcj.content.study.commitStudyData();
			}, $.xcj.content.study.baseParame.autoTime);
		}
	};
	/**
	 * 设置进度数组接口   ****
	 */
	$.xcj.content.study.setStudyProgressData=function(progress){
		//赋值
		var character = $.xcj.content.study.parame.character.param;
        for(var i=0;i<character.progress.length;i++){
			if(character.progress[i].postedId==progress.postedId){
				character.progress[i].status=progress.status;
				character.progress[i].score=progress.score;
				return ;
			}
		}

	};


	/**
	 * 设置charater属性
	 * */

	$.xcj.content.study.setCharacter=function(action,question,param){
		$.xcj.content.study.parame.character.action=action;
		$.xcj.content.study.parame.character.question=question;
		$.xcj.content.study.parame.character.param=param;
//		$.xcj.content.study.parame.character.param={
//			"progress": [
//				{
//					styHistory:'0',
//					percent:'0',
//					styTime:'0'
//				}
//			]
//		};
	};

	/**
	 * 计算进度方法
	 *
	 */
	$.xcj.content.study.getStudyProgressData = function(){
		//先验证
		var character=$.xcj.content.study.parame.character;
		var progress=character.param.progress;
		var question=character.question;
		if( progress.length > 0 && question!=undefined && question.length > 0 ){
			//计算progress
			var num=0;
			for( var i=0; i < progress.length; i++ ){
				if(progress[i].status=="true"){
					num=num+1;
				}
			}
			$.xcj.content.study.parame.progress=parseInt((num/progress.length)*100);
			//计算score
			$.xcj.content.study.parame.score=0;
			for( var j=0; j < question.length; j++ ){
				if(question[j].isRight=="1"){
					$.xcj.content.study.parame.score+=question[j].score;
				}
			}
		}
	};

	/**
	 * 计算是否完成和是否通过方法 ????
	 * */
	$.xcj.content.study.getStudyCompleteData=function(){
		//先验证
		var parame=$.xcj.content.study.parame;
		var complete=parame.character.param.complete;
		var pass=parame.character.param.pass;
		var score=parame.score;

		var baseParame = $.xcj.content.study.baseParame;
		if(validateService.isNum(complete) && validateService.isNum(pass)){
			$.xcj.content.study.parame.isComplete= parame.progress > complete ? 1 : 0;
			$.xcj.content.study.parame.isPass = score > pass ? 1 : 0;
			content.log($.xcj.content.study.parame.isComplete,$.xcj.content.study.parame.isPass);
		}
	};

	return $.xcj;

});
