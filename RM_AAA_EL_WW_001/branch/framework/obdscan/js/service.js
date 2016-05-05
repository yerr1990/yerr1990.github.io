/**
 * @author 谢国亮
 */
obdscanModule.service('obdscanService', function ($http, $rootScope, $timeout) {
    var obdscanService = obdscanService || {};
    obdscanService.Zdata = obdscanService.Zdata || {};
    obdscanService.Mint = obdscanService.Mint || {};
    obdscanService.Mout = obdscanService.Mout || {};
    obdscanService.Zdata = {
        url:'',
        obdscanStatus: false,
        tabBox1:true,
        tabBox2:false,
        tabBox3:false,
        obdscanOpen: false,
        layerType:"lay1",//动作测试类型弹出层
        actionType:"py",//发动机控制系统动作测试选项
        obdscanData:{
            "py":["喷油量测试",
                  "本测试选择喷油量从24.8%至-12.5%",
                   "-12.5:Min to24.8%Max ",
                   "在发动机转速不高于 3000 rpm ，冷却液温度不低于170F(77℃)并且过热保护装置关闭的情况下操作。"
             ],
            "krbcgq":[  //空燃比传感器测试
                "空燃比传感器测试",
                "本测试将喷油量在12.5%、0%至-12.5%间切换",
                " -12.5%:Min  ON:Normal  12.5%:Max",
                "在发动机转速不高于 3000 rpm ，冷却液温度不低于170F(77℃)并且过热保护装置关闭的情况下操作。"
            ],
            "tgdcf":[  //碳罐电磁阀测试
                "碳罐电磁阀测试",
                "本测试打开、关闭 EVAP净化VSV.",
                "ON:on  OFF:off",
                "在此测试过程中，仅EVAP VSV得到命令。"
            ],
            "ryb":[  //燃油泵测试
                "燃油泵测试",
                "本测试打开/关闭燃油泵控制。",
                "ON:on OFF:off",
                "在IG ON、发动机OFF、选档杆置于P或N的情况下操作"
            ],
            "lqfs":[ //冷却风扇测试
                "冷却风扇测试",
                "本测试打开/关闭电子冷却风扇.",
                "ON:on  OFF:off",
                "在IG ON、发动机OFF、选档杆置于P的情况下操作"
            ],
            "qdjdq":[  //起动继电器测试
                "起动继电器测试",
                "本测试打开/关闭起动继电器",
                "ON:on OFF:off",
                "在IG ON、发动机OFF、选档杆置于P的情况下操作"
            ],
            "jqm":[  //节气门开启/关闭测试
                "节气门开启/关闭测试",
                "本测试在怠速状态下打开和关闭电子节气门控制系统（ETCS）",
                "Open:Slow Speed Open  Close:Slow Speed Close",
                "在IG ON、发动机OFF、选档杆置于P,踩下加速踏板的情况下操作"
            ],
            "jqzstjf":[  //进气正时调节阀测试
                "进气正时调节阀测试",
                "本测试电磁阀占空比 B1 VVT从-128%至127% VVT 执行器 100% 运行时，发动机失速或怠速不稳。",
                " -128%：Min-127%:Max",
                "在IG ON、发动机ON 、选档杆置于P的情况下操作"
            ],
            "pqzstjf":[  //排气正时调节阀测试
                "排气正时调节阀测试",
                "本测试电磁阀占空比 B1 VVT从-128%至127% VVT 执行器 100% 运行时，发动机失速或怠速不稳。",
                " -128%：Min-127%:Max",
                "在IG ON、发动机ON 、选档杆置于P的情况下操作"
            ],
            "qgdy":[  //气缸断油测试
                "气缸断油测试",
                "本主动测试控制在怠速时气缸的燃油切断。本测试会使怠速不稳会这发动机失速。",
                "ON:Select Cylinder Fuel Cut  OFF:off",
                "在IG ON、发动机ON 、选档杆置于P的情况下操作"
            ],
            "SLTdcf":[  //SLT电磁阀测试
                "SLT电磁阀测试",
                "本测试打开/关闭 SLT电磁阀线圈.",
                "ON:on  OFF:off",
                "在IG ON 和发动机ON的情况下操作。"
            ],
            "S1dcf":[  //S1电磁阀测试
                "S1电磁阀测试",
                "本测试打开/关闭 S1电磁阀线圈.",
                "ON:on  OFF:off",
                "在IG ON 和发动机ON的情况下操作。"
            ],
            "S2dcf":[  //S2电磁阀测试
                "S2电磁阀测试",
                "本测试打开/关闭 S2电磁阀线圈.",
                "ON:on  OFF:off",
                "在IG ON 和发动机ON的情况下操作。"
            ],
            "szdcf":[  //锁止电磁阀测试
                "锁止电磁阀测试",
                "本测试打开/关闭锁止电磁阀线圈.",
                "ON:on  OFF:off",
                "在车辆不低于60km/h的情况下操作。"
            ],
            "SLdcf":[  //SL电磁阀测试
                "SL电磁阀测试",
                "本测试打开/关闭锁止电磁阀线圈.",
                "ON:on  OFF:off",
                "在IG ON 和发动机ON的情况下操作。"
            ],
            "hdw":[  //换挡位测试
                "换挡位测试",
                "本测试通过控制换档电磁阀改变车辆换挡杆位置。",
                "1st:first Shift-8th:Shift ",
                "在车速不高于45 km/h 的情况下操作。"
            ],
            "STdcf":[  //ST电磁阀测试
                "ST电磁阀测试",
                "本测试打开/关闭ST电磁阀.",
                "ON:on OFF:off",
                "[车辆状况] 点火开关置于 ON 位 置、发动机停止且换 档杆置于 P 或 N 时。"
            ]
          }

}

    obdscanService.Mint = {
        In1OBD_x_ClearCode_x_x: '0',//	清除故障码动作
        In1OBD_x_CtrlInjVol_x_x: '0',//	Control the Injection Volume
        In1OBD_x_CtrlInjVolforAF_x_x: '0',//	Control the Injection Voluse for A/F Sensor
        In1OBD_x_ActiVsvEvap_x_x: '0',//	Activate the VSV for Evap Control
        In1OBD_x_CtrlTCandTE1_x_x: '0',//	Control the TC and TE1
        In1OBD_x_FuelPumpSpeed_x_x: '0',//	Control the Fuel Pump / Speed
        In1OBD_x_IdleFuelCut_x_x: '0',//	Control the Idle Fuel Cut Prohibit
        In1OBD_x_ElecCoolFan_x_x: '0',//	Control the Electric Cooling Fan
        In1OBD_x_ActiStRelay_x_x: '0',//	Activate the Starter Relay
        In1OBD_x_AccCutRelay_x_x: '0',//	Activate the ACC Cut Relay
        In1OBD_x_EtcsOpClSlowSpeed_x_x: '0',//	Control the ETCS Open/Close Slow Speed
        In1OBD_x_EtcsOpClFastSpeed_x_x: '0',//	"Control the ETCS Open/Close Fast Speed"
        In1OBD_x_CtrlVVTLinear_x_x: '0',//	Control the VVT Linear (Bank 1)
        In1OBD_x_CtrlVVTSystem_x_x: '0',//	Control the VVT system (Bank 1)
        In1OBD_x_CtrlVVTExLinear_x_x: '0',//	Control the VVT Exhaust Linear (Bank 1)
        In1OBD_x_SeleCylFuelCut_x_x: '0',//	Control the Select Cylinder Fuel Cut
        In1OBD_x_AllCylFuelCut_x_x: '0',//	Control the All Cylinders Fuel Cut
        In1OBD_x_CylPressure_x_x: '0',//	Check the Cylinder Compression*1
        In1OBD_x_ActiSolenoldSLT_x_x: '0',//	Activate the Solenold(SLT)
        In1OBD_x_ActiSolenoldS1_x_x: '0',//	Activate the Solenold(S1)
        In1OBD_x_ActiSolenoldS2_x_x: '0',//	Activate the Solenold(S2)
        In1OBD_x_ActiLockUp_x_x: '0',//	Activate the Lock Up
        In1OBD_x_ActiSolenoldSL_x_x: '0',//	Activate the Solenold(SL)
        In1OBD_x_ShiftPosition_x_x: '0',//	Control the Shift Position
        In1OBD_x_ActiSolenoldST_x_x: '0'//	Activate the Solenold(ST)

    };
    obdscanService.Mout = {
        Out1EngM_x_VehSpeed_x_x: '0',//	车速
        Out1EngM_x_EngSpeed_x_x: '0',//	发动机转速
        Out1EngM_x_CalcLoad_x_x: '0',//	计算负荷
        Out1EngM_x_VehLoad_x_x: '0',//	整车负荷
        Out1EngM_x_MAF_x_x: '0',//	空气流量
        Out1EngM_x_AtmoPre_x_x: '0',//	大气压力
        Out1Sen_x_CoolantTemp_x_x: '0',//	冷却温度
        Out1Sen_x_IntakeAir_x_x: '0',//	进气温度
        Out1EngM_x_EngRunTime_x_x: '0',//	发动机运行时间
        Out1Sen_x_InitEngCoolTemp_x_x: '0',//	初始冷却温度
        Out1Sen_x_InitIntakeAirTemp_x_x: '0',//	初始进气温度
        Out1Sen_x_BattVolt_x_x: '0',//	电池电压
        Out1Sen_x_AccelSensNo1: '0',//	1#加速踏板绝对位置
        Out1Sen_x_AccelSensNo2: '0',//	2#加速踏板绝对位置
        Out1Sen_x_TpsSensorVlt_x_x: '0',//	1#节气门传感器位置
        Out1Sen_x_TpsSensor2Vlt_x_x: '0',//	2#节气门传感器位置
        Out1Sen_x_TpsIdlePosition_x_x: '0',//	节气门怠速位置
        Out1Sen_x_TpsReqPosition_x_x: '0',//	节气门请求位置
        Out1Sen_x_TpsSenPosition_x_x: '0',//	节气门绝对传感器位置
        Out1Sen_x_TpsPositionNo1_x_x: '0',//	1#节气门位置电压
        Out1Sen_x_TpsPositionNo2_x_x: '0',//	2#节气门位置电压
        Out1Sen_x_TpsPositionComm_x_x: '0',//	节气门位置信号命令
        Out1Sen_x_SensOpenPos1_x_x: '0',//	1#节气门开启位置
        Out1Sen_x_SensOpenPos2_x_x: '0',//	2#节气门开启位置
        Out1Sen_x_TpsMCurrent_x_x: '0',//	节气门执行器电流
        Out1Sen_x_TpsMDuty_x_x: '0',//	节气门电机占空比
        Out1Sen_x_TpsMDutyOpen_x_x: '0',//	节气门占空比（开启）
        Out1Sen_x_TpsMDutyClose_x_x: '0',//	节气门占空比（关闭）
        Out1Sen_x_TpsFuCloLearn_x_x: '0',//	节气门全关学习值
        Out1EngM_x_InjecPort_x_x: '0',//	1缸喷油时间
        Out1EngM_x_InjecVolCyl_x_x: '0',//	1缸喷油量
        Out1Sen_x_OPSpeedStatus_x_x: '0',//	燃油泵状态
        Out1EngM_x_EvapVSV_x_x: '0',//	EVAP净化VSV占空比
        Out1EngM_x_EvapPurFlow_x_x: '0',//	EVAP净化流量
        Out1EngM_x_PurDenLeaVal_x_x: '0',//	净化密度学习值
        Out1EngM_x_EvapPurgeVSV_x_x: '0',//	EVAP控制的VSV状态
        Out1EngM_x_TarAFRatio_x_x: '0',//	目标空燃比
        Out1EngM_x_AFLamB1S1_x_x: '0',//	实际空燃比
        Out1Sen_x_AFSVltB1S1_x_x: '0',//	空燃比电压
        Out1Sen_x_AFSCurrentB1S1_x_x: '0',//	空燃比电流
        Out1Sen_x_O2SB1S2_x_x: '0',//	加热型氧传感器电压
        Out1EngM_x_FuelSFT_x_x: '0',//	短期燃油修正
        Out1EngM_x_FuelLFT_x_x: '0',//	长期燃油修正
        Out1EngM_x_TotalFT1_x_x: '0',//	总燃油修正
        Out1Sen_x_FuelSysStatus1_x_x: '0',//	燃油系统状态1
        Out1Sen_x_FuelSysStatus2_x_x: '0',//	燃油系统状态2
        Out1EngM_x_IgnAdvance_x_x: '0',//	点火提前角
        Out1Sen_x_KnockFedbackVal_x_x: '0',//	爆震反馈值
        Out1Sen_x_KnockCorrLeaVal_x_x: '0',//	爆震校正学习值
        Out1Sen_x_CataTempB1S1_x_x: '0',//	催化器温度
        Out1Sen_x_CataTempB1S2_x_x: '0',//	催化器温度
        Out1Sen_x_StarterSig_x_x: '0',//	启动开关信号
        Out1Sen_x_StarterCtrl_x_x: '0',//	启动开关状态
        Out1Sen_x_PowSteerSig_x_x: '0',//	动力转向信号
        Out1Sen_x_StartRelay_x_x: '0',//	启动机继电器状态
        Out1Sen_x_PowStSigRec_x_x: '0',//	转向信号记录
        Out1Sen_x_ACCRelay_x_x: '0',//	ACC继电器状态
        Out1Sen_x_NeuPosSWSig_x_x: '0',//	空挡位置开关信号
        Out1Sen_x_StopLightSw_x_x: '0',//	制动灯开关信号
        Out1Sen_x_ACSignal_x_x: '0',//	A/C信号
        Out1Sen_x_CloseTpsPosSw_x_x: '0',//	关闭阀门位置状态
        Out1Sen_x_FuelCutCond_x_x: '0',//	燃油切断状态
        Out1Sen_x_ImmoCommu_x_x: '0',//	防盗通信
        Out1Sen_x_ElecLoadSig_x_x: '0',//	电子负载信号
        Out1Sen_x_CodeIncluHis_x_x: '0',//	故障码历史
        Out1Sen_x_MilOnRunDis_x_x: '0',//	MIL亮起后行驶距离
        Out1Sen_x_RunTimMilOn_x_x: '0',//	MIL亮起后行驶时间
        Out1Sen_x_TimAftDTCCle_x_x: '0',//	清除DTC后的时间
        Out1Sen_x_DisFroDTCCle_x_x: '0',//	DTC清除后行驶距离
        Out1Sen_x_WarCycCleDTC_x_x: '0',//	清除DTC后的暖机循环
        Out1Sen_x_TCandTE1_x_x: '0',//
        Out1Sen_x_IgnTrigCount_x_x: '0',//	点火计数
        Out1Sen_x_Cyl1MisCount_x_x: '0',//	1缸缺火率
        Out1Sen_x_Cyl2MisCount_x_x: '0',//	2缸缺火率
        Out1Sen_x_Cyl3MisCount_x_x: '0',//	3缸缺火率
        Out1Sen_x_Cyl4MisCount_x_x: '0',//	4缸缺火率
        Out1Sen_x_AllCylMisCount_x_x: '0',//	所有缸缺火率
        Out1Sen_x_MisfireRPM_x_x: '0',//	缺火时平均转速
        Out1Sen_x_MisfireLoad_x_x: '0',//	缺火时平均负荷
        Out1Sen_x_MisfireMargin_x_x: '0',//	失火边界
        Out1Sen_x_ElecFanMotor_x_x: '0',//	电子风扇电机
        Out1Sen_x_IdleFuelCut_x_x: '0',//	怠速燃油切断
        Out1Sen_x_FCTAU_x_x: '0',//	极小负荷时燃油切断
        Out1Sen_x_SPDNT_x_x: '0',//	输入轴转速
        Out1Sen_x_OverCutSw_x_x: '0',//	超负荷燃油切断
        Out1Sen_x_ShSwStPrange_x_x: '0',//	P档位
        Out1Sen_x_ShSwStRrange_x_x: '0',//	R档位
        Out1Sen_x_ShSwSt2range_x_x: '0',//	2档位
        Out1Sen_x_ShSwStLrange_x_x: '0',//	L档位
        Out1Sen_x_ShSwStNrange_x_x: '0',//	N档位
        Out1Sen_x_ShSwStDrange_x_x: '0',//	D档位
        Out1Sen_x_ShSwSt3range_x_x: '0',//	3档位
        Out1Sen_x_ATOilTemp_x_x: '0',//	ATF温度传感器值
        Out1Sen_x_LockUp_x_x: '0',//	ECT锁止信号
        Out1Sen_x_STSoleSt_x_x: '0',//	锁止电磁阀ST状态
        Out1Sen_x_LockUpSoSt_x_x: '0',//	锁止电磁阀ST状态
        Out1Sen_x_ShiftSt_x_x: '0',//	实际档位
        Out1Sen_x_SLTSoleSt_x_x: '0',//	换挡电磁阀SLU状态
        Out1Sen_MAF_THA_x_x: '0',//	MAF故障码
        Out1Sen_MAF_THALow_x_x: '0',//
        Out1Sen_MAF_THAHign_x_x: '0',//
        Out1Sen_MAF_Code_x_x: '0',//
        Out1Sen_MAF_Low_x_x: '0',//
        Out1Sen_MAF_High_x_x: '0',//
        Out1Sen_PVSV_Circuit_x_x: '0',//	电磁阀故障码
        Out1Sen_APP_DCircuit_x_x: '0',//	油门踏板故障码
        Out1Sen_APP_DLow_x_x: '0',//
        Out1Sen_APP_DHigh_x_x: '0',//
        Out1Sen_APP_E_x_x: '0',//
        Out1Sen_APP_ELow_x_x: '0',//
        Out1Sen_APP_EHigh_x_x: '0',//
        Out1Sen_APP_DandEVltCorr_x_x: '0',//
        Out1Sen_APP_DPerf_x_x: '0',//
        Out1Sen_AF_Low_x_x: '0',//	AF传感器故障码
        Out1Sen_AF_Hign_x_x: '0',//
        Out1Sen_AF_SignalThick_x_x: '0',//
        Out1Sen_AF_SignalThin_x_x: '0',//
        Out1Sen_AF_PumpCurr_x_x: '0',//
        Out1Sen_AF_PumpCurrLow_x_x: '0',//
        Out1Sen_AF_PumpCurrHigh_x_x: '0',//
        Out1Sen_AF_GNDLow_x_x: '0',//
        Out1Sen_AF_GNDHighLow_x_x: '0',//
        Out1Sen_AF_ResSlow_x_x: '0',//
        Out1Sen_TPS_ACircuit_x_x: '0',//	节气门故障码
        Out1Sen_TPS_ALow_x_x: '0',//
        Out1Sen_TPS_AHigh_x_x: '0',//
        Out1Sen_TPS_BCircuit_x_x: '0',//
        Out1Sen_TPS_BLow_x_x: '0',//
        Out1Sen_TPS_BHigh_x_x: '0',//
        Out1Sen_TPS_ABVltCorr_x_x: '0',//
        Out1Sen_TPS_APerf_x_x: '0',//
        Out1Sen_TPS_MLow_x_x: '0',//
        Out1Sen_TPS_MHigh_x_x: '0',//
        Out1Sen_TPS_MCtrlOpenPos_x_x: '0',//
        Out1Sen_TPS_MCtrlClosePos_x_x: '0',//
        Out1Sen_TPS_MPerf_x_x: '0',//
        Out1Sen_TPS_MPerf1_x_x: '0',//
        Out1Sen_Cool_x_x_x: '0',//	冷却温度故障码
        Out1Sen_Cool_Low_x_x: '0',//
        Out1Sen_Cool_High_x_x: '0',//
        Out1Sen_Cool_Perf_x_x: '0',//
        Out1Sen_ICAM_x_x_x: '0',//	进排气凸轮轴故障码
        Out1Sen_ICAM_ALow_x_x: '0',//
        Out1Sen_ICAM_AHigh_x_x: '0',//
        Out1Sen_ECAM_x_x_x: '0',//
        Out1Sen_ECAM_BLow_x_x: '0',//
        Out1Sen_ECAM_BHigh_x_x: '0',//
        Out1Sen_4Cyl_Misfire_x_x: '0',//	失火故障码
        Out1Sen_3Cyl_Misfire_x_x: '0',//
        Out1Sen_2Cyl_Misfire_x_x: '0',//
        Out1_1Cyl_Misfire_Code: '0',//
        Out1Sen_ManyCyl_Misfire_x_x: '0',//
        Out1Sen_System_TooThin_x_x: '0',//	系统故障码
        Out1Sen_IC_ConnOne_x_x: '0',//	点火故障码
        Out1Sen_IC_ConnTwo_x_x: '0',//
        Out1Sen_IC_ConnThree_x_x: '0',//
        Out1Sen_IC_ConnFour_x_x: '0',//
        Out1Sen_Crank_x_x_x: '0',//	曲轴故障码
        Out1Sen_Knock_1BHigh_x_x: '0',//	爆震故障码
        Out1Sen_Knock_1BLow_x_x: '0',//
        Out1Sen_Oxgen_HeatCtrlLow_x_x: '0',//	氧传感器加热器故障码
        Out1Sen_CAM_Aactutor_x_x: '0',//	凸轮轴故障码
        Out1Sen_CAM_AtimAdv_x_x: '0',//
        Out1Sen_CAM_Bactutor_x_x: '0',//
        Out1Sen_CAM_BtimAdv_x_x: '0',
		
		Out1Dia_APP_PP_Fir_x:'0',//1#加速踏板位置传感器
		Out1Dia_APP_PP_Sec_x:'0',//2#加速踏板位置传感器
		Out1Dia_APP_x_x_x:'0',//加速踏板位置 
		Out1Dia_x_RPM_x_x:'0',//柴油发动机转速
		Out1Dia_RailP_Real_x_x:'0',//高压油轨实际轨压
		Out1Dia_RailP_Rated_x_x:'0',//高压油轨轨压设定值
		Out1Dia_rOilPropVlv_x_x_x:'0',//进油计量比例阀电机驱动占空比
		Out1Dia_aOilPropVlv_x_x_x:'0',//进油计量比例阀电流
		Out1Dia_tFlInj_M_x_x:'0',//主喷持续时间
		Out1Dia_qFlInj_x_x_x:'0',//总喷油量
		Out1Dia_vBatt_x_x_x:'0',//蓄电池电压
		Out1Dia_WtRatSens_LED_x_x:'0',//油中有水指示灯
		Out1DFC_OilPropVlv_x_x_x:'0',//燃油计量比例阀失效故障码
		Out1DFC_APP_x_x_x:'0',//加速踏板传感器故障码
		Out1DSM_MIL_1LED_x_x:'0'//MIL指示灯
    }
    return obdscanService;

});
