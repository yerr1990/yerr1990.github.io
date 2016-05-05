/**
 * @createDate   2015-08-13 下午05:28:38
 * @author       xie guoliang
 * @email        gl.xie@xiaochejiang.com
 * @version      1.0
 */
var memory = []; //存模板  方面返回时用
obdscanModule.controller('obdscanCtrl', function ($scope, $timeout,$interval,pageService,obdscanService,dashboardService) {
	//添加诊断仪
	$scope.obdscanServiceZdata=obdscanService.Zdata;
	$scope.obdscanServiceMout=obdscanService.Mout;
	$scope.obdscanServiceMint=obdscanService.Mint;
	$interval(function(){
		$scope.obdscanServiceZdata=obdscanService.Zdata;
		$scope.obdscanServiceMout=obdscanService.Mout;
		$scope.obdscanServiceMint=obdscanService.Mint;
		/*$scope.obdscanServiceMint.In1OBD_x_ClearCode_x_x=obdscanServiceMint.In1OBD_x_ClearCode_x_x// 故障码已清除

		obdscanServiceMout.Out1Sen_MAF_THA_x_x// P0110 进气温度电路故障

		obdscanServiceMout.Out1Sen_MAF_THALow_x_x// P0112 进气温度电路低输入

		obdscanServiceMout.Out1Sen_MAF_THAHign_x_x// P0113 进气温度电路高输入

		obdscanServiceMout.Out1Sen_MAF_Code_x_x// P0100 质量或体积空气流量电路

		obdscanServiceMout.Out1Sen_MAF_Low_x_x// P0102 质量或体积空气流量电路低输入

		obdscanServiceMout.Out1Sen_MAF_High_x_x// P0103 质量或体积空气流量电路高输入

		obdscanServiceMout.Out1Sen_PVSV_Circuit_x_x// P0443 燃油蒸气排放控制系统清污控制阀电路

		obdscanServiceMout.Out1Sen_APP_DCircuit_x_x// P2120 节气门/ 踏板位置传感器/ 开关“D”电路

		obdscanServiceMout.Out1Sen_APP_DLow_x_x// P2122 节气门/ 踏板位置传感器/ 开关“D”电路低输入

		obdscanServiceMout.Out1Sen_APP_DHigh_x_x// P2123 节气门/ 踏板位置传感器/ 开关“D”电路高输入

		obdscanServiceMout.Out1Sen_APP_E_x_x// P2125 节气门/ 踏板位置传感器/ 开关“E”电路

		obdscanServiceMout.Out1Sen_APP_ELow_x_x// P2127 节气门/ 踏板位置传感器/ 开关“E”电路低输入

		obdscanServiceMout.Out1Sen_APP_EHigh_x_x// P2128 节气门/ 踏板位置传感器/ 开关“E”电路高输入

		obdscanServiceMout.Out1Sen_APP_DandEVltCorr_x_x// P2138 节气门/ 踏板位置传感器/ 开关“D” / “E”电压相关性

		obdscanServiceMout.Out1Sen_APP_DPerf_x_x// P2121 节气门/ 踏板位置传感器/ 开关“D”电路范围/ 性能

		obdscanServiceMout.Out1Sen_AF_Low_x_x// P0031 氧 (A/F) 传感器加热器控制电路低电位 (B1 S1)

		obdscanServiceMout.Out1Sen_AF_Hign_x_x// P0032 氧 (A/F) 传感器加热器控制电路高电位 (B1 S1)

		obdscanServiceMout.Out1Sen_AF_SignalThick_x_x// P2196 氧 (A/F) 传感器信号始终偏浓 (B1 S1)

		obdscanServiceMout.Out1Sen_AF_SignalThin_x_x// P2195 氧 (A/F) 传感器信号始终偏稀 (B1 S1)

		obdscanServiceMout.Out1Sen_AF_PumpCurr_x_x// P2237 氧 (A/F) 传感器泵电流电路/ 断路 (B1 S1)

		obdscanServiceMout.Out1Sen_AF_PumpCurrLow_x_x// P2238 氧 (A/F) 传感器泵电流电路低电位 (B1 S1)

		obdscanServiceMout.Out1Sen_AF_PumpCurrHigh_x_x// P2239 氧 (A/F) 传感器泵电流电路高电位 (B1 S1)

		obdscanServiceMout.Out1Sen_AF_GNDLow_x_x// P2252 氧 (A/F) 传感器参考搭铁电路低电位 (B1 S1)

		obdscanServiceMout.Out1Sen_AF_GNDHighLow_x_x// P2253 氧 (A/F) 传感器参考搭铁电路高电位 (B1 S1)

		obdscanServiceMout.Out1Sen_AF_ResSlow_x_x// P2A00 A/F 传感器电路响应迟缓 (B1 S1)

		obdscanServiceMout.Out1Sen_TPS_ACircuit_x_x// P0120 节气门/ 踏板位置传感器/ 开关“A”电路故障

		obdscanServiceMout.Out1Sen_TPS_ALow_x_x// P0122 节气门/ 踏板位置传感器/ 开关“A”电路低输入

		obdscanServiceMout.Out1Sen_TPS_AHigh_x_x// P0123 节气门/ 踏板位置传感器/ 开关“A”电路高输入

		obdscanServiceMout.Out1Sen_TPS_BCircuit_x_x// P0220 节气门/ 踏板位置传感器/ 开关“B”电路

		obdscanServiceMout.Out1Sen_TPS_BLow_x_x// P0222 节气门/ 踏板位置传感器/ 开关“B”电路低输入

		obdscanServiceMout.Out1Sen_TPS_BHigh_x_x// P0223 节气门/ 踏板位置传感器/ 开关“B”电路高输入

		obdscanServiceMout.Out1Sen_TPS_ABVltCorr_x_x// P2135 节气门/ 踏板位置传感器/ 开关“A” / “B”电压相关性

		obdscanServiceMout.Out1Sen_TPS_APerf_x_x// P0121 节气门/ 踏板位置传感器/ 开关“A”电路范围/ 性能故障

		obdscanServiceMout.Out1Sen_TPS_MLow_x_x// P2102 节气门执行器控制电动机电路低电位

		obdscanServiceMout.Out1Sen_TPS_MHigh_x_x// P2103 节气门执行器控制电动机电路高电位

		obdscanServiceMout.Out1Sen_TPS_MCtrlOpenPos_x_x// P2111 节气门执行器控制系统 - 卡在打开位置

		obdscanServiceMout.Out1Sen_TPS_MCtrlClosePos_x_x// P2112 节气门执行器控制系统 - 卡在关闭位置

		obdscanServiceMout.Out1Sen_TPS_MPerf_x_x// P2118 节气门执行器控制电动机电流范围/ 性能

		obdscanServiceMout.Out1Sen_TPS_MPerf1_x_x// P2119 节气门执行器控制节气门体范围/ 性能

		obdscanServiceMout.Out1Sen_Cool_x_x_x// P0115 发动机冷却液温度电路故障

		obdscanServiceMout.Out1Sen_Cool_Low_x_x// P0117 发动机冷却液温度电路低输入

		obdscanServiceMout.Out1Sen_Cool_High_x_x// P0118 发动机冷却液温度电路高输入

		obdscanServiceMout.Out1Sen_Cool_Perf_x_x// P0116 发动机冷却液温度电路范围/ 性能故障

		obdscanServiceMout.Out1Sen_ICAM_x_x_x// P0340 凸轮轴位置传感器电路故障

		obdscanServiceMout.Out1Sen_ICAM_ALow_x_x// P0342 凸轮轴位置传感器“A”电路低输入（B1 或单个传感器）

		obdscanServiceMout.Out1Sen_ICAM_AHigh_x_x// P0343 凸轮轴位置传感器“A”电路高输入（B1 或单个传感器）

		obdscanServiceMout.Out1Sen_ECAM_x_x_x// P0365 凸轮轴位置传感器“B”电路 (B1)

		obdscanServiceMout.Out1Sen_ECAM_BLow_x_x// P0367 凸轮轴位置传感器“B”电路低输入 (B1)

		obdscanServiceMout.Out1Sen_ECAM_BHigh_x_x// P0368 凸轮轴位置传感器“B”电路高输入 (B1)

		obdscanServiceMout.Out1Sen_4Cyl_Misfire_x_x// P0304 检测到 4 号气缸缺火

		obdscanServiceMout.Out1Sen_3Cyl_Misfire_x_x// P0303 检测到 3 号气缸缺火

		obdscanServiceMout.Out1Sen_2Cyl_Misfire_x_x// P0302 检测到 2 号气缸缺火

		obdscanServiceMout.Out1_1Cyl_Misfire_Code// P0301 检测到 1 号气缸缺火

		obdscanServiceMout.Out1Sen_ManyCyl_Misfire_x_x// P0300 检测到随机/ 多个气缸缺火

		obdscanServiceMout.Out1Sen_System_TooThin_x_x// P0171 系统过稀 (B1)

		obdscanServiceMout.Out1Sen_IC_ConnOne_x_x// P0351 点火线圈“A”初级/ 次级电路

		obdscanServiceMout.Out1Sen_IC_ConnTwo_x_x// P0352 点火线圈“B”初级/ 次级电路

		obdscanServiceMout.Out1Sen_IC_ConnThree_x_x// P0353 点火线圈“C”初级/ 次级电路

		obdscanServiceMout.Out1Sen_IC_ConnFour_x_x// P0354 点火线圈“D”初级/ 次级电路

		obdscanServiceMout.Out1Sen_Crank_x_x_x// P0035 曲轴位置传感器“A”电路

		obdscanServiceMout.Out1Sen_Knock_1BHigh_x_x// P0328 爆震传感器 1 电路高输入 （B1 或单个传感器）

		obdscanServiceMout.Out1Sen_Knock_1BLow_x_x// P0327 爆震传感器 1 电路低输入 （B1 或单个传感器）

		obdscanServiceMout.Out1Sen_Oxgen_HeatCtrlLow_x_x// P0037 氧传感器加热器控制电路低电位 (B1 S2)

		obdscanServiceMout.Out1Sen_CAM_Aactutor_x_x// P0010 凸轮轴位置 “A”执行器电路 (B1)

		obdscanServiceMout.Out1Sen_CAM_AtimAdv_x_x// P0011 凸轮轴位置 “A” - 正时过于提前或系统性能 (B1)

		obdscanServiceMout.Out1Sen_CAM_Bactutor_x_x// P0013 凸轮轴位置 “B”执行器电路 / 断路 (B1)

		obdscanServiceMout.Out1Sen_CAM_BtimAdv_x_x// P0014 凸轮轴位置 “B” - 正时过于提前或系统性能 (B1)
*/
	},1);
	$scope.obdscan = function () {
		//禁止弹出两次诊断仪
		if(diagnosticStay==1){
			return;
		}
		//加上触发样式
		$(".right-diagnostic").parent().addClass("active");
		//加上诊断仪使用状态码
		diagnosticStay=1;
		//记录进度
		recordHistory("A009");
		
		
		obdscanService.Zdata.obdscanStatus = true;
		$scope.isPower = false;
		$("#mask-obdscan").draggable({    //示波仪的拖动
			handle: ".mask-obdscan",
			containment: ".main",
			scroll: false,
			cursor: "move",
			iframeFix: true,
			drag: function (event) {

			}
		});
		$scope.obdscanServiceZdata.url = "framework/obdscan/template/obdscan/obdscanMenu.html";
		obdscanService.Zdata.url = "framework/obdscan/template/obdscan/obdscanMenu.html";

	};
	//动作测试弹出层的拖动
	$scope.ationTestPop = function () {
		$( ".draghandle" ).draggable({
			handle: "",
			containment: "#obsanbody",
			scroll: false,
			cursor: "move",
			iframeFix: true,
			drag:function(event) {

			}
		});

	};
	//关闭动作测试里面的弹出层
	$scope.colsedPoplayer=function(name){
           $(name).hide();
	};
	//关闭诊断仪
	$scope.closedobdscan = function () {
		//设置工具栏目状态万用表
		$("#zdy").removeClass("selected");
		$("#zdy").children("img").attr("src","images/zdyunSelect.png");

		obdscanService.Zdata.obdscanStatus = false;
		$scope.obdscanServiceZdata.url = "framework/obdscan/template/obdscan/obdscanMenu.html";
		obdscanService.Zdata.url = "framework/obdscan/template/obdscan/obdscanMenu.html";
		
		//去除右侧工具栏的触发状态
		$(".right-diagnostic").parent().removeClass("active");
		//去除诊断仪使用状态码
		diagnosticStay=0;
		//关闭诊断仪供电
		$scope.obdscanPower();
		//强行关上遮罩
		$scope.obdscanServiceZdata.isPower=false;
	};

	/*诊断仪的菜单操作*/
	$scope.changeTemplate = function (type, page,clear) {
		/*//继电器故障
		if(pageService.Pdata.faultType=="SBT_FCO_ES_ES_007_false") {
			if (type == "obdscan2" && pageService.Pdata.bjk_dyb && pageService.Pdata.bjc_bxsZong) {
				pageService.Pdata.addAction('IG002');
				pageService.Pdata.addOnScore('IG002');
			}
			if (type == "obdscan3" && pageService.Pdata.bjk_dyb && pageService.Pdata.bjc_bxsZong) {
				pageService.Pdata.addAction('IG003');
				pageService.Pdata.addOnScore('IG003');
			}
			if (!pageService.Pdata.bjk_dyb && type == "sbycur" && !pageService.Pdata.bjc_bxsZong) {
				pageService.Pdata.addAction('IG020');
				pageService.Pdata.addOnScore('IG020');
			}
			if (!pageService.Pdata.bjk_dyb && type == "sby1" && !pageService.Pdata.bjc_bxsZong) {
				pageService.Pdata.addAction('IG021');
				pageService.Pdata.addOnScore('IG021');
			}
		}
		//进气歧管故障
		else if(pageService.Pdata.faultType=="jq") {
			if (type == "sbycur" && pageService.Pdata.bjk_jqqg) {//更换前
				pageService.Pdata.addAction('jq002');
				pageService.Pdata.addOnScore('jq002');
			}
			else if (type == "obdscan3" && pageService.Pdata.bjk_jqqg) {
				pageService.Pdata.addAction('jq003');
				pageService.Pdata.addOnScore('jq003');
			}
			//修复后
			else if (type == "sbycur" && !pageService.Pdata.bjk_jqqg) {//读取故障码
				pageService.Pdata.addAction('jq017');
				pageService.Pdata.addOnScore('jq017');
			}
			else if (type == "sby1" && !pageService.Pdata.bjk_jqqg) {//清除故障码
				pageService.Pdata.addAction('jq030');
				pageService.Pdata.addOnScore('jq030');
			}
			else if (type == "obdscan3" && !pageService.Pdata.bjk_jqqg) {//读取数据流
				pageService.Pdata.addAction('jq029');
				pageService.Pdata.addOnScore('jq029');
			}
		}
			//爆震传感器故障
		else if(pageService.Pdata.faultType=="SBT_FCO_ES_ES_004"){
				if(type == "sbycur" && pageService.Pdata.bjk_bz) {//更换前
					pageService.Pdata.addAction('bz002');
					pageService.Pdata.addOnScore('bz002');
				}
				else if(type == "obdscan3" && pageService.Pdata.bjk_bz){
					pageService.Pdata.addAction('bz003');
					pageService.Pdata.addOnScore('bz003');
				}
				//修复后
				else if(type == "sbycur" && !pageService.Pdata.bjk_bz){//读取故障码
					pageService.Pdata.addAction('bz006');
					pageService.Pdata.addOnScore('bz006');
				}
				else if(type == "sby1" && !pageService.Pdata.bjk_bz){//清除故障码
					pageService.Pdata.addAction('bz007');
					pageService.Pdata.addOnScore('bz007');
				}

		}
		//发动机控制系统(氧传感)故障
		else if(pageService.Pdata.faultType=="SBT_FCO_ES_ES_001_false"){
				if(type == "sbycur" && pageService.Pdata.bjk_qycgq) {//更换前
					pageService.Pdata.addAction('fdj002');
					pageService.Pdata.addOnScore('fdj002');
				}
				else if(type == "obdscan3" && pageService.Pdata.bjk_qycgq){
					pageService.Pdata.addAction('fdj003');
					pageService.Pdata.addOnScore('fdj003');
				}
				//修复后
				else if(type == "sbycur" && !pageService.Pdata.bjk_qycgq){//读取故障码
					pageService.Pdata.addAction('fdj015');
					pageService.Pdata.addOnScore('fdj015');
				}
				else if(type == "sby1" && !pageService.Pdata.bjk_qycgq){//清除故障码
					pageService.Pdata.addAction('fdj027');
					pageService.Pdata.addOnScore('fdj027');
				}

		}*/

		$.each(memory, function (index, value) {
			if (value == page) {
				memory.splice($.inArray(page, memory), 1);  //判断模板数组是否存在，如存在删除
			}
		});
		memory.push(page);//，添加模板
		$scope.obdscanServiceZdata.url = "framework/obdscan/template/obdscan/" + type + ".html";
		if(type=="obdscan2"){
			if(obdscanService.Zdata.obdscanOpen){
				$scope.obdscanServiceZdata.url = "framework/obdscan/template/obdscan/" + type + ".html";
			}else{
				$scope.obdscanServiceZdata.url = "framework/obdscan/template/obdscan/guzhang.html";
			}
		}
		if(clear==0){
			
			//记录数据(清故障码这套系统不需要)
//			recordHistory("clearCode");
			obdscanService.Mint.In1OBD_x_ClearCode_x_x="1";
//			console.log(obdscanService.Mint.In1OBD_x_ClearCode_x_x);
			$timeout(function() {
				obdscanService.Mint.In1OBD_x_ClearCode_x_x = "0";
//				console.log(obdscanService.Mint.In1OBD_x_ClearCode_x_x);
			}, 500)
		}
		if(type=="actiontest"){
			$timeout(function(){
				$scope.ationTestPop();
			},1000);
		}
		//读取故障码时记录
//		if(type=='sbycur'&&page=='obdscan2'&&clear=='1'){
//			//记录进度
//			recordHistory("A022");
//		}

		//读取数据流时记录
//		if(type=='obdscan5'&&page=='obdscan2'&&clear=='1'){
//			//记录进度
//			recordHistory("A021");
//		}
	};

	//诊断仪的返回
	$scope.obdscanReturn = function () {
//		alert(memory)
		var obj = memory.pop();
		if(!obj){
			return;
		}
//		alert(obj)
//		if(((dashboardService.Dint.In1IgnKey_x_LOCK_x_x=='1')||(dashboardService.Dint.In1IgnKey_x_ACC_x_x=='1'))&&(!obj)){
//			obj='car';
//			memory=['obdscanMenu']
//		}
//		alert(obj)
		if (obj) {
			$scope.obdscanServiceZdata.url = "framework/obdscan/template/obdscan/" + obj + ".html";
			obdscanService.Zdata.url = "framework/obdscan/template/obdscan/" + obj + ".html";
		} else {
			$scope.obdscanServiceZdata.url = "framework/obdscan/template/obdscan/obdscanMenu.html";
			obdscanService.Zdata.url = "framework/obdscan/template/obdscan/obdscanMenu.html";
		}
	};

	//诊断仪的加电
	$scope.obdscanPower = function () {
		$scope.obdscanServiceZdata.isPower=!obdscanService.Zdata.isPower;
		$scope.obdscanServiceZdata.url = "framework/obdscan/template/obdscan/obdscanMenu.html";
		obdscanService.Zdata.url = "framework/obdscan/template/obdscan/obdscanMenu.html";
		//清空返回历史
		memory = [];
		//$scope.obdscanServiceZdata.isPower=obdscanService.Zdata.isPower=!obdscanService.Zdata.isPower;
	};
	//tabMenu 菜单
	$scope.tabMenu = function (type,target) {
		$('.tab_menu li').removeClass("selected");
		$(target).addClass("selected");
		obdscanService.Zdata.tabBox1=false;
		obdscanService.Zdata.tabBox2=false;
		obdscanService.Zdata.tabBox3=false;
		if(type=="tab1"){
			obdscanService.Zdata.tabBox1=true;
		}
		else if(type=="tab2"){
			obdscanService.Zdata.tabBox2=true;
		}
		else if(type=="tab3"){
			obdscanService.Zdata.tabBox3=true;
		}
	 };
	$scope.actionTest = function (type,layer) {
		obdscanService.Zdata.actionType=type;
		obdscanService.Zdata.layerType=layer;
	};
	//设置Service参数
	var setServiceData=function(){
		switch (obdscanService.Zdata.actionType){
			case "py":
				var value=$(".tk-1-text").text();
				obdscanService.Mint.In1OBD_x_CtrlInjVol_x_x=value;
				break;
			case "jqzstjf":
				var value=$(".tk-5-text").text();
				obdscanService.Mint.In1OBD_x_CtrlVVTLinear_x_x=value;
				break;
			case "pqzstjf":
				var value=$(".tk-5-text").text();
				obdscanService.Mint.In1OBD_x_CtrlVVTExLinear_x_x=value;
				break;
			case "krbcgq":
				var value=$(".tk-2-text").text();
				obdscanService.Mint.In1OBD_x_CtrlInjVolforAF_x_x=value;
				break;
			case "tgdcf":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ActiVsvEvap_x_x=value=='off' ? "1" :"2";
				break;
			case "ryb":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_CtrlTCandTE1_x_x=value=='off' ? "1" :"2";
				break;
			case "lqfs":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ElecCoolFan_x_x=value=='off' ? "1" :"2";
				break;
			case "qdjdq":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ActiStRelay_x_x=value=='off' ? "1" :"2";
				break;
			case "jqm":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_EtcsOpClSlowSpeed_x_x=value=='close' ? "1" :"2";
				break;
			case "qgdy"://?
				var value=$(".tk-4-text").text();
				obdscanService.Mint.In1OBD_x_SeleCylFuelCut_x_x=value=='off' ? "1" :"2";

				break;
			case "SLTdcf":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ActiSolenoldSLT_x_x=value=='off' ? "1" :"2";
				break;
			case "S1dcf":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ActiSolenoldS1_x_x=value=='off' ? "1" :"2";
				break;
			case "S2dcf":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ActiSolenoldS2_x_x=value=='off' ? "1" :"2";
				break;
			case "szdcf":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ActiLockUp_x_x=value=='off' ? "1" :"2";
				break;
			case "SLdcf":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ActiSolenoldSL_x_x=value=='off' ? "1" :"2";
				break;
			case "hdw":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ShiftPosition_x_x=value=='off' ? "1" :"2";
				break;
			case "STdcf":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ActiSolenoldST_x_x=value=='off' ? "1" :"2";
				break;

		}

	};
	//弹出层调节器
	$scope.leftAdjust=function(tmep,cs){
		$('.tk-1-zuo').css('background','url("framework/obdscan/images/pylces/6.png")');
		$('.tk-1-you').css('background','url("framework/obdscan/images/pylces/4.png")');
		if(tmep=='tmp1'){
			var val=parseFloat($(".tk-1-gun").css("left"));
			var left=val > 158 ? val-6:val;
			var text=parseFloat($(".tk-1-text").text());
			var adjust=(text-2).toFixed(2)>-12.5 ? (text-2).toFixed(2):-12.5;
			$(".tk-1-gun").css("left",function(){return left+"px";} );
			$(".tk-1-text").text(adjust+"%");
			setServiceData();
		}
		else if(tmep=='tmp2'){
			var val=parseFloat($(".tk-5-gun").css("left"));
			var left=val > 158 ? val-4:val;
			var text=parseFloat($(".tk-5-text").text());
			var adjust=text-10>-128 ? text-10:-128;
			$(".tk-5-gun").css("left",function(){return left+"px";} );
			$(".tk-5-text").text(adjust);
			setServiceData();
		}
	};
	$scope.rightAdjust=function(temp,cs){
		$('.tk-1-you').css('background','url("framework/obdscan/images/pylces/7.png")');
		$('.tk-1-zuo').css('background','url("framework/obdscan/images/pylces/5.png")');
		if(temp=='tmp1') {
			var val = parseFloat($(".tk-1-gun").css("left"));
			var left = val < 242 ? val + 4 : val;
			var text = parseFloat($(".tk-1-text").text());
			var adjust = (text + 2).toFixed(2) < 24.8 ? (text + 2).toFixed(2) : 24.8;
			$(".tk-1-text").text(adjust + "%");
			$(".tk-1-gun").css("left", function () {
				return left + "px";
			});
			setServiceData();
		}
		else if(temp=='tmp2'){
			var val = parseFloat($(".tk-5-gun").css("left"));
			var left = val < 242 ? val + 4 : val;
			var text=parseFloat($(".tk-5-text").text());
			var adjust=text+10<127 ? text+10:127;
			$(".tk-5-gun").css("left",function(){return left+"px";});
			$(".tk-5-text").text(adjust);
			setServiceData();
		}
	};




	$scope.adjustData = function (num) {
		if(num=='-12.5'){
			$('.tk-2-zuo').css('background','url("framework/obdscan/images/krbcgq/zuo_2.png")');
			$('.tk-2-zhong').css('background','url("framework/obdscan/images/krbcgq/zhong.png")');
			$('.tk-2-you').css('background','url("framework/obdscan/images/krbcgq/you.png")');
		}else if(num=='0'){
			$('.tk-2-zuo').css('background','url("framework/obdscan/images/krbcgq/zuo.png")');
			$('.tk-2-zhong').css('background','url("framework/obdscan/images/krbcgq/zhong_2.png")');
			$('.tk-2-you').css('background','url("framework/obdscan/images/krbcgq/you.png")');
		}else if(num=='12.5'){
			$('.tk-2-zuo').css('background','url("framework/obdscan/images/krbcgq/zuo.png")');
			$('.tk-2-zhong').css('background','url("framework/obdscan/images/krbcgq/zhong.png")');
			$('.tk-2-you').css('background','url("framework/obdscan/images/krbcgq/you_2.png")');
		}
		$(".tk-2-text").text(num+"%");
	 };

	$scope.switchBtn=function(type,str){
		setServiceData();
		if(type=='tk3'&&str=='off'){
			$('.tk-3-zuo').css('background','url("framework/obdscan/images/tgdcf/zuo-2.png")');
			$('.tk-3-you').css('background','url("framework/obdscan/images/tgdcf/you.png")');
		}else if(type=='tk3'&&str=='on'){
			$('.tk-3-zuo').css('background','url("framework/obdscan/images/tgdcf/zuo.png")');
			$('.tk-3-you').css('background','url("framework/obdscan/images/tgdcf/you-2.png")');
		}else if(type=='tk4'&&str=='off'){
			$('.tk-4-zuo').css('background','url("framework/obdscan/images/qgan/zuo-2.png")');
			$('.tk-4-you').css('background','url("framework/obdscan/images/qgan/you.png")');
		}else if(type=='tk4'&&str=='on'){
			$('.tk-4-zuo').css('background','url("framework/obdscan/images/qgan/zuo.png")');
			$('.tk-4-you').css('background','url("framework/obdscan/images/qgan/you-2.png")');
		}

		if(type=="tk3"){
			if(obdscanService.Zdata.actionType=="jqm"){
				var tm=str=="off" ? "close" : "open";
				$(".tk-3-text").text(tm);
			}
			else{
				$(".tk-3-text").text(str);
			}
		}
		else if(type=="tk4"){$(".tk-4-text").text(str);}

	};
	$scope.setInitVal=function(num){
		if(num==1){
			$('.shu1').css('background','url("framework/obdscan/images/qgan/8.png")');
			$('.shu1').siblings().css('background','url("framework/obdscan/images/qgan/9.png")');

		}
		else if(num==2){
			$('.shu2').css('background','url("framework/obdscan/images/qgan/8.png")');
			$('.shu2').siblings().css('background','url("framework/obdscan/images/qgan/9.png")');
		}
		else if(num==3){
			$('.shu3').css('background','url("framework/obdscan/images/qgan/8.png")');
			$('.shu3').siblings().css('background','url("framework/obdscan/images/qgan/9.png")');
		}
		else if(num==4){
			$('.shu4').css('background','url("framework/obdscan/images/qgan/8.png")');
			$('.shu4').siblings().css('background','url("framework/obdscan/images/qgan/9.png")');
		}
		else if(num==5){
			$('.shu5').css('background','url("framework/obdscan/images/qgan/8.png")');
			$('.shu5').siblings().css('background','url("framework/obdscan/images/qgan/9.png")');
		}
		else if(num==6){
			$('.shu6').css('background','url("framework/obdscan/images/qgan/8.png")');
			$('.shu6').siblings().css('background','url("framework/obdscan/images/qgan/9.png")');
		}
		else if(num==7){
			$('.shu7').css('background','url("framework/obdscan/images/qgan/8.png")');
			$('.shu7').siblings().css('background','url("framework/obdscan/images/qgan/9.png")');
		}
		else if(num==8){
			$('.shu8').css('background','url("framework/obdscan/images/qgan/8.png")');
			$('.shu8').siblings().css('background','url("framework/obdscan/images/qgan/9.png")');
		}
		obdscanService.Mint.In1OBD_x_SeleCylFuelCutNum_x_x=num;
	}

	/*$scope.obdscanPfefeower = function () {
		alert();
	};*/



});
