mainModule.controller('dataCtrl', function ($scope,$rootScope,dashboardService, multimeterService, obdscanService,  pageService) {
    var sbtInt = {};
    var sbtobject = {};
    var sbtCase = {
        In1Sen_BATT_Pos_x_Install: 1,//	电池正极安装状态
        In1Sen_BATT_Neg_x_Install: 1,//	电池负极安装状态
        In1Sen_MFuse_Body_x_Install: 1,//	主保险安装状态
        In1Sen_MFuse_Body_x_Fault: 1,//	主保险本体状态
        In1Sen_MRelay_Body_x_Fault: 1,//	主继电器本体状态
        In1Sen_1B_Conn_Pin2_Open: 1,//:1,//B插头2脚断路
        In1Sen_1B_Conn_Pin2_VirAcc: 1,//:1,//B插头2脚虚接
        In1Sen_1B_Conn_Pin2_S2BATT: 1,//:1,//B插头2脚短路到电
        In1Sen_1B_Conn_Pin2_S2GND: 1,//:1,//B插头2脚短路到地
        In1Sen_1B_Conn_Pin1_Open: 1,//:1,//B插头1脚断路
        In1Sen_1B_Conn_Pin1_VirAcc: 1,//:1,//B插头1脚虚接
        In1Sen_1B_Conn_Pin1_S2BATT: 1,//:1,//B插头1脚短路到电
        In1Sen_1B_Conn_Pin1_S2GND: 1,//:1,//B插头1脚短路到地
        In1Sen_1B_Conn_Pin3_Open: 1,//:1,//B插头3脚断路
        In1Sen_1B_Conn_Pin3_VirAcc: 1,//:1,//B插头3脚虚接
        In1Sen_1B_Conn_Pin3_S2BATT: 1,//:1,//B插头3脚短路到电
        In1Sen_1B_Conn_Pin3_S2GND: 1,//:1,//B插头3脚短路到地
        In1Sen_1B_Conn_Pin4_Open: 1,//:1,//B插头4脚断路
        In1Sen_1B_Conn_Pin4_VirAcc: 1,//:1,//B插头4脚虚接
        In1Sen_1B_Conn_Pin4_S2BATT: 1,//:1,//B插头4脚短路到电
        In1Sen_1B_Conn_Pin4_S2GND: 1,//:1,//B插头4脚短路到地
        In1Sen_1B_Conn_x_Install: 1,//:1,//B插头安装状态
        In1Sen_A50_Conn_Pin44_Open: 1,//	A50插头44脚断路
        In1Sen_EFuse_NO1_2MAF_Open: 1,//	EFINO1保险到MAF端断路
        In1Sen_EFuse_NO1_2MAF_VirAcc: 1,//	EFINO1保险到MAF端虚接
        In1Sen_EFuse_NO1_2MAF_S2BATT: 1,//	EFINO1保险到MAF端短到电
        In1Sen_EFuse_NO1_2MAF_S2GND: 1,//	EFINO1保险到MAF端短到地
        In1Sen_EFuse_NO1_2MR_Open: 1,//	EFINO1保险到MR端断路
        In1Sen_EFuse_NO1_2MR_VirAcc: 1,//	EFINO1保险到MR端虚接
        In1Sen_EFuse_NO1_2MR_S2BATT: 1,//	EFINO1保险到MR端短到电
        In1Sen_EFuse_NO1_2MR_S2GND: 1,//	EFINO1保险到MR端短到地
        In1Sen_EFuse_NO2_2PVSV_Open: 1,//	EFINO2保险到PVSV端断路
        In1Sen_EFuse_NO2_2PVSV_VirAcc: 1,//	EFINO2保险到PVSV端虚接
        In1Sen_EFuse_NO2_2PVSV_S2BATT: 1,//	EFINO2保险到PVSV端短到电
        In1Sen_EFuse_NO2_2PVSV_S2GND: 1,//	EFINO2保险到PVSV端短到地
        In1Sen_EFuse_NO2_2MR_Open: 1,//	EFINO2保险到MR端断路
        In1Sen_EFuse_NO2_2MR_VirACC: 1,//	EFINO2保险到MR端虚接
        In1Sen_EFuse_NO2_2MR_S2BATT: 1,//	EFINO2保险到MR端短到电
        In1Sen_EFuse_NO2_2MR_S2GND: 1,//	EFINO2保险到MR端短到地
        In1Sen_EFuse_NO1_Body_Fault: 1,//	EFI NO1保险本体状态
        In1Sen_EFuse_NO2_Body_Fault: 1,//	EFI NO2保险本体状态
        In1Sen_EFuse_NO1_x_Install: 1,//	EFI NO1保险安装状态
        In1Sen_EFuse_NO2_x_Install: 1,//	EFI NO2保险安装状态
        In1Sen_MAF_Body_x_Fault: 1,//	空气流量计本体状态
        In1Sen_MAF_Conn_B_Open: 1,//	空气流量计B端断路
        In1Sen_MAF_Conn_B_VirAcc: 1,//	空气流量计B端虚接
        In1Sen_MAF_Conn_B_S2BATT: 1,//	空气流量计B端短到电
        In1Sen_MAF_Conn_B_S2GND: 1,//	空气流量计B端短到地
        In1Sen_MAF_Conn_VG_Open: 1,//	空气流量计VG端断路
        In1Sen_MAF_Conn_VG_VirAcc: 1,//	空气流量计VG端虚接
        In1Sen_MAF_Conn_VG_S2BATT: 1,//	空气流量计VG端短到电
        In1Sen_MAF_Conn_VG_S2GND: 1,//	空气流量计VG端短到地
        In1Sen_MAF_Conn_E2G_Open: 1,//	空气流量计E2G端断路
        In1Sen_MAF_Conn_E2G_VirAcc: 1,//	空气流量计E2G端虚接
        In1Sen_MAF_Conn_E2G_S2BATT: 1,//	空气流量计E2G端短到电
        In1Sen_MAF_Conn_E2G_S2GND: 1,//	空气流量计E2G端短到地
        In1Sen_MAF_Conn_THA_Open: 1,//	空气流量计THA端断路
        In1Sen_MAF_Conn_THA_VirAcc: 1,//	空气流量计THA端虚接
        In1Sen_MAF_Conn_THA_S2BATT: 1,//	空气流量计THA端短到电
        In1Sen_MAF_Conn_THA_S2GND: 1,//	空气流量计THA端短到地
        In1Sen_MAF_Conn_E2_Open: 1,//	空气流量计E2端断路
        In1Sen_MAF_Conn_E2_VirAcc: 1,//	空气流量计E2端虚接
        In1Sen_MAF_Conn_E2_S2BATT: 1,//	空气流量计E2端短到电
        In1Sen_MAF_Conn_E2_S2GND: 1,//	空气流量计E2端短到地
        In1Sen_MAF_Conn_x_Install: 1,//	空气流量计插头安装状态
        In1Sen_PVSV_Conn_2ECM_Open: 1,//	PVSV阀到ECM端断路
        In1Sen_PVSV_Conn_2ECM_VirAcc: 1,//	PVSV阀到ECM端虚接
        In1Sen_PVSV_Conn_2ECM_S2BATT: 1,//	PVSV阀到ECM端短到电
        In1Sen_PVSV_Conn_2ECM_S2GND: 1,//	PVSV阀到ECM端短到地
        In1Sen_PVSV_Conn_2B_Open: 1,//	PVSV阀到2B端断路
        In1Sen_PVSV_Conn_2B_VirAcc: 1,//	PVSV阀到2B端虚接
        In1Sen_PVSV_Conn_2B_S2BATT: 1,//	PVSV阀到2B端短到电
        In1Sen_PVSV_Conn_2B_S2GND: 1,//	PVSV阀到2B端短到地
        In1Sen_PVSV_Body_x_Fault: 1,//	PVSV阀本体故障
        In1Sen_PVSV_Body_x_Status: 1,//	PVSV阀本体状态
        In1Sen_PVSV_Conn_x_Install: 1,//	PVSV阀安装状态
        In1Sen_AF_Conn_A1APO_Open: 1,//	空燃比传感器A1A正极断路
        In1Sen_AF_Conn_A1APO_VirAcc: 1,//	空燃比传感器A1A正极虚接
        In1Sen_AF_Conn_A1APO_S2BATT: 1,//	空燃比传感器A1A正极短到电
        In1Sen_AF_Conn_A1APO_S2GND: 1,//	空燃比传感器A1A正极短到地
        In1Sen_AF_Conn_A1ANE_Open: 1,//	空燃比传感器A1A负极断路
        In1Sen_AF_Conn_A1ANE_VirAcc: 1,//	空燃比传感器A1A负极虚接
        In1Sen_AF_Conn_A1ANE_S2BATT: 1,//	空燃比传感器A1A负极短到电
        In1Sen_AF_Conn_A1ANE_S2GND: 1,//	空燃比传感器A1A负极短到地
        In1Sen_AF_Conn_HA1A_Open: 1,//	空燃比传感器HA1A负极断路
        In1Sen_AF_Conn_HA1A_VirAcc: 1,//	空燃比传感器HA1A负极虚接
        In1Sen_AF_Conn_HA1A_S2BATT: 1,//	空燃比传感器HA1A负极短到电
        In1Sen_AF_Conn_HA1A_S2GND: 1,//	空燃比传感器HA1A负极短到地
        In1Sen_AF_Conn_2B_Open: 1,//	空燃比传感器2B负极断路
        In1Sen_AF_Conn_2B_VirAcc: 1,//	空燃比传感器2B负极虚接
        In1Sen_AF_Conn_2B_S2BATT: 1,//	空燃比传感器2B负极短到电
        In1Sen_AF_Conn_2B_S2GND: 1,//	空燃比传感器2B负极短到地
        In1Sen_AF_Body_x_Fault: 1,//	空燃比传感器本体状态
        In1Sen_AF_Conn_x_Install: 1,//	空燃比传感器插头安装状态
        In1Sen_APP_Conn_VPA_VirAcc: 1,//	油门踏板VPA端虚接
        In1Sen_APP_Conn_VPA_Open: 1,//	油门踏板VPA端断路
        In1Sen_APP_Conn_VPA_S2EPA: 1,//	油门踏板VPA端短到EPA
        In1Sen_APP_Conn_VPA_S2EPA2: 1,//	油门踏板VPA端短到EPA2
        In1Sen_APP_Conn_VPA_S2VCPA: 1,//	油门踏板VPA端短到VCPA
        In1Sen_APP_Conn_VPA_S2VCP2: 1,//	油门踏板VPA端短到VCP2
        In1Sen_APP_Conn_VPA2_VirAcc: 1,//	油门踏板VPA2虚接
        In1Sen_APP_Conn_VPA2_Open: 1,//	油门踏板VPA2端断路
        In1Sen_APP_Conn_VPA2_S2EPA2: 1,//	油门踏板VPA2端短到EPA2
        In1Sen_APP_Conn_VPA2_S2EPA: 1,//	油门踏板VPA2端短到EPA
        In1Sen_APP_Conn_VPA2_S2VCPA: 1,//	油门踏板VPA2端短到VCPA
        In1Sen_APP_Conn_VPA2_S2VCP2: 1,//	油门踏板VPA2端短到VCP2
        In1Sen_APP_Conn_VCPA_VirAcc: 1,//	油门踏板VCPA端虚接
        In1Sen_APP_Conn_VCPA_Open: 1,//	油门踏板VCPA端断路
        In1Sen_APP_Conn_VCPA_S2EPA: 1,//	油门踏板VCPA端短到EPA
        In1Sen_APP_Conn_VCPA_S2EPA2: 1,//	油门踏板VCPA端短到EPA2
        In1Sen_APP_Conn_VCPA_S2VCP2: 1,//	油门踏板VCPA端短到VCP2
        In1Sen_APP_Conn_VCP2_VirAcc: 1,//	油门踏板VCP2端虚接
        In1Sen_APP_Conn_VCP2_Open: 1,//	油门踏板VCP2端开路
        In1Sen_APP_Conn_VCP2_S2EPA: 1,//	油门踏板VCP2端短到EPA
        In1Sen_APP_Conn_VCP2_S2EPA2: 1,//	油门踏板VCP2端短到EPA2
        In1Sen_APP_Conn_EPA_VirAcc: 1,//	油门踏板EPA端虚接
        In1Sen_APP_Conn_EPA_Open: 1,//	油门踏板EPA端断路
        In1Sen_APP_Conn_EPA_S2EPA2: 1,//	油门踏板EPA端短到EPA2
        In1Sen_APP_Conn_EPA2_VirAcc: 1,//	油门踏板EPA2端虚接
        In1Sen_APP_Conn_EPA2_Open: 1,//	油门踏板EPA2端断路
        In1Sen_APP_Body_x_Fault: 1,//	油门踏板本体状态
        In1Sen_APP_Conn_x_Install: 1,//	油门踏板插头安装状态
        In1Sen_TPS_Conn_VTA1_VirAcc: 1,//	节气门VTA1端虚接
        In1Sen_TPS_Conn_VTA1_Open: 1,//	节气门VTA1端断路
        In1Sen_TPS_Conn_VTA1_S2ETA: 1,//	节气门VTA1端短到ETA
        In1Sen_TPS_Conn_VTA1_S2GND: 1,//	节气门VTA1端短到地
        In1Sen_TPS_Conn_VTA1_S2VTA2: 1,//	节气门VTA1端短到VTA2
        In1Sen_TPS_Conn_VTA1_S2BATT: 1,//	节气门VTA1端短到电
        In1Sen_TPS_Conn_VTA1_S2VCTA: 1,//	节气门VTA1端短到VCTA
        In1Sen_TPS_Conn_VTA2_VirAcc: 1,//	节气门VTA2端虚接
        In1Sen_TPS_Conn_VTA2_Open: 1,//	节气门VTA2端断路
        In1Sen_TPS_Conn_VTA2_S2ETA: 1,//	节气门VTA2端短到ETA
        In1Sen_TPS_Conn_VTA2_S2GND: 1,//	节气门VTA2端短到地
        In1Sen_TPS_Conn_VTA2_S2BATT: 1,//	节气门VTA2端短到电
        In1Sen_TPS_Conn_VTA2_S2VCTA: 1,//	节气门VTA2端短到VCTA
        In1Sen_TPS_Conn_VCTA_VirAcc: 1,//	节气门VCTA端虚接
        In1Sen_TPS_Conn_VCTA_Open: 1,//	节气门VCTA端开路
        In1Sen_TPS_Conn_VCTA_S2ETA: 1,//	节气门VCTA端短到ETA
        In1Sen_TPS_Conn_VCTA_S2GND: 1,//	节气门VCTA端短到地
        In1Sen_TPS_Conn_ETA_VirAcc: 1,//	节气门ETA端虚接
        In1Sen_TPS_Conn_ETA_Open: 1,//	节气门ETA端开路
        In1Sen_TPS_Conn_ETA_S2GND: 1,//	节气门ETA端短到地
        In1Sen_TPS_Conn_MPO_Open: 1,//	节气门MPO端断路
        In1Sen_TPS_Conn_MNE_Open: 1,//	节气门MNE端断路
        In1Sen_TPS_Body_x_Fault: 1,//	节气门本体状态
        In1Sen_TPS_Conn_ME01_Open: 1,//	节气门ME01端断路
        In1Sen_TPS_Conn_x_Install: 1,//	节气门插头安装状态
        In1Sen_Cool_Conn_x_Install: 1,//	冷却温度插头安装状态
        In1Sen_Cool_Conn_THW_Open: 1,//	冷却温度THW端断路
        In1Sen_Cool_Conn_ETHW_Open: 1,//	冷却温度ETHW端断路
        In1Sen_Cool_Conn_THW_S2GND: 1,//	冷却温度THW端短到地
        In1Sen_Cool_Body_x_Fault: 1,//	冷却温度本体状态
        In1Sen_ICAM_Conn_x_Install: 1,//	进气凸轮轴插头安装状态
        In1Sen_ECAM_Conn_x_Install: 1,//	排气凸轮轴插头安装状态
        In1Sen_ICAM_Conn_G2PO_Open: 1,//	进气凸轮轴G2PO端断路
        In1Sen_ICAM_Conn_G2NE_Open: 1,//	进气凸轮轴G2NE端断路
        In1Sen_ICAM_Conn_VCV1_Open: 1,//	进气凸轮轴VCV1端断路
        In1Sen_ECAM_Conn_EV1PO_Open: 1,//	排气凸轮轴EV1PO断路
        In1Sen_ECAM_Conn_EV1NE_Open: 1,//	排气凸轮轴EV1NE断路
        In1Sen_ECAM_Conn_VC_Open: 1,//	排气凸轮轴VC断路
        In1Sen_ICAM_Body_x_Fault: 1,//	进气凸轮轴本体状态
        In1Sen_ECAM_Body_x_Fault: 1,//	排气凸轮轴本体状态
        In1Sen_Inj_Conn_One_Install: 1,//	喷油器1缸插头安装状态
        In1Sen_Inj_Conn_Two_Install: 1,//	喷油器2缸插头安装状态
        In1Sen_Inj_Conn_Three_Install: 1,//	喷油器3缸插头安装状态
        In1Sen_Inj_Conn_Four_Install: 1,//	喷油器4缸插头安装状态
        In1Sen_Inj_Conn_One2ECM_Open: 1,//	喷油器1缸插头到ECM端断路
        In1Sen_Inj_Conn_One2JC_Open: 1,//	喷油器1缸插头到JC端断路
        In1Sen_Inj_Conn_Two2ECM_Open: 1,//	喷油器2缸插头到ECM端断路
        In1Sen_Inj_Conn_Two2JC_Open: 1,//	喷油器2缸插头到JC端断路
        In1Sen_Inj_Conn_Three2ECM_Open: 1,//	喷油器3缸插头到ECM端断路
        In1Sen_Inj_Conn_Three2JC_Open: 1,//	喷油器3缸插头到JC端断路
        In1Sen_Inj_Conn_Four2ECM_Open: 1,//	喷油器4缸插头到ECM端断路
        In1Sen_Inj_Conn_Four2JC_Open: 1,//	喷油器4缸插头到JC端断路
        In1Sen_Inj_Body_One_Fault: 1,//	喷油器1缸本体状态
        In1Sen_Inj_Body_Two_Fault: 1,//	喷油器2缸本体状态
        In1Sen_Inj_Body_Three_Fault: 1,//	喷油器3缸本体状态
        In1Sen_Inj_Body_Four_Fault: 1,//	喷油器4缸本体状态
        In1Sen_IC_Conn_One_Install: 1,//	点火线圈1缸安装状态
        In1Sen_IC_Conn_Two_Install: 1,//	点火线圈2缸安装状态
        In1Sen_IC_Conn_Three_Install: 1,//	点火线圈3缸安装状态
        In1Sen_IC_Conn_Four_Install: 1,//	点火线圈4缸安装状态
        In1Sen_IC_Body_One_Fault: 1,//	点火线圈1缸本体状态
        In1Sen_IC_Body_Two_Fault: 1,//	点火线圈2缸本体状态
        In1Sen_IC_Body_Three_Fault: 1,//	点火线圈3缸本体状态
        In1Sen_IC_Body_Four_Fault: 1,//	点火线圈4缸本体状态
        In1Sen_IC_Conn_OneB_Open: 1,//:1,//缸点火线圈B线断路
        In1Sen_IC_Conn_OneGND_Open: 1,//:1,//缸点火线圈GND线断路
        In1Sen_IC_Conn_OneIGT1_Open: 1,//:1,//缸点火线圈IGT1线断路
        In1Sen_IC_Conn_OneIGF1_Open: 1,//:1,//缸点火线圈IGF1线断路
        In1Sen_IC_Conn_TwoB_Open: 1,//	2缸点火线圈B线断路
        In1Sen_IC_Conn_TwoGND_Open: 1,//	2缸点火线圈GND线断路
        In1Sen_IC_Conn_TwoIGT2_Open: 1,//	2缸点火线圈IGT2线断路
        In1Sen_IC_Conn_TwoIGF1_Open: 1,//	2缸点火线圈IGF1线断路
        In1Sen_IC_Conn_ThreeB_Open: 1,//	3缸点火线圈B线断路
        In1Sen_IC_Conn_ThreeGND_Open: 1,//	3缸点火线圈GND线断路
        In1Sen_IC_Conn_ThreeIGT3_Open: 1,//	3缸点火线圈IGT3线断路
        In1Sen_IC_Conn_ThreeIGF1_Open: 1,//	3缸点火线圈IGF1线断路
        In1Sen_IC_Conn_FourB_Open: 1,//	4缸点火线圈B线断路
        In1Sen_IC_Conn_FourGND_Open: 1,//	4缸点火线圈GND线断路
        In1Sen_IC_Conn_FourIGT4_Open: 1,//	4缸点火线圈IGT4线断路
        In1Sen_IC_Conn_FourIGF1_Open: 1,//	4缸点火线圈IGF1线断路
        In1Sen_OP_Pipe_2PVSV_Install: 1,//	油泵管路到PVSV安装状态
        In1Sen_OP_Pipe_2Tank_Install: 1,//	油泵管路到邮箱安装状态
        In1Sen_OP_Pipe_2Rail_Install: 1,//	油泵管路到油轨安装状态
        In1Sen_OP_Pipe_2Atmp_Install: 1,//	油泵管路到大气安装状态
        In1Sen_OP_Conn_x_Install: 1,//	油泵插头安装状态
        In1Sen_OP_Conn_FS_Open: 1,//	油泵插头FS线断路
        In1Sen_OP_Conn_FE_Open: 1,//	油泵插头FE线断路
        In1Sen_OP_Conn_Power_Open: 1,//	油泵插头Power线断路
        In1Sen_OP_Conn_GND_Open: 1,//	油泵插头GND断路
        In1Sen_OP_Carbon_Body_Fault: 1,//	油泵炭罐部件状态
        In1Sen_OP_x_Pi2PVSV_PiCla: 0,//	油泵到PVSV管路安装管夹状态
        In1Sen_OP_x_Pi2Atmp_PiCla:0,//	油泵到大气管路安装管夹状态
        In1Sen_PVSV_x_Pi2Intake_Install: 1,//	PVSV到进气管路安装状态
        In1Sen_PVSV_x_Pi2Carbon_Install: 1,//	PVSV到炭罐管路安装状态
        In1Sen_PVSV_x_Pi2Intake_PiCla: 0,//	PVSV到进气管路管夹状态
        In1Sen_PVSV_x_Pi2Carbon_PiCla: 0,//	PVSV到炭罐管路管夹状态
        In1Sen_OP_Body_x_Fault: 1,//	油泵部件本体状态
        In1Sen_IG2_Fuse_x_Install: 1,//	IG2保险丝安装状态
        In1Sen_IG2_Fuse_x_Fault: 1,//	IG2保险丝本体状态
        In1Sen_IG2_NO2Fuse_x_Install: 1,//	IG2 NO2保险丝安装状态
        In1Sen_IG2_NO2Fuse_x_Fault: 1,//	IG2 NO2保险丝本体状态
        In1Sen_1A_Conn_x_Install: 1,//:1,//A插头安装状态
        In1Sen_STRelay_Conn_Install: 1,//	起动机继电器插头安装状态
        In1Sen_1A_Conn_Pin3_Open: 1,//:1,//A插头3脚断路
        In1Sen_1A_Conn_Pin2_Open: 1,//:1,//A插头2脚断路
        In1Sen_1A_Conn_Pin4_Open: 1,//:1,//A插头4脚断路
        In1Sen_IG2Relay_Body_x_Fault: 1,//	IG2继电器本体状态
        In1Sen_IGKey_Conn_x_Install: 1,//	点火钥匙插头安装状态
        In1Sen_IGKey_Conn_ST1_Open: 1,//	点火钥匙ST1脚断路
        In1Sen_IGKey_Conn_AM1_Open: 1,//	点火钥匙AM1脚断路
        In1Sen_IGKey_Conn_ACC_Open: 1,//	点火钥匙ACC脚断路
        In1Sen_IGKey_Conn_IG1_Open: 1,//	点火钥匙IG1脚断路
        In1Sen_IGKey_Conn_IG2_Open: 1,//	点火钥匙IG2脚断路
        In1Sen_IGKey_Conn_AM2_Open: 1,//	点火钥匙AM2脚断路
        In1Sen_IGKey_Conn_ST2_Open: 1,//	点火钥匙ST2脚断路
        In1Sen_ST_Conn_x_Install: 1,//	起动机插头安装状态
        In1Sen_ST_Conn_2Relay_Open: 1,//	起动机插头到继电器端断路
        In1Sen_ST_Conn_2BAT_Open: 1,//	起动机插头到电池端断路
        In1Sen_ST_Body_x_Fault: 1,//	起动机本体状态
        In1Sen_PN_Conn_x_Install: 1,//	PN开关插头安装状态
        In1Sen_PN_Body_x_Fault: 1,//	PN开关本体状态
        In1Sen_PN_Conn_2STRelay_Open: 1,//	PN插头到继电器端断路
        In1Sen_PN_Conn_2JC_Open: 1,//	PN插头到JC端断路
        In1Sen_Crank_Conn_x_Install: 1,//	曲轴传感器安装状态
        In1Sen_Crank_Conn_2PNE_Open: 1,//	曲轴传感器PNE脚断路
        In1Sen_Crank_Conn_2NNE_Open: 1,//	曲轴传感器NNE脚断路
        In1Sen_Crank_Body_x_Fault: 1,//	曲轴传感器部件本体状态
        In1Sen_Knock_Conn_x_Install: 1,//	爆震传感器插头安装状态
        In1Sen_Knock_Conn_2EKNK_Open: 1,//	爆震传感器EKNK脚断路
        In1Sen_Knock_Conn_2KNK1_Open: 1,//	爆震传感器KNK1脚断路
        In1Sen_Knock_Body_x_Fault: 1,//	爆震传感器本体状态
        In1Sen_Oxgen_Conn_x_Install: 1,//	氧传感器插头安装状态
        In1Sen_Oxgen_Body_x_Fault: 1,//	氧传感器本体状态
        In1Sen_Oxgen_Conn_HT1B_Open: 1,//	氧传感器插头HT1B脚断路
        In1Sen_Oxgen_Conn_B_Open: 1,//	氧传感器插头B脚断路
        In1Sen_Oxgen_Conn_OX1B_Open: 1,//	氧传感器插头OX1B脚断路
        In1Sen_Oxgen_Conn_E2_Open: 1,//	氧传感器插头E2脚断路
        In1Sen_ICAMValve_Conn_x_Install: 1,//	进气凸轮轴阀插头安装状态
        In1Sen_ECAMValve_Conn_x_Install: 1,//	排气凸轮轴阀插头安装状态
        In1Sen_ICAMValve_Body_x_Fault: 1,//	进气凸轮轴阀本体状态
        In1Sen_ECAMValve_Body_x_Fault: 1,//	排气凸轮轴阀本体状态
        In1Sen_ICAMValve_Conn_2POC_Open: 1,//	进气凸轮轴阀POC脚断路
        In1Sen_ICAMValve_Conn_2NOC_Open: 1,//	进气凸轮轴阀NOC脚断路
        In1Sen_ECAMValve_Conn_2POE_Open: 1,//	排气凸轮轴阀POE脚断路
        In1Sen_ECAMValve_Conn_2NOE_Open: 1,//	排气凸轮轴阀NOE脚断路
        In1Sen_A50_Conn_x_Install: 1,//	ECM A50插头安装状态
        In1Sen_B31_Conn_x_Install: 1,//	ECM B31插头安装状态
        In1Sen_A50_Conn_Pin20BAT_Open: 1,//	A50插头20脚断路
        In1Sen_A50_Conn_Pin2B_Open: 1,//	A50插头2脚断路
        In1Sen_A50_Conn_Pin1B2_Open: 1,//	A50插头1脚断路
        In1Sen_A50_Conn_Pin3BM_Open: 1,//	A50插头3脚断路
        In1Sen_A50_Conn_Pin48STA_Open: 1,//	A50插头48脚断路
        In1Sen_A50_Conn_Pin7FC_Open: 1,//	A50插头7脚断路
        In1Sen_A50_Conn_Pin28IGSW_Open: 1,//	A50插头28脚断路
        In1Sen_A50_Conn_Pin43RFC_Open: 1,//	A50插头43脚断路
        In1Sen_B31_Conn_Pin110KNK1_Open: 1,//	B31插头110脚断路
        In1Sen_B31_Conn_Pin111EKNK_Open: 1,//	B31插头111脚断路
        In1Sen_2A_Conn_x_Install: 1,//	2A插头安装状态
        In1Sen_2B_Conn_x_Install: 1,//	2B插头安装状态
        In1Sen_2B_Conn_Pin9_Open: 1,//	2B插头9脚断路
        In1Sen_2B_Conn_Pin10_Open: 1,//	2B插头10脚断路
        In1Sen_2B_Conn_Pin11_Open: 1,//	2B插头11脚断路
        In1Sen_2A_Conn_Pin8_Open: 1,//	2A插头8脚断路
        In1Sen_B31_Conn_Pin81IGF1_Open: 1,//	B31插头81脚断路
        In1Sen_B31_Conn_Pin104GND_Open: 1,//	B31插头104脚断路
        In1Sen_x_InManifoldLeakage_x_x: 1,//	进气歧管漏气
        In1Sen_IG2Relay_Body_x_Short: 1,//	主继电器部件短路
        In1Sen_Catalytic_Body_x_Fault: 1,//	三元催化器失效
        In1Sen_OP_Filter_x_x: 1,//	油泵滤芯阻塞
        In1Sen_STRelay_Body_x_Fault: 1,//	起动机继电器本体故障
        In1Sen_OP_Valve_x_Fault: 1,//	油泵单向阀故障
        In1Sen_x_PVCValve_x_Fault: 1,//	曲轴通风箱PVC故障
        In1Sen_x_AirValve_x_Fault: 1,//	空气开关阀故障
        
        In1Sen_IC_SpPlug_One_Install: 1,//1缸火花塞安装状态
        In1Sen_IC_SpPlug_Two_Install: 1,//2缸火花塞安装状态
        In1Sen_IC_SpPlug_Three_Install: 1,//3缸火花塞安装状态
        In1Sen_IC_SpPlug_Four_Install: 1//4缸火花塞安装状态

    };

    var fdjqh = {
    	In1Sen_x_EMULoad_x_Jud:'1',//软教具适应参数
        In1EngM_x_EngCtrl_Intake_x: "0",//	进气系统参数
        In1EngM_x_EngCtrl_Inject_x: "0",//	喷油系统参数
        In1EngM_x_EngCtrl_Cylinder_x: "0",//	点火系统参数
        In1EngM_x_EngCtrl_Exhaust_x: "0",//	排气系统参数
        In1EngM_x_EngCtrl_Friction_x: "0",//	发动机摩擦损失
        In1EngM_x_EngCtrl_Cool_x: "1",//	冷却系统参数
        In1EngM_x_VehCtrl_Brake_x: "0",//	制动系统参数
        In1EngM_x_VehCtrl_Driving_x: "0",//	行驶系统参数
        In1EngM_x_VehCtrl_Driveline: "0",//	传动系统参数
        In1EngM_x_ECUCtrl_Steering: "0",//	转向系统参数
        In1EngM_x_ECUCtrl_Run: "0",//	启动控制参数
        In1EngM_x_ECUCtrl_Idle: "0",//	怠速控制参数
        In1EngM_x_ECUCtrl_Partload: "0",//	部分负荷控制参数
        In1EngM_x_ECUCtrl_Fulload: "0",//	全负荷控制参数
        In1EngM_x_ECUCtrl_Accelerate: "0",//	加速控制参数
        In1EngM_x_ECUCtrl_Reduction: "0",//	减速控制参数
        In1EngM_x_CCUCtrl_Exhaust: "0",//	排放控制参数
        In1EngM_x_CCUCtrl_Transmission: "0",//	变速器参数
        In1EngM_x_CCUCtrl_ABS: "0",//	ABS制动参数
        In1EngM_x_CCUCtrl_Steering: "0",//	电控悬架系统参数
        In1EngM_x_CCUCtrl_ESP: "0",//	电控动力转向(ESP)参数
        In1EngM_x_CCUCtrl_ASR: "0",//	驱动防滑控制系统(ASR)参数
        In1EngM_x_SysCtrl_Aircondioner: "0",//	空调控制系统参数
        In1EngM_x_SenCtrl_Sensor: "0",//	传感器模型参数
        In1EngM_x_SenCtrl_Actuator: "0",//	执行器模型参数
        In1EngM_x_SysCtrl_Lubrication: "0",//	润滑系统参数
        In1EngM_x_HybCtrl_Engine: "0",//	发动机模型参数
        In1EngM_x_HybCtrl_Motor: "0",//	电动机模型参数
        In1EngM_x_HybCtrl_Batterypack: "0",//	蓄电池模型参数
        In1EngM_x_PurCtrl_Motor: "0",//	电动机模型参数
        In1EngM_x_PurCtrl_Batterypack:"0",//	蓄电池模型参数
        
        In1EngM_x_EngCtrl_CrankVen_x:"0",//曲轴箱通风系统
		In1EngM_x_EngCtrl_TwoAir_x:"0",//二次空气系统
		In1EngM_x_VehCtrl_CentrlLock_x:"0",//中控锁系统
		In1EngM_x_VehCtrl_Charge_x:"0",//充电系统
		In1EngM_x_VehCtrl_ElecCruise_x:"0",//电子巡航系统
		In1EngM_x_VehCtrl_AtuoAC_x:"0",//自动空调系统
		In1EngM_x_VehCtrl_ManiAC_x:"0",//手动空调系统
		In1EngM_x_VehCtrl_AntiTheft_x :"0",//防盗系统
		In1EngM_x_VehCtrl_ElecSeat_x:"0",//电动座椅（带记忆）
		In1EngM_x_VehCtrl_CANBus_x:"0",//CAN总线
		In1EngM_x_VehCtrl_MT_x:"0",//MT变速箱
		In1EngM_x_VehCtrl_GlassLift_x:"0",//玻璃升降器
		In1EngM_x_VehCtrl_Wiper_x:"1",//雨刷系统
		In1EngM_x_EngCtrl_GDI_x:"0",//缸内直喷系统
		In1EngM_x_VehCtrl_Lighting_x:"0",//灯光照明系统
		In1EngM_x_VehCtrl_AT_x:"0",//AT变速箱
		In1EngM_x_VehCtrl_SafeBag_x:"0",//安全气囊系统
		In1EngM_x_VehCtrl_DSG_x:"0",//DSG变速箱
		In1EngM_x_VehCtrl_CVT_x:"0",//CVT变速箱
		In1EngM_x_VehCtrl_ABS_x:"0",//ABS/ESP
		In1EngM_x_VehCtrl_ESP_x:"0"//电动转向
    }


    function plugin0() {
        return document.getElementById('plugin0');
    }

    plugin = plugin0;
    function addEvent(obj, name, func) {
        if (obj.attachEvent) {
            obj.attachEvent("on" + name, func);
        } else {
            obj.addEventListener(name, func, false);
        }
    }

    function load() {
        addEvent(plugin(), 'test', function () {
            alert("Received a test event from the plugin.")
        });
    }

    function pluginLoaded() {
        alert("Plugin loaded!");
    }

    function addTestEvent() {
        addEvent(plugin(), 'echo', function (txt, count) {
            alert(txt + count);
        });
    }

    function testEvent() {
        plugin().testEvent();
    }

    /*function pluginValid()
     {

     //$("[name=showData]").eq(0).html(parameter.Out1EngM_x_EngSpeed_x_x);
     //$("[name=showData]").eq(1).html(parameter.Out1Dash_x_LED_Brake_Jud);
     /*$("[name=showData]").eq(2).html(parameter.Out1_Coolant_Temp_VALUE);
     $("[name=showData]").eq(3).html(parameter.Out1_EngineRun_Time_VALUE);
     $("[name=showData]").eq(4).html(parameter.Out1_Engine_Speed_VALUE);
     $("[name=showData]").eq(5).html(parameter.Out1_Init_Engine_Cool_Temp_VALUE);
     $("[name=showData]").eq(6).html(parameter.Out1_Intake_Air_VALUE);
     $("[name=showData]").eq(7).html(parameter.Out1_MAF_VALUE);
     $("[name=showData]").eq(8).html(parameter.Out1_To_M_Screen_VALUE);
     $("[name=showData]").eq(9).html(parameter.Out1_Vehicle_Load_VALUE);
     $("[name=showData]").eq(10).html(parameter.Out1_Vehicle_Speed_VALUE);
     $("[name=showData]").eq(11).html(parameter.name);
     $("[name=showData]").eq(12).html(parameter.year);
     }*/
    /* function pluginValid() {
     if (plugin().valid) {
     alert(plugin().echo("hhh"));
     //pluginValid();
     setInterval(function () {
     var parameter = eval("(" + plugin().OutToWebValues() + ")");
     console.log(parameter);
     }, 5);
     } else {
     alert("Plugin is not working :(");
     }
     }*/

   
    sbtInt.dashboard = dashboardService.Dint;
    sbtInt.multimeter = multimeterService.Mint;
	sbtInt.obdscanr = obdscanService.Mint;
  
    sbtInt.allsensor = pageService.Mint;
    


    function count(src) {

    };
    function pluginValidStart() {
        //  plugin().echo();
        // setInterval("pluginValid()",100);
    }

//输入----
    function outParam() {
        var paramObj = JSON.stringify(sbtInt);
        // plugin().echoInputValues("'"+paramObj+"'");
        try {
			
            plugin().WebInputValues(paramObj);
        } catch (e) {
			$rootScope.createVersionGetWarn("插件过期，请关闭浏览器重新安装插件");
			return;
        }
    }

    function exit() {
        plugin().ModelStop();
    }
    var timerOutParam
    $rootScope.exit=function(){
    if(timerOutParam){clearInterval(timerOutParam);}
    	try {
            plugin().ModelStop();
        } catch (e) {
			$rootScope.createVersionGetWarn("插件过期，请关闭浏览器重新安装插件");
			return;
        }
    }

    $(function () {
        var fefef = "0";
        var wewewe = "";
        for (var i in sbtCase) {
            fefef = fefef + sbtCase[i];

        }
        //console.log(fefef);
        for (var i = 1; i < 76; i++) {
            wewewe = wewewe + parseInt(fefef.substring(4 * i - 4, 4 * i), 2).toString(16);
            // console.log(fefef.substring(4*i-4,4*i));
        }
       // console.log(wewewe);
        var fefe2 = "000";
        var wewew2 = "";
        for (var i in fdjqh) {
            fefe2 = fefe2 +""+fdjqh[i];

        }
//        console.log(fefe2);
        for (var i = 1; i < 15; i++) {
            wewew2 = wewew2 + parseInt(fefe2.substring(4 * i - 4, 4 * i), 2).toString(16);
            // console.log(fefef.substring(4*i-4,4*i));
        }
//      console.log(wewew2);
        sbtobject.In1_x_Fault_x_Control = wewewe;//号
        sbtobject.In1_x_switch_x_Judge = wewew2;//机公共输入
        sbtobject.In1_x_Init_x_Control = '1'; //0
        sbtobject.In1_x_Multi_x_State = '1';//否使用
        sbtobject.In1_x_ObdsSan_x_state = '1';//否使用
        sbtobject.In1_x_dashboard_x_state = '1';//使用
        var q = JSON.stringify(sbtobject);
        //柴油专用
        //q='Diesel';
//		plugin().ModelControler(q);
		
//      if((typeof plugin().ModelControler!=="undefined")&&(typeof plugin().OutToWebValues!=="undefined")&&(typeof plugin().WebInputValues!=="undefined")&&(typeof plugin().ModelStop!=="undefined")){
//      	plugin().ModelControler(q);
//      }else{
//      	alert("调不到插件1");
//      }
		
		//判断能不能调到插件
		try{
			plugin().ModelControler(q);
		}catch(e){
			$rootScope.createVersionGetWarn("插件过期，请关闭浏览器重新安装插件");
			return;
		}
        //判断插件是否过期
        try{
			if(plugin().VersionGet(pageService.SysVersion)=="no"){
				$rootScope.createVersionGetWarn("插件过期，请关闭浏览器重新安装插件");
				return;
			}
		}catch(e){
			$rootScope.createVersionGetWarn("插件过期，请关闭浏览器重新安装插件");
			return;
		}
        
        
        timerOutParam=setInterval(function () {
        	outParam();
            pluginValid();
            //console.log(pageService.In1PW_Auto_Switch_x_x);
        }, 40);
    });
var sbtOut;
    function pluginValid() {
//  	if((typeof plugin().ModelControler!=="undefined")&&(typeof plugin().OutToWebValues!=="undefined")&&(typeof plugin().WebInputValues!=="undefined")&&(typeof plugin().ModelStop!=="undefined")){
//      	sbtOut = eval("(" + plugin().OutToWebValues() + ")");
//      }else{
//      	alert("调不到插件2");
//      }
		try{
			sbtOut = eval("(" + plugin().OutToWebValues() + ")");
		}catch(e){
			$rootScope.createVersionGetWarn("插件过期，请关闭浏览器重新安装插件");
			return;
		}
		
		//万用表输出=========================================================
        multimeterService.Mout.Out1MultiLogic_x_ToScreen_x_x = formatFloat(sbtOut.Out1MultiLogic_x_ToScreen_x_x);
		
		//仪表输出=========================================================
        dashboardService.Dout.Out1Dash_x_LED_ABS_Jud = sbtOut.Out1Dash_x_LED_ABS_Jud;	//ABS灯输出
        dashboardService.Dout.Out1Dash_x_LED_Brake_Jud = sbtOut.Out1Dash_x_LED_Brake_Jud;//	制动灯输出
        dashboardService.Dout.Out1Dash_x_LED_SafeBag_Jud = sbtOut.Out1Dash_x_LED_SafeBag_Jud;	//安全气囊灯输出
        dashboardService.Dout.Out1Dash_x_LED_MIL_Jud = sbtOut.Out1Dash_x_LED_MIL_Jud;	//发动机故障灯输出
        dashboardService.Dout.Out1Dash_x_LED_OilPre_Jud = sbtOut.Out1Dash_x_LED_OilPre_Jud;	//油压灯输出
        dashboardService.Dout.Out1Dash_x_LED_BATTFault_Jud = sbtOut.Out1Dash_x_LED_BATTFault_Jud;//	蓄电池灯输出
        dashboardService.Dout.Out1Dash_x_LED_SafeBelt_Jud = sbtOut.Out1Dash_x_LED_SafeBelt_Jud;//安全带灯输出
        dashboardService.Dout.Out1Sen_x_OilVolume_x_x = sbtOut.Out1Sen_x_OilVolume_x_x;//油量
        dashboardService.Dout.Out1EngM_x_VehSpeed_x_x = sbtOut.Out1EngM_x_VehSpeed_x_x;//	车速
        dashboardService.Dout.Out1EngM_x_EngSpeed_x_x = sbtOut.Out1EngM_x_EngSpeed_x_x;//	发动机转速
		//dashboardService.Dout.Out1EngM_x_EngSpeed_x_x = sbtOut.Out1Dia_x_RPM_x_x;//	发动机转速(柴油专用)
		dashboardService.Dout.Out1Sen_x_CoolantTemp_x_x = sbtOut.Out1Sen_x_CoolantTemp_x_x;//	冷却温度
		
//		console.log(dashboardService.Dout.Out1Dash_x_LED_OilPre_Jud)
		//诊断仪输出=========================================================
        obdscanService.Mout.Out1EngM_x_VehSpeed_x_x = formatInt(sbtOut.Out1EngM_x_VehSpeed_x_x);//	车速
        obdscanService.Mout.Out1EngM_x_EngSpeed_x_x = formatInt(sbtOut.Out1EngM_x_EngSpeed_x_x);//	发动机转速
        obdscanService.Mout.Out1EngM_x_CalcLoad_x_x = formatFloatt(sbtOut.Out1EngM_x_CalcLoad_x_x);//	计算负荷
        obdscanService.Mout.Out1EngM_x_VehLoad_x_x = formatFloatt(sbtOut.Out1EngM_x_VehLoad_x_x);//	整车负荷
        obdscanService.Mout.Out1EngM_x_MAF_x_x = formatFloatTwo(sbtOut.Out1EngM_x_MAF_x_x);//	空气流量
        obdscanService.Mout.Out1EngM_x_AtmoPre_x_x = formatFloatt(sbtOut.Out1EngM_x_AtmoPre_x_x);//	大气压力
        obdscanService.Mout.Out1Sen_x_CoolantTemp_x_x = formatFloatt(sbtOut.Out1Sen_x_CoolantTemp_x_x);//	冷却温度
        obdscanService.Mout.Out1Sen_x_IntakeAir_x_x = formatInt(sbtOut.Out1Sen_x_IntakeAir_x_x);//	进气温度
        obdscanService.Mout.Out1EngM_x_EngRunTime_x_x = formatInt(sbtOut.Out1EngM_x_EngRunTime_x_x);//	发动机运行时间
        obdscanService.Mout.Out1Sen_x_InitEngCoolTemp_x_x = formatFloatt(sbtOut.Out1Sen_x_InitEngCoolTemp_x_x);//	初始冷却温度
        obdscanService.Mout.Out1Sen_x_InitIntakeAirTemp_x_x = formatFloatt(sbtOut.Out1Sen_x_InitIntakeAirTemp_x_x);//	初始进气温度
        obdscanService.Mout.Out1Sen_x_BattVolt_x_x = formatFloatOne(sbtOut.Out1Sen_x_BattVolt_x_x);//	电池电压
        obdscanService.Mout.Out1Sen_x_AccelSensNo1 = formatFloatOne(sbtOut.Out1Sen_x_AccelSensNo1);//:1,//#加速踏板绝对位置
        obdscanService.Mout.Out1Sen_x_AccelSensNo2 = formatFloatOne(sbtOut.Out1Sen_x_AccelSensNo2);//	2#加速踏板绝对位置
        obdscanService.Mout.Out1Sen_x_TpsSensorVlt_x_x = formatFloatOne(sbtOut.Out1Sen_x_TpsSensorVlt_x_x);//:1,//#节气门传感器位置
        obdscanService.Mout.Out1Sen_x_TpsSensor2Vlt_x_x = formatFloatOne(sbtOut.Out1Sen_x_TpsSensor2Vlt_x_x);//	2#节气门传感器位置
        obdscanService.Mout.Out1Sen_x_TpsIdlePosition_x_x = formatFloatt(sbtOut.Out1Sen_x_TpsIdlePosition_x_x);//	节气门怠速位置
        obdscanService.Mout.Out1Sen_x_TpsReqPosition_x_x = formatFloatt(sbtOut.Out1Sen_x_TpsReqPosition_x_x);//	节气门请求位置
        obdscanService.Mout.Out1Sen_x_TpsSenPosition_x_x = formatFloatt(sbtOut.Out1Sen_x_TpsSenPosition_x_x);//	节气门绝对传感器位置
        obdscanService.Mout.Out1Sen_x_TpsPositionNo1_x_x = formatFloatOne(sbtOut.Out1Sen_x_TpsPositionNo1_x_x);//:1,//#节气门位置电压
        obdscanService.Mout.Out1Sen_x_TpsPositionNo2_x_x = formatFloatOne(sbtOut.Out1Sen_x_TpsPositionNo2_x_x);//	2#节气门位置电压
        obdscanService.Mout.Out1Sen_x_TpsPositionComm_x_x = formatFloatt(sbtOut.Out1Sen_x_TpsPositionComm_x_x);//	节气门位置信号命令
        obdscanService.Mout.Out1Sen_x_SensOpenPos1_x_x = formatFloatt(sbtOut.Out1Sen_x_SensOpenPos1_x_x);//:1,//#节气门开启位置
        obdscanService.Mout.Out1Sen_x_SensOpenPos2_x_x = formatFloatt(sbtOut.Out1Sen_x_SensOpenPos2_x_x);//	2#节气门开启位置
        obdscanService.Mout.Out1Sen_x_TpsMCurrent_x_x = formatFloatt(sbtOut.Out1Sen_x_TpsMCurrent_x_x);//	节气门执行器电流
        obdscanService.Mout.Out1Sen_x_TpsMDuty_x_x = formatFloatt(sbtOut.Out1Sen_x_TpsMDuty_x_x);//	节气门电机占空比
        obdscanService.Mout.Out1Sen_x_TpsMDutyOpen_x_x = formatFloatt(sbtOut.Out1Sen_x_TpsMDutyOpen_x_x);//	节气门占空比（开启）
        obdscanService.Mout.Out1Sen_x_TpsMDutyClose_x_x = formatFloatt(sbtOut.Out1Sen_x_TpsMDutyClose_x_x);//	节气门占空比（关闭）
        obdscanService.Mout.Out1Sen_x_TpsFuCloLearn_x_x = formatFloatt(sbtOut.Out1Sen_x_TpsFuCloLearn_x_x);//	节气门全关学习值
        obdscanService.Mout.Out1EngM_x_InjecPort_x_x = formatFloatTwo(sbtOut.Out1EngM_x_InjecPort_x_x);//:1,//缸喷油时间
        obdscanService.Mout.Out1EngM_x_InjecVolCyl_x_x = formatFloatt(sbtOut.Out1EngM_x_InjecVolCyl_x_x);//:1,//缸喷油量
        obdscanService.Mout.Out1Sen_x_OPSpeedStatus_x_x = formatFloatt(sbtOut.Out1Sen_x_OPSpeedStatus_x_x);//	燃油泵状态
        obdscanService.Mout.Out1EngM_x_EvapVSV_x_x = formatFloatOne(sbtOut.Out1EngM_x_EvapVSV_x_x);//	EVAP净化VSV占空比
        obdscanService.Mout.Out1EngM_x_EvapPurFlow_x_x = formatFloatOne(sbtOut.Out1EngM_x_EvapPurFlow_x_x);//	EVAP净化流量
        obdscanService.Mout.Out1EngM_x_PurDenLeaVal_x_x = formatFloatt(sbtOut.Out1EngM_x_PurDenLeaVal_x_x);//	净化密度学习值
        obdscanService.Mout.Out1EngM_x_EvapPurgeVSV_x_x = formatFloatt(sbtOut.Out1EngM_x_EvapPurgeVSV_x_x);//	EVAP控制的VSV状态
        obdscanService.Mout.Out1EngM_x_TarAFRatio_x_x = formatFloatt(sbtOut.Out1EngM_x_TarAFRatio_x_x);//	目标空燃比
        obdscanService.Mout.Out1EngM_x_AFLamB1S1_x_x = formatFloatt(sbtOut.Out1EngM_x_AFLamB1S1_x_x);//	实际空燃比
        obdscanService.Mout.Out1Sen_x_AFSVltB1S1_x_x = formatFloatTwo(sbtOut.Out1Sen_x_AFSVltB1S1_x_x);//	空燃比电压
        obdscanService.Mout.Out1Sen_x_AFSCurrentB1S1_x_x = formatFloatTwo(sbtOut.Out1Sen_x_AFSCurrentB1S1_x_x);//	空燃比电流
        obdscanService.Mout.Out1Sen_x_O2SB1S2_x_x = formatFloatTwo(sbtOut.Out1Sen_x_O2SB1S2_x_x);//	加热型氧传感器电压
        obdscanService.Mout.Out1EngM_x_FuelSFT_x_x = formatFloatOne(sbtOut.Out1EngM_x_FuelSFT_x_x);//	短期燃油修正
        obdscanService.Mout.Out1EngM_x_FuelLFT_x_x = formatFloatOne(sbtOut.Out1EngM_x_FuelLFT_x_x);//	长期燃油修正
        obdscanService.Mout.Out1EngM_x_TotalFT1_x_x = formatFloatt(sbtOut.Out1EngM_x_TotalFT1_x_x);//	总燃油修正
        obdscanService.Mout.Out1Sen_x_FuelSysStatus1_x_x = formatFloatt(sbtOut.Out1Sen_x_FuelSysStatus1_x_x);//	燃油系统状态1
        obdscanService.Mout.Out1Sen_x_FuelSysStatus2_x_x = formatFloatt(sbtOut.Out1Sen_x_FuelSysStatus2_x_x);//	燃油系统状态2
        obdscanService.Mout.Out1EngM_x_IgnAdvance_x_x = formatFloatOne(sbtOut.Out1EngM_x_IgnAdvance_x_x);//	点火提前角
        obdscanService.Mout.Out1Sen_x_KnockFedbackVal_x_x = formatFloatt(sbtOut.Out1Sen_x_KnockFedbackVal_x_x);//	爆震反馈值
        obdscanService.Mout.Out1Sen_x_KnockCorrLeaVal_x_x = formatFloatt(sbtOut.Out1Sen_x_KnockCorrLeaVal_x_x);//	爆震校正学习值
        obdscanService.Mout.Out1Sen_x_CataTempB1S1_x_x = formatFloatt(sbtOut.Out1Sen_x_CataTempB1S1_x_x);//	催化器温度
        obdscanService.Mout.Out1Sen_x_CataTempB1S2_x_x = formatFloatt(sbtOut.Out1Sen_x_CataTempB1S2_x_x);//	催化器温度
        obdscanService.Mout.Out1Sen_x_StarterSig_x_x = formatFloatt(sbtOut.Out1Sen_x_StarterSig_x_x);//	启动开关信号
        obdscanService.Mout.Out1Sen_x_StarterCtrl_x_x = formatFloatt(sbtOut.Out1Sen_x_StarterCtrl_x_x);//	启动开关状态
        obdscanService.Mout.Out1Sen_x_PowSteerSig_x_x = formatFloatt(sbtOut.Out1Sen_x_PowSteerSig_x_x);//	动力转向信号
        obdscanService.Mout.Out1Sen_x_StartRelay_x_x = formatFloatt(sbtOut.Out1Sen_x_StartRelay_x_x);//	启动机继电器状态
        obdscanService.Mout.Out1Sen_x_PowStSigRec_x_x = formatFloatt(sbtOut.Out1Sen_x_PowStSigRec_x_x);//	转向信号记录
        obdscanService.Mout.Out1Sen_x_ACCRelay_x_x = formatFloatt(sbtOut.Out1Sen_x_ACCRelay_x_x);//	ACC继电器状态
        obdscanService.Mout.Out1Sen_x_NeuPosSWSig_x_x = formatFloatt(sbtOut.Out1Sen_x_NeuPosSWSig_x_x);//	空挡位置开关信号
        obdscanService.Mout.Out1Sen_x_StopLightSw_x_x = formatFloatt(sbtOut.Out1Sen_x_StopLightSw_x_x);//	制动灯开关信号
        obdscanService.Mout.Out1Sen_x_ACSignal_x_x = formatFloatt(sbtOut.Out1Sen_x_ACSignal_x_x);//	A/C信号
        obdscanService.Mout.Out1Sen_x_CloseTpsPosSw_x_x = formatFloatt(sbtOut.Out1Sen_x_CloseTpsPosSw_x_x);//	关闭阀门位置状态
        obdscanService.Mout.Out1Sen_x_FuelCutCond_x_x = formatFloatt(sbtOut.Out1Sen_x_FuelCutCond_x_x);//	燃油切断状态
        obdscanService.Mout.Out1Sen_x_ImmoCommu_x_x = formatFloatt(sbtOut.Out1Sen_x_ImmoCommu_x_x);//	防盗通信
        obdscanService.Mout.Out1Sen_x_ElecLoadSig_x_x = formatFloatt(sbtOut.Out1Sen_x_ElecLoadSig_x_x);//	电子负载信号
        obdscanService.Mout.Out1Sen_x_CodeIncluHis_x_x = formatFloatt(sbtOut.Out1Sen_x_CodeIncluHis_x_x);//	故障码历史
        obdscanService.Mout.Out1Sen_x_MilOnRunDis_x_x = formatFloatt(sbtOut.Out1Sen_x_MilOnRunDis_x_x);//	MIL亮起后行驶距离
        obdscanService.Mout.Out1Sen_x_RunTimMilOn_x_x = formatFloatt(sbtOut.Out1Sen_x_RunTimMilOn_x_x);//	MIL亮起后行驶时间
        obdscanService.Mout.Out1Sen_x_TimAftDTCCle_x_x = formatFloatt(sbtOut.Out1Sen_x_TimAftDTCCle_x_x);//	清除DTC后的时间
        obdscanService.Mout.Out1Sen_x_DisFroDTCCle_x_x = formatFloatt(sbtOut.Out1Sen_x_DisFroDTCCle_x_x);//	DTC清除后行驶距离
        obdscanService.Mout.Out1Sen_x_WarCycCleDTC_x_x = formatFloatt(sbtOut.Out1Sen_x_WarCycCleDTC_x_x);//	清除DTC后的暖机循环
        obdscanService.Mout.Out1Sen_x_TCandTE1_x_x = formatFloatt(sbtOut.Out1Sen_x_TCandTE1_x_x);//
        obdscanService.Mout.Out1Sen_x_IgnTrigCount_x_x = formatInt(sbtOut.Out1Sen_x_IgnTrigCount_x_x);//	点火计数
        obdscanService.Mout.Out1Sen_x_Cyl1MisCount_x_x = formatInt(sbtOut.Out1Sen_x_Cyl1MisCount_x_x);//:1,//缸缺火率
        obdscanService.Mout.Out1Sen_x_Cyl2MisCount_x_x = formatInt(sbtOut.Out1Sen_x_Cyl2MisCount_x_x);//	2缸缺火率
        obdscanService.Mout.Out1Sen_x_Cyl3MisCount_x_x = formatInt(sbtOut.Out1Sen_x_Cyl3MisCount_x_x);//	3缸缺火率
        obdscanService.Mout.Out1Sen_x_Cyl4MisCount_x_x = formatInt(sbtOut.Out1Sen_x_Cyl4MisCount_x_x);//	4缸缺火率
        obdscanService.Mout.Out1Sen_x_AllCylMisCount_x_x = formatInt(sbtOut.Out1Sen_x_AllCylMisCount_x_x);//	所有缸缺火率
        obdscanService.Mout.Out1Sen_x_MisfireRPM_x_x = formatFloatt(sbtOut.Out1Sen_x_MisfireRPM_x_x);//	缺火时平均转速
        obdscanService.Mout.Out1Sen_x_MisfireLoad_x_x = formatFloatt(sbtOut.Out1Sen_x_MisfireLoad_x_x);//	缺火时平均负荷
        obdscanService.Mout.Out1Sen_x_MisfireMargin_x_x = formatFloatt(sbtOut.Out1Sen_x_MisfireMargin_x_x);//	失火边界
        obdscanService.Mout.Out1Sen_x_ElecFanMotor_x_x = formatFloatt(sbtOut.Out1Sen_x_ElecFanMotor_x_x);//	电子风扇电机
        obdscanService.Mout.Out1Sen_x_IdleFuelCut_x_x = formatFloatt(sbtOut.Out1Sen_x_IdleFuelCut_x_x);//	怠速燃油切断
        obdscanService.Mout.Out1Sen_x_FCTAU_x_x = formatFloatt(sbtOut.Out1Sen_x_FCTAU_x_x);//	极小负荷时燃油切断
        obdscanService.Mout.Out1Sen_x_SPDNT_x_x = formatFloatt(sbtOut.Out1Sen_x_SPDNT_x_x);//	输入轴转速
        obdscanService.Mout.Out1Sen_x_OverCutSw_x_x = formatFloatt(sbtOut.Out1Sen_x_OverCutSw_x_x);//	超负荷燃油切断
        obdscanService.Mout.Out1Sen_x_ShSwStPrange_x_x = formatFloatt(sbtOut.Out1Sen_x_ShSwStPrange_x_x);//	P档位
        obdscanService.Mout.Out1Sen_x_ShSwStRrange_x_x = formatFloatt(sbtOut.Out1Sen_x_ShSwStRrange_x_x);//	R档位
        obdscanService.Mout.Out1Sen_x_ShSwSt2range_x_x = formatFloatt(sbtOut.Out1Sen_x_ShSwSt2range_x_x);//	2档位
        obdscanService.Mout.Out1Sen_x_ShSwStLrange_x_x = formatFloatt(sbtOut.Out1Sen_x_ShSwStLrange_x_x);//	L档位
        obdscanService.Mout.Out1Sen_x_ShSwStNrange_x_x = formatFloatt(sbtOut.Out1Sen_x_ShSwStNrange_x_x);//	N档位
        obdscanService.Mout.Out1Sen_x_ShSwStDrange_x_x = formatFloatt(sbtOut.Out1Sen_x_ShSwStDrange_x_x);//	D档位
        obdscanService.Mout.Out1Sen_x_ShSwSt3range_x_x = formatFloatt(sbtOut.Out1Sen_x_ShSwSt3range_x_x);//	3档位
        obdscanService.Mout.Out1Sen_x_ATOilTemp_x_x = formatFloatt(sbtOut.Out1Sen_x_ATOilTemp_x_x);//	ATF温度传感器值
        obdscanService.Mout.Out1Sen_x_LockUp_x_x = formatFloatt(sbtOut.Out1Sen_x_LockUp_x_x);//	ECT锁止信号
        obdscanService.Mout.Out1Sen_x_STSoleSt_x_x = formatFloatt(sbtOut.Out1Sen_x_STSoleSt_x_x);//	锁止电磁阀ST状态
        obdscanService.Mout.Out1Sen_x_LockUpSoSt_x_x = formatFloatt(sbtOut.Out1Sen_x_LockUpSoSt_x_x);//	锁止电磁阀ST状态
        obdscanService.Mout.Out1Sen_x_ShiftSt_x_x = formatFloatt(sbtOut.Out1Sen_x_ShiftSt_x_x);//	实际档位
        obdscanService.Mout.Out1Sen_x_SLTSoleSt_x_x = formatFloatt(sbtOut.Out1Sen_x_SLTSoleSt_x_x);//	换挡电磁阀SLU状态
        obdscanService.Mout.Out1Sen_MAF_THA_x_x = sbtOut.Out1Sen_MAF_THA_x_x;//	MAF故障码
        obdscanService.Mout.Out1Sen_MAF_THALow_x_x = sbtOut.Out1Sen_MAF_THALow_x_x;//
        obdscanService.Mout.Out1Sen_MAF_THAHign_x_x = sbtOut.Out1Sen_MAF_THAHign_x_x;//
        obdscanService.Mout.Out1Sen_MAF_Code_x_x = sbtOut.Out1Sen_MAF_Code_x_x;//
        obdscanService.Mout.Out1Sen_MAF_Low_x_x = sbtOut.Out1Sen_MAF_Low_x_x;//
        obdscanService.Mout.Out1Sen_MAF_High_x_x = sbtOut.Out1Sen_MAF_High_x_x;//
        obdscanService.Mout.Out1Sen_PVSV_Circuit_x_x = sbtOut.Out1Sen_PVSV_Circuit_x_x;//	电磁阀故障码
        obdscanService.Mout.Out1Sen_APP_DCircuit_x_x = sbtOut.Out1Sen_APP_DCircuit_x_x;//	油门踏板故障码
        obdscanService.Mout.Out1Sen_APP_DLow_x_x = sbtOut.Out1Sen_APP_DLow_x_x;//
        obdscanService.Mout.Out1Sen_APP_DHigh_x_x = sbtOut.Out1Sen_APP_DHigh_x_x;//
        obdscanService.Mout.Out1Sen_APP_E_x_x = sbtOut.Out1Sen_APP_E_x_x;//
        obdscanService.Mout.Out1Sen_APP_ELow_x_x = sbtOut.Out1Sen_APP_ELow_x_x;//
        obdscanService.Mout.Out1Sen_APP_EHigh_x_x = sbtOut.Out1Sen_APP_EHigh_x_x;//
        obdscanService.Mout.Out1Sen_APP_DandEVltCorr_x_x = sbtOut.Out1Sen_APP_DandEVltCorr_x_x;//
        obdscanService.Mout.Out1Sen_APP_DPerf_x_x = sbtOut.Out1Sen_APP_DPerf_x_x;//
        obdscanService.Mout.Out1Sen_AF_Low_x_x = sbtOut.Out1Sen_AF_Low_x_x;//	AF传感器故障码
        obdscanService.Mout.Out1Sen_AF_Hign_x_x = sbtOut.Out1Sen_AF_Hign_x_x;//
        obdscanService.Mout.Out1Sen_AF_SignalThick_x_x = sbtOut.Out1Sen_AF_SignalThick_x_x;//
        obdscanService.Mout.Out1Sen_AF_SignalThin_x_x = sbtOut.Out1Sen_AF_SignalThin_x_x;//
        obdscanService.Mout.Out1Sen_AF_PumpCurr_x_x = sbtOut.Out1Sen_AF_PumpCurr_x_x;//
        obdscanService.Mout.Out1Sen_AF_PumpCurrLow_x_x = sbtOut.Out1Sen_AF_PumpCurrLow_x_x;//
        obdscanService.Mout.Out1Sen_AF_PumpCurrHigh_x_x = sbtOut.Out1Sen_AF_PumpCurrHigh_x_x;//
        obdscanService.Mout.Out1Sen_AF_GNDLow_x_x = sbtOut.Out1Sen_AF_GNDLow_x_x;//
        obdscanService.Mout.Out1Sen_AF_GNDHighLow_x_x = sbtOut.Out1Sen_AF_GNDHighLow_x_x;//
        obdscanService.Mout.Out1Sen_AF_ResSlow_x_x = sbtOut.Out1Sen_AF_ResSlow_x_x;//
        obdscanService.Mout.Out1Sen_TPS_ACircuit_x_x = sbtOut.Out1Sen_TPS_ACircuit_x_x;//	节气门故障码
        obdscanService.Mout.Out1Sen_TPS_ALow_x_x = sbtOut.Out1Sen_TPS_ALow_x_x;//
        obdscanService.Mout.Out1Sen_TPS_AHigh_x_x = sbtOut.Out1Sen_TPS_AHigh_x_x;//
        obdscanService.Mout.Out1Sen_TPS_BCircuit_x_x = sbtOut.Out1Sen_TPS_BCircuit_x_x;//
        obdscanService.Mout.Out1Sen_TPS_BLow_x_x = sbtOut.Out1Sen_TPS_BLow_x_x;//
        obdscanService.Mout.Out1Sen_TPS_BHigh_x_x = sbtOut.Out1Sen_TPS_BHigh_x_x;//
        obdscanService.Mout.Out1Sen_TPS_ABVltCorr_x_x = sbtOut.Out1Sen_TPS_ABVltCorr_x_x;//
        obdscanService.Mout.Out1Sen_TPS_APerf_x_x = sbtOut.Out1Sen_TPS_APerf_x_x;//
        obdscanService.Mout.Out1Sen_TPS_MLow_x_x = sbtOut.Out1Sen_TPS_MLow_x_x;//
        obdscanService.Mout.Out1Sen_TPS_MHigh_x_x = sbtOut.Out1Sen_TPS_MHigh_x_x;//
        obdscanService.Mout.Out1Sen_TPS_MCtrlOpenPos_x_x = sbtOut.Out1Sen_TPS_MCtrlOpenPos_x_x;//
        obdscanService.Mout.Out1Sen_TPS_MCtrlClosePos_x_x = sbtOut.Out1Sen_TPS_MCtrlClosePos_x_x;//
        obdscanService.Mout.Out1Sen_TPS_MPerf_x_x = sbtOut.Out1Sen_TPS_MPerf_x_x;//
        obdscanService.Mout.Out1Sen_TPS_MPerf1_x_x = sbtOut.Out1Sen_TPS_MPerf1_x_x;//
        obdscanService.Mout.Out1Sen_Cool_x_x_x = sbtOut.Out1Sen_Cool_x_x_x;//	冷却温度故障码
        obdscanService.Mout.Out1Sen_Cool_Low_x_x = sbtOut.Out1Sen_Cool_Low_x_x;//
        obdscanService.Mout.Out1Sen_Cool_High_x_x = sbtOut.Out1Sen_Cool_High_x_x;//
        obdscanService.Mout.Out1Sen_Cool_Perf_x_x = sbtOut.Out1Sen_Cool_Perf_x_x;//
        obdscanService.Mout.Out1Sen_ICAM_x_x_x = sbtOut.Out1Sen_ICAM_x_x_x;//	进排气凸轮轴故障码
        obdscanService.Mout.Out1Sen_ICAM_ALow_x_x = sbtOut.Out1Sen_ICAM_ALow_x_x;//
        obdscanService.Mout.Out1Sen_ICAM_AHigh_x_x = sbtOut.Out1Sen_ICAM_AHigh_x_x;//
        obdscanService.Mout.Out1Sen_ECAM_x_x_x = sbtOut.Out1Sen_ECAM_x_x_x;//
        obdscanService.Mout.Out1Sen_ECAM_BLow_x_x = sbtOut.Out1Sen_ECAM_BLow_x_x;//
        obdscanService.Mout.Out1Sen_ECAM_BHigh_x_x = sbtOut.Out1Sen_ECAM_BHigh_x_x;//
        obdscanService.Mout.Out1Sen_4Cyl_Misfire_x_x = sbtOut.Out1Sen_4Cyl_Misfire_x_x;//	失火故障码
        obdscanService.Mout.Out1Sen_3Cyl_Misfire_x_x = sbtOut.Out1Sen_3Cyl_Misfire_x_x;//
        obdscanService.Mout.Out1Sen_2Cyl_Misfire_x_x = sbtOut.Out1Sen_2Cyl_Misfire_x_x;//
        obdscanService.Mout.Out1_1Cyl_Misfire_Code = sbtOut.Out1_1Cyl_Misfire_Code;//
        obdscanService.Mout.Out1Sen_ManyCyl_Misfire_x_x = sbtOut.Out1Sen_ManyCyl_Misfire_x_x;//
        obdscanService.Mout.Out1Sen_System_TooThin_x_x = sbtOut.Out1Sen_System_TooThin_x_x;//	系统故障码
        obdscanService.Mout.Out1Sen_IC_ConnOne_x_x = sbtOut.Out1Sen_IC_ConnOne_x_x;//	点火故障码
        obdscanService.Mout.Out1Sen_IC_ConnTwo_x_x = sbtOut.Out1Sen_IC_ConnTwo_x_x;//
        obdscanService.Mout.Out1Sen_IC_ConnThree_x_x = sbtOut.Out1Sen_IC_ConnThree_x_x;//
        obdscanService.Mout.Out1Sen_IC_ConnFour_x_x = sbtOut.Out1Sen_IC_ConnFour_x_x;//
        obdscanService.Mout.Out1Sen_Crank_x_x_x = sbtOut.Out1Sen_Crank_x_x_x;//	曲轴故障码
        obdscanService.Mout.Out1Sen_Knock_1BHigh_x_x = sbtOut.Out1Sen_Knock_1BHigh_x_x;//	爆震故障码
        obdscanService.Mout.Out1Sen_Knock_1BLow_x_x = sbtOut.Out1Sen_Knock_1BLow_x_x;//
        obdscanService.Mout.Out1Sen_Oxgen_HeatCtrlLow_x_x = sbtOut.Out1Sen_Oxgen_HeatCtrlLow_x_x;//	氧传感器加热器故障码
        obdscanService.Mout.Out1Sen_CAM_Aactutor_x_x = sbtOut.Out1Sen_CAM_Aactutor_x_x;//	凸轮轴故障码
        obdscanService.Mout.Out1Sen_CAM_AtimAdv_x_x = sbtOut.Out1Sen_CAM_AtimAdv_x_x;//
        obdscanService.Mout.Out1Sen_CAM_Bactutor_x_x = sbtOut.Out1Sen_CAM_Bactutor_x_x;//
        obdscanService.Mout.Out1Sen_CAM_BtimAdv_x_x = sbtOut.Out1Sen_CAM_BtimAdv_x_x;
        	//新加的参数
        obdscanService.Mout.Out1PW_DrSiDoor_ECU_Com_x = sbtOut.Out1PW_DrSiDoor_ECU_Com_x;
        obdscanService.Mout.Out1PW_DrDoor_Auto_SW_x = sbtOut.Out1PW_DrDoor_Auto_SW_x;
        obdscanService.Mout.Out1PW_DrDoor_Manul_Up_x = sbtOut.Out1PW_DrDoor_Manul_Up_x;
        obdscanService.Mout.Out1PW_DrDoor_Manul_Down_x = sbtOut.Out1PW_DrDoor_Manul_Down_x;
//      console.log(obdscanService.Mout.Out1DFC_OilPropVlv_x_x_x);
//      console.log(sbtOut.Out1Veh_Dr_SwtDrLck_x_Lck+"--"+sbtOut.Out1Veh_Dr_SwtDrLck_x_ULck+"--"+sbtOut.Out1Veh_Dr_SwtKey_x_Lck+"--"+sbtOut.Out1Veh_Dr_SwtKey_x_Ulck+"--"+sbtOut.Out1Veh_Dr_Lck_FrtR_x+"--"+sbtOut.Out1Veh_Dr_Lck_RrL_x+"--"+sbtOut.Out1Veh_Dr_Lck_RrR_x);
        
    };
        //取整函数
        function formatInt(src) {
			return parseInt(src);
		}
        //保留一位小数
        function formatFloatOne(src){
        	var aVal=src.toString().split('.');
        	var aFloat=[''];
        	if(aVal[1]){
        		aFloat=aVal[1].split('');
        	}
        	if(aFloat[0]){
        		//如果原来就有一位或一位以上小数点
        		return aVal[0]+'.'+aFloat[0]
        	}else{
        		//如果原来就是整数
        		return aVal[0]+'.0'
        	}
        }
        //保留两位小数
        function formatFloatTwo(src){
        	var aVal=src.toString().split('.');
        	var aFloat=[''];
        	if(aVal[1]){
        		aFloat=aVal[1].split('');
        	}
        	if(aFloat[1]){
        		//如果原来就有两位或两位以上小数点
        		return aVal[0]+'.'+aFloat[0]+aFloat[1];
        	}else if(aFloat[0]){
        		//如果原来就有一位或一位以上小数点
        		return aVal[0]+'.'+aFloat[0]+'0';
        	}else{
        		//如果原来就是整数
        		return aVal[0]+'.00'
        	}
        }
        //保留三维小数
       function formatFloatt(src) {
			if (src.toString().split(".")[0] == 0) {
				var num = new Number(src);
				return num.toFixed(3);
			} else {
				var num = new Number(src);
				return num.toPrecision(4);
			}
		}
        
        
        
		function formatFloat(src) {
			//加上特殊热区点
			if((multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x == "1")&&(multimeterService.Mint.In1MultiLogic_x_Black_x_x=='4123')&&(multimeterService.Mint.In1MultiLogic_x_Red_x_x=='4124')){
				multimeterService.Mdata.multimeterScreenUnit = "MΩ";
				return "1.000";
			}
			if (multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x == "1" && sbtOut.Out1MultiLogic_x_ToScreen_x_x == "1") {
				multimeterService.Mdata.multimeterScreenUnit = "";
				return "1.";
			} else {
				if (multimeterService.Mint.In1MultiLogic_x_DCmVlt_x_x == "1") {
					if (src == 0) {
						multimeterService.Mdata.multimeterScreenUnit = "mV";
						return "0.000";
					} else {
						multimeterService.Mdata.multimeterScreenUnit = "";
						return "1.";
					}
				} else {
					if (multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x == "1" && multimeterService.Mout.Out1MultiLogic_x_ToScreen_x_x != "1.") {
		
						multimeterService.Mdata.multimeterScreenUnit = "Ω";
					}
					var reg = /.*\..*/
					if (src >= 0) {
		
						if (reg.test(src)) {
							if (src.toString().split(".")[0].length >= 5) {
								var num = src / 1000;
								if (multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x == "1") {
									multimeterService.Mdata.multimeterScreenUnit = "kΩ";
								};
								return num.toPrecision(4);
							} else {
								if (src.toString().split(".")[0] == 0) {
									var num = new Number(src);
									return num.toFixed(3);
								} else {
									var num = new Number(src);
									return num.toPrecision(4);
								}
							}
		
		
						} else {
							if (multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x == "1") {
		
							}
							if (src.toString().length >= 5) {
								var num = src / 1000;
								if (multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x == "1") {
									multimeterService.Mdata.multimeterScreenUnit = "kΩ";
								}
								return num.toPrecision(4);
							} else {
		
								var num = new Number(src);
								return num.toPrecision(4);
							}
		
						}
					} else {
		
						if (reg.test(src)) {
							if (src.toString().split(".")[0].length >= 4) {
								var num = src / 1000;
								if (multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x == "1") {
									multimeterService.Mdata.multimeterScreenUnit = "kΩ";
								}
								return num.toPrecision(1);
							} else {
								if (src.toString().split(".")[0] == 0) {
									var num = new Number(src);
									return num.toFixed(2);
								} else {
									var num = new Number(src);
									return num.toPrecision(3);
								}
							}
		
		
						} else {
							if (src.toString().length >= 4) {
								var num = src / 1000;
		
								return num.toPrecision(3);
							} else {
								var num = new Number(src);
								return num.toPrecision(3);
							}
		
						}
					}
		
				}
		
			}
		
		
			return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
		}
		//如同救世主一般的代码（插件加载）
		$("#plugin0").removeClass("hide-important");
});




