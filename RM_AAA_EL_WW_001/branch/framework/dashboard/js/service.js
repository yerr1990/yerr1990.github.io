/**
 * @author 谢国亮
 */
dashboardModule.service('dashboardService', function($http, $rootScope, $timeout) {
    var dashboardService =  {};
    dashboardService.Ddata = dashboardService.Ddata || {};
    dashboardService.Dint = dashboardService.Dint || {};
    dashboardService.Dout = dashboardService.Dout || {};
    dashboardService.Ddata = {
        dashboardStatus: false,
        dashboarSmaill: true,
        dashboarstalls: '1',
        isGoCheck:false
    };
    dashboardService.Dint = {
        In1Dash_x_x_SafeBelt_Install: '0',//	安全带安装状态
        In1Sen_x_BrakeSig_x_x: '0',//	制动信号
        In1Sen_x_GearSig_x_x: '1',	//档位信号
        In1Sen_APP_NO1_x_x: '16',//	油门踏板开度
        In1IgnKey_x_LOCK_x_x: '1',//	点火钥匙LOCK档位
        In1IgnKey_x_ACC_x_x: '0',//	点火钥匙ACC档位
        In1IgnKey_x_ON_x_x: '0',//	点火钥匙ON档位
        In1IgnKey_x_START_x_x: '0'//	点火钥匙START档位

    };
    dashboardService.Dout = {
        Out1EngM_x_VehSpeed_x_x: '0',//	车速
        Out1EngM_x_EngSpeed_x_x: '0',//	发动机转速
        Out1Sen_x_CoolantTemp_x_x: '0',//	输出冷却温度
        Out1Dash_x_LED_ABS_Jud: '0',//	ABS灯输出
        Out1Dash_x_LED_Brake_Jud: '1',//	制动灯输出
        Out1Dash_x_LED_SafeBag_Jud: '0',//	安全气囊灯输出
        Out1Dash_x_LED_MIL_Jud: '0',//	发动机故障灯输出
        Out1Dash_x_LED_OilPre_Jud: '0',//	油压灯输出
        Out1Dash_x_LED_BATTFault_Jud: '0',//	蓄电池灯输出
        Out1Dash_x_LED_SafeBelt_Jud: '0',//	安全带灯输出
        Out1Sen_x_OilVolume_x_x:'0'//油箱油量
    }
    return dashboardService;

});
