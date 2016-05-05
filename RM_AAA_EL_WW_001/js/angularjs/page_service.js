mainModule.service('pageService',function(){
	var pageService={}
	//页面版本号（每套软教具要记得更新，相对于的版本号可咨询模型组）
	pageService.SysVersion="1.0.0.0";
	//页面数据
	pageService.Mdata={
		showOrHide:{
			circuitOrPrinciple:false,//显示哪一个界面(false显示系统电路，true显示系统原理)-----------------
			alertContain:false,//系统弹出框（即左侧导航点击时出现的导航框）
			
			principleAlertOne:false,//系统原理图中弹出框（电动车窗总开关）--------------------
			principleAlertTwo:false,//系统原理图中弹出框（左后车门电动车窗开关）
			principleAlertThree:false,//系统原理图中弹出框（右前门电动车窗开关）
			principleAlertFour:false,//系统原理图中弹出框（驾驶员侧电动机）
			principleAlertFive:false,//系统原理图中弹出框（右前侧电动机）
			principleAlertSix:false,//系统原理图中弹出框（左后侧电动机）
	//		principleAlerSeven:false,//系统原理图中弹出框（遥控器接收器）
	//		principleAlertEight:false,//系统原理图中弹出框（门锁ECU）
			
			circuitAlertOne:false,//系统电路图中弹出框（电动车窗总开关）
			circuitAlertTwo:false,//系统电路图中弹出框（右前门电动车窗开关）
			circuitAlertThree:false,//系统电路图中弹出框（左后车门电动车窗开关）
			circuitAlertFour:false,//系统电路图中弹出框（驾驶员侧电动机）
			circuitAlertFive:false,//系统电路图中弹出框（右前侧电动机）
			circuitAlertSix:false,//系统电路图中弹出框（左后侧电动机）
			
			principleFail:false,//系统原理图失效模式显示隐藏------------------
			circuitFail:false,//系统电路图失效模式显示隐藏
			
			principlePlace:false,//系统原理图车上位置显示隐藏-----------------
			circuitPlace:false,//系统电路图车上位置显示隐藏
			
			principleComponent:false,//系统原理图元件检测显示隐藏---------------
			circuitComponent:false,//系统原理图元件检测显示隐藏
			
			principleAlertOneComponent:false,//系统原理图元件测量（门锁控制开关）
			principleAlertTwoComponent:false,//系统原理图元件测量（门锁总成）
			principleAlertThreeComponent:false,//系统原理图元件测量（钥匙插入识别开关）
			principleAlertFourComponent:false,//系统原理图元件测量（门控灯开关）
			principleAlertFiveComponent:false,//系统原理图元件测量（车门锁芯）
			
			circuitAlertOneComponent:false,//系统电路图元件测量（门控灯开关）
			circuitAlertTwoComponent:false,//系统电路图元件测量（门锁总成）
			circuitAlertThreeComponent:false,//系统电路图元件测量（钥匙插入识别开关）
			circuitAlertFourComponent:false,//系统电路图元件测量（门控灯开关）
			
			alertLinkPrincipleInfo:false,//结构原理  下  系统原理  单独页面的显示(使用不同模板)
			alertLinkComponentsInfo:false,//结构原理  下  系统组成 单独页面的显示(使用不同模板)
			alertLinkMeasuringInfo:false,//诊断测量  下  元件测量  单独页面的显示(使用不同模板)
			
			workState:true,//工作状态标示码（true表示正常状态，false表示故障状态）
			ResistanceWarn:false,//是否显示禁止测电阻弹出框
			doorSwitchPanel:false,//是否显示门控开关面板
			wifiSwitchPanel:false,//是否显示遥控器面板
			keySwitchPanel:false,//是否显示车门锁面板
			//------------------------------------------------------------------------------
			bShowFooter:true,//是否显示下面的进入故障和故障清除按钮
			//如果回答正确则显示相应的提示;
			answerCurrect:false,
			answerWrong:false,
			//进入检测与清除故障
			isGoCheck:false,//是否允许进入检测
			isGoClear:false,//是否允许清除故障
			
			//页面中点击图出现弹出框中  元件检测  车上位置  和  失效模式  置灰变量(false置灰，true不置灰)
			alertComponent:true,
			alertPlace:true,
			alertFail:true,
			
			//原理页面中点击图出现弹出框中  元件检测  车上位置  和  失效模式  触发状态(false不触发，true触发)
			principleAlertComponentActive:false,
			principleAlertPlaceActive:false,
			principleAlertFailActive:false,
			
			//电路页面中点击图出现弹出框中  元件检测  车上位置  和  失效模式  触发状态(false不触发，true触发)
			circuitAlertComponentActive:false,
			circuitAlertPlaceActive:false,
			circuitAlertFailActive:false,

			//驾驶侧车窗显示手动自动的
			window1AutoOrManu:false
		},
		//所有用于改变页面内容的数据
		chargeData:{
			principlePlaceImgSrc:"",//在系统原理界面中车上位置图片的地址（用于换图图片）--------------------
			circuitPlaceImgSrc:"",//在系统电路界面中车上位置图片的地址（用于换图图片）
			principleComponentSrc:"template/router_template/principle_component.html",//系统原理中元件测量地址------------
			circuitComponentSrc:"template/router_template/circuit_component.html",//系统电路中元件测量地址
			principleFailSrc:"template/router_template/principle_fail.html",//系统原理中失效模式地址----------------------
			circuitFailSrc:"template/router_template/circuit_fail.html",//系统原理中失效模式地址
			circuitBg:"template/router_template/circuit_svg.html",//系统电路的svg地址
			//车上位置使用的图片
			placeImgSrc:['images/alert_position_1.png',
						 'images/alert_position_2.png',
						 'images/alert_position_3.png',
						 'images/alert_position_4.png',
						 'images/alert_position_5.png',
						 'images/alert_position_6.png',
						 'images/alert_position_7.png',
						 'images/alert_position_8.png'],
			//左侧导航中的字符串
			aNaviBlock:['结构原理','诊断测量','故障排除','知识拓展','技能测试'],
			
			//主界面的ng-include的src初始值
			systemCircuitSrc:'template/circuit.html',
			systemPrincipleSrc:'template/principle.html',
			
			//题目内容的对象，每道题是一个对象，对象中包含了这道题的数据
			jQuestion:{},
			
		}
	}
	
	
	
	
	
	
	
	
	
	
	pageService.Mint={
		In1_x_Engine_x_fre: "1",//发动机频率
		In1_x_Multi_x_fre: "5",//万用表频率
		In1_x_ObdScan_x_fre: "5",//诊断仪
		In1_x_Dashboard_x_fre: "5",//仪表频率
		In1_x_Sensor_x_fre: "5",//传感器频率
		In1_x_Voice_x_fre: "5",//声音频率

		In1ERV_High_Gear_x_Fault:'1',//电动车窗驾驶员侧车门ECU通信故障
		In1ERV_Low_Button_x_x:'0',//雨刷系统低速按钮
		In1ERV_High_Button_x_x:'0',//雨刷系统高速按钮
		In1ERV_OFF_Button_x_x:'1',//雨刷系统OFF按钮
		In1ERV_INT_Button_x_x:'0',//雨刷系统间歇按钮
		In1ERV_MIST_Button_x_x:'0',//雨刷系统除雾按钮
		In1ERV_Water_Button_x_x:'0',//雨刷系统喷水按钮
		In1ERV_Wiper_Sport_x_x:'0',//雨刷运动参数
		In1ERV_MIST_Button_x_Test:'0',//MlST：除雾测量按钮
		In1ERV_OFF_Button_x_Test:'1',//OFF：雨刮停止
		In1ERV_INT_Button_x_Test:'0',//INT ：间歇测量按钮
		In1ERV_Low_Button_x_Test:'0',//LO：低速测量按钮
		In1ERV_High_Button_x_Test:'0',//HI：高速测量按钮
		In1ERV_Water_Button_x_Test:'0'//喷水测量按钮




	}
	return pageService;
})
