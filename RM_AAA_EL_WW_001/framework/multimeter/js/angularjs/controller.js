/**
 * @createDate   2015-08-4 下午05:28:38
 * @author       hao liqiang
 * @email        lq.hao@xiaochejiang.com
 * @version      1.0
 */
//万用表的控制器
multimeterModule.controller('multimeterCtrl', ['$scope','$state','$rootScope','multimeterService','$interval', function ($scope,$state,$rootScope,multimeterService,$interval) {
  	$interval(function(){ 
  		$scope.multimeterServiceMdata = multimeterService.Mdata;//万用表service中的基本参数存到controller的$scope中供页面调用
    	$scope.greeting = multimeterService.Mout;//万用表service中的从仿真模型接收到的参数存到controller的$scope中供页面调用
   	},2)
   	$rootScope.multimeter = function () {
   		//被使用的状态码
   		multimeterStay=1;
		//加上触发样式
		$(".right-multimeter").parent().addClass("active");
		//显示热区
		showAHot();
		//记录进度
		$rootScope.recordHistory("HA008");
		
        multimeterService.Mdata.SvgStatus = true;
        multimeterService.Mdata.multimeterStatus = true;//万用表身显示
        multimeterService.Mdata.SvgRedStatus = true;//万用表红表笔和红表线显示
        multimeterService.Mdata.SvgBlackStatus = true;//万用表黑表笔和黑表线显示

        multimeterService.Mdata.freshHontspot();//刷新页面的热区，为表笔接触做准备
        //红表笔drag，通过一个小块热区带动红表笔
        $("#hhjmultimeterRed-hotspot").draggable({
            containment: ".multimeter-contain", //只能在规定范围
            scroll: false,//不出现滚动条
            iframeFix: true,//不受iframe的影响
            cursor: "move",//拖动的鼠标样式
            drag: function (event) {
				
                $("#hhjmultimeterRed").css("top", "" + (parseInt($("#hhjmultimeterRed-hotspot").css("top").replace("px", "")) - 217) + "px");
                $("#hhjmultimeterRed").css("left", "" + (parseInt($("#hhjmultimeterRed-hotspot").css("left").replace("px", ""))) + "px");
                var redLeftInt = parseInt($("#hhjmultimeterRed").css("left").replace("px", "")) + 15,
                    redTopInt = parseInt($("#hhjmultimeterRed").css("top").replace("px", "")) + 5,
                    topInt = parseInt($("#mask-multimeter").css("top").replace("px", "")) + 230,
                    leftInt = parseInt($("#mask-multimeter").css("left").replace("px", "")) + 110,

                    cl = (redLeftInt - 40),
                    ct = (redTopInt - 80);
                /* console.log(window.parent.Param_stasds);*/
                multimeterService.Mdata.multimeterredstartx = leftInt;
                multimeterService.Mdata.multimeterredstarty = topInt;
                multimeterService.Mdata.multimeterredradianx = cl;
                multimeterService.Mdata.multimeterredradiany = ct;
                multimeterService.Mdata.multimeterredstopx = redLeftInt;
                multimeterService.Mdata.multimeterredstopy = redTopInt;
                var redLeftIntt = redLeftInt - 15, redTopIntt = parseInt(redTopInt) + 230;
                $("#path_Red").attr("d", "M" + redLeftInt + " " + redTopInt + " C" + redLeftInt + " " + redTopInt + " " + cl + " " + ct + " " + leftInt + " " + topInt);

            },
            stop: function () {
                if (multimeterService.Mdata.svgRecoverStatus == 1) {
                    multimeterService.Mdata.multimeterredRecover();
                } else {

                    multimeterService.Mdata.svgRecoverStatus = 1;
                }
				//判断是否测量了电阻(两个表针是否都测量了，并且是否打到欧姆档)
				if((multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x=='1')&&(multimeterService.Mdata.Radrepetition!='0')&&(multimeterService.Mdata.Blackrepetition!='0')){
					//创建警告框
					if((parseInt(multimeterService.Mdata.Radrepetition)<=parseInt(4000))){
						$rootScope.createResistanceWarn('此功能不能用');
					}
				}
            }		//alert("drag:"+multimeter_drag_status+"para_sta:"+Param_stasds+"red_sta:"+Param_redstas+"black_sta:"+Param_blackstas+"body:"+multimeter_body+"red"+multimeter_red+"black"+multimeter_black+"");


        });
        //黑表笔drag，通过一个小块热区带动红表笔
        $("#hhjmultimeterBlack-hotspot").draggable({
            containment: ".multimeter-contain",
            scroll: false,
            iframeFix: true,
            cursor: "move",
            drag: function (event) {

                $("#hhjmultimeterBlack").css("top", "" + (parseInt($("#hhjmultimeterBlack-hotspot").css("top").replace("px", "")) - 217) + "px");
                $("#hhjmultimeterBlack").css("left", "" + (parseInt($("#hhjmultimeterBlack-hotspot").css("left").replace("px", ""))) + "px");
                var redLeftInt = parseInt($("#hhjmultimeterBlack").css("left").replace("px", "")) + 10,
                    redTopInt = parseInt($("#hhjmultimeterBlack").css("top").replace("px", "")) + 10,
                    topInt = parseInt($("#mask-multimeter").css("top").replace("px", "")) + 295,
                    leftInt = parseInt($("#mask-multimeter").css("left").replace("px", "")) + 85,
                    cl = (redLeftInt - 40),
                    ct = (redTopInt - 80);
                $("#path_black").attr("d", "M" + redLeftInt + " " + redTopInt + " C" + redLeftInt + " " + redTopInt + " " + cl + " " + ct + " " + leftInt + " " + topInt);

            },

            stop: function () {
                if (multimeterService.Mdata.svgRecoverStatus == 1) {
                    multimeterService.Mdata.multimeterblackRecover();

                } else {

                    multimeterService.Mdata.svgRecoverStatus = 1;
                }
				//判断是否测量了电阻(两个表针是否都测量了，并且是否打到欧姆档)
				if((multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x=='1')&&(multimeterService.Mdata.Radrepetition!='0')&&(multimeterService.Mdata.Blackrepetition!='0')){
					//创建警告框
					if((parseInt(multimeterService.Mdata.Radrepetition)<=parseInt(4000))){
						$rootScope.createResistanceWarn('此功能不能用');
					}
				}
            }
        });
        //整个万用表drag，通过万用表表身带动红表笔
        $("#mask-multimeter").draggable({
            containment: ".multimeter",
            containment: ".main",
            scroll: false,
            cursor: "move",
            iframeFix: true,
            drag: function (event) {


                //当红黑表笔都不在热区上时，万用表整体的拖动
                if (multimeterService.Mdata.multimeter_body == 1 && multimeterService.Mdata.multimeter_red == 1 && multimeterService.Mdata.multimeter_black == 1) {

                    var topInt = parseInt($("#mask-multimeter").css("top").replace("px", "")),
                        leftInt = parseInt($("#mask-multimeter").css("left").replace("px", "")),
                        toppoint = topInt - 80,
                        leftpoint = leftInt - 290;
                    $("#hhjmultimeterRed").css("top", "" + (toppoint + 97) + "px");
                    $("#hhjmultimeterRed").css("left", "" + (leftpoint + 428) + "px");
                    $("#hhjmultimeterBlack").css("top", "" + (toppoint + 97) + "px");
                    $("#hhjmultimeterBlack").css("left", "" + (leftpoint + 272) + "px");
                    $("#hhjmultimeterRed-hotspot").css("top", "" + (toppoint + 311) + "px");
                    $("#hhjmultimeterRed-hotspot").css("left", "" + (leftpoint + 431) + "px");
                    $("#hhjmultimeterBlack-hotspot").css("top", "" + (toppoint + 315) + "px");
                    $("#hhjmultimeterBlack-hotspot").css("left", "" + (leftpoint + 272) + "px");
                    multimeterService.Mdata.Param_redx = leftpoint + 440;
                    multimeterService.Mdata.Param_redy = toppoint + 100;
                    multimeterService.Mdata.Param_redcx = leftpoint + 420;
                    multimeterService.Mdata.Param_redcy = toppoint + 37;
                    multimeterService.Mdata.Param_redpx = leftpoint + 403;
                    multimeterService.Mdata.Param_redpy = toppoint + 375;

                    multimeterService.Mdata.Param_blackx = leftpoint + 282;
                    multimeterService.Mdata.Param_blacky = toppoint + 100;
                    multimeterService.Mdata.Param_blackcx = leftpoint + 302;
                    multimeterService.Mdata.Param_blackcy = toppoint + 37;
                    multimeterService.Mdata.Param_blackpx = leftpoint + 376;
                    multimeterService.Mdata.Param_blackpy = toppoint + 375;
                    $("#path_Red").attr("d", "M" + multimeterService.Mdata.Param_redx + " " + multimeterService.Mdata.Param_redy + " C" + multimeterService.Mdata.Param_redx + " " + multimeterService.Mdata.Param_redy + " " + multimeterService.Mdata.Param_redcx + " " + multimeterService.Mdata.Param_redcy + " " + multimeterService.Mdata.Param_redpx + " " + multimeterService.Mdata.Param_redpy);
                    $("#path_black").attr("d", "M" + multimeterService.Mdata.Param_blackx + " " + multimeterService.Mdata.Param_blacky + " C" + multimeterService.Mdata.Param_blackx + " " + multimeterService.Mdata.Param_blacky + " " + multimeterService.Mdata.Param_blackcx + " " + multimeterService.Mdata.Param_blackcy + " " + multimeterService.Mdata.Param_blackpx + " " + multimeterService.Mdata.Param_blackpy);

                    multimeterService.Mdata.multimeterredstartx = multimeterService.Mdata.Param_redx;
                    multimeterService.Mdata.multimeterredstarty = multimeterService.Mdata.Param_redy;
                    multimeterService.Mdata.multimeterredradianx = multimeterService.Mdata.Param_redcx;
                    multimeterService.Mdata.multimeterredradiany = multimeterService.Mdata.Param_redcy;
                    multimeterService.Mdata.multimeterredstopx = multimeterService.Mdata.Param_redpx;
                    multimeterService.Mdata.multimeterredstopy = multimeterService.Mdata.Param_redpy;

                    multimeterService.Mdata.multimeterblackstartx = multimeterService.Mdata.Param_blackx;
                    multimeterService.Mdata.multimeterblackstarty = multimeterService.Mdata.Param_blacky;
                    multimeterService.Mdata.multimeterblackradianx = multimeterService.Mdata.Param_blackcx;
                    multimeterService.Mdata.multimeterblackradiany = multimeterService.Mdata.Param_blackcy;
                    multimeterService.Mdata.multimeterblackstopx = multimeterService.Mdata.Param_blackpx;
                    multimeterService.Mdata.multimeterblackstopy = multimeterService.Mdata.Param_blackpy;

                }
                ;//当黑表笔都在热区上时，万用表整体的拖动
                if (multimeterService.Mdata.multimeter_body == 1 && multimeterService.Mdata.multimeter_red == 1 && multimeterService.Mdata.multimeter_black == 0) {

                    var blackLeftInt = parseInt($("#hhjmultimeterBlack").css("left").replace("px", "")) + 10,
                        blackTopInt = parseInt($("#hhjmultimeterBlack").css("top").replace("px", "")) + 5,
                        topInt = parseInt($("#mask-multimeter").css("top").replace("px", "")),
                        leftInt = parseInt($("#mask-multimeter").css("left").replace("px", "")),

                        cl = (blackLeftInt - 40),
                        ct = (blackTopInt - 80);


                    toppoint = topInt - 80;
                    leftpoint = leftInt - 290;
                    $("#hhjmultimeterRed").css("top", "" + (toppoint + 97) + "px");
                    $("#hhjmultimeterRed").css("left", "" + (leftpoint + 428) + "px");
                    $("#hhjmultimeterRed-hotspot").css("top", "" + (toppoint + 311) + "px");
                    $("#hhjmultimeterRed-hotspot").css("left", "" + (leftpoint + 431) + "px");
                    /* console.log(toppoint); */
                    multimeterService.Mdata.Param_blackx = blackLeftInt;
                    multimeterService.Mdata.Param_blacky = blackTopInt;
                    multimeterService.Mdata.Param_blackcx = cl;
                    multimeterService.Mdata.Param_blackcy = ct;
                    multimeterService.Mdata.Param_blackpx = leftInt + 90;
                    multimeterService.Mdata.Param_blackpy = topInt + 300;

                    multimeterService.Mdata.multimeterblackstartx = multimeterService.Mdata.Param_blackx;
                    multimeterService.Mdata.multimeterblackstarty = multimeterService.Mdata.Param_blacky;
                    multimeterService.Mdata.multimeterblackradianx = multimeterService.Mdata.Param_blackcx;
                    multimeterService.Mdata.multimeterblackradiany = multimeterService.Mdata.Param_blackcy;
                    multimeterService.Mdata.multimeterblackstopx = multimeterService.Mdata.Param_blackpx;
                    multimeterService.Mdata.multimeterblackstopy = multimeterService.Mdata.Param_blackpy;

                    multimeterService.Mdata.Param_redx = leftpoint + 440;
                    multimeterService.Mdata.Param_redy = toppoint + 100;
                    multimeterService.Mdata.Param_redcx = leftpoint + 420;
                    multimeterService.Mdata.Param_redcy = toppoint + 37;
                    multimeterService.Mdata.Param_redpx = leftpoint + 403;
                    multimeterService.Mdata.Param_redpy = toppoint + 375;

                    multimeterService.Mdata.multimeterredstartx = multimeterService.Mdata.Param_redx;
                    multimeterService.Mdata.multimeterredstarty = multimeterService.Mdata.Param_redy;
                    multimeterService.Mdata.multimeterredradianx = multimeterService.Mdata.Param_redcx;
                    multimeterService.Mdata.multimeterredradiany = multimeterService.Mdata.Param_redcy;
                    multimeterService.Mdata.multimeterredstopx = multimeterService.Mdata.Param_redpx;
                    multimeterService.Mdata.multimeterredstopy = multimeterService.Mdata.Param_redpy;
                    $("#path_Red").attr("d", "M" + multimeterService.Mdata.Param_redx + " " + multimeterService.Mdata.Param_redy + " C" + multimeterService.Mdata.Param_redx + " " + multimeterService.Mdata.Param_redy + " " + multimeterService.Mdata.Param_redcx + " " + multimeterService.Mdata.Param_redcy + " " + multimeterService.Mdata.Param_redpx + " " + multimeterService.Mdata.Param_redpy);
                    $("#path_black").attr("d", "M" + multimeterService.Mdata.Param_blackx + " " + multimeterService.Mdata.Param_blacky + " C" + multimeterService.Mdata.Param_blackx + " " + multimeterService.Mdata.Param_blacky + " " + multimeterService.Mdata.Param_blackcx + " " + multimeterService.Mdata.Param_blackcy + " " + multimeterService.Mdata.Param_blackpx + " " + multimeterService.Mdata.Param_blackpy);


                }//当红表笔都在热区上时，万用表整体的拖动
                if (multimeterService.Mdata.multimeter_body == 1 && multimeterService.Mdata.multimeter_red == 0 && multimeterService.Mdata.multimeter_black == 1) {
                    multimeterService.Mdata.Param_stasds = 1;
                    var redLeftInt = parseInt($("#hhjmultimeterRed").css("left").replace("px", "")) + 10,
                        redTopInt = parseInt($("#hhjmultimeterRed").css("top").replace("px", "")) - 104,
                        topInt = parseInt($("#mask-multimeter").css("top").replace("px", "")),
                        leftInt = parseInt($("#mask-multimeter").css("left").replace("px", "")),

                        cl = (redLeftInt - 40),
                        ct = (redTopInt - 80);


                    toppoint = topInt - 80;
                    leftpoint = leftInt - 290;
                    $("#hhjmultimeterBlack").css("top", "" + (toppoint + 97) + "px");
                    $("#hhjmultimeterBlack").css("left", "" + (leftpoint + 272) + "px");
                    $("#hhjmultimeterBlack-hotspot").css("top", "" + (toppoint + 315) + "px");
                    $("#hhjmultimeterBlack-hotspot").css("left", "" + (leftpoint + 272) + "px");
                    multimeterService.Mdata.Param_redx = redLeftInt;
                    multimeterService.Mdata.Param_redy = redTopInt + 110;
                    multimeterService.Mdata.Param_redcx = cl;
                    multimeterService.Mdata.Param_redcy = ct;
                    multimeterService.Mdata.Param_redpx = leftInt + 114;
                    multimeterService.Mdata.Param_redpy = topInt + 300;

                    multimeterService.Mdata.multimeterredstartx = multimeterService.Mdata.Param_redx;
                    multimeterService.Mdata.multimeterredstarty = multimeterService.Mdata.Param_redy;
                    multimeterService.Mdata.multimeterredradianx = multimeterService.Mdata.Param_redcx;
                    multimeterService.Mdata.multimeterredradiany = multimeterService.Mdata.Param_redcy;
                    multimeterService.Mdata.multimeterredstopx = multimeterService.Mdata.Param_redpx;
                    multimeterService.Mdata.multimeterredstopy = multimeterService.Mdata.Param_redpy;
                    multimeterService.Mdata.Param_blackx = leftpoint + 282;
                    multimeterService.Mdata.Param_blacky = toppoint + 100;
                    multimeterService.Mdata.Param_blackcx = leftpoint + 302;
                    multimeterService.Mdata.Param_blackcy = toppoint + 37;
                    multimeterService.Mdata.Param_blackpx = leftpoint + 376;
                    multimeterService.Mdata.Param_blackpy = toppoint + 375;

                    multimeterService.Mdata.multimeterblackstartx = multimeterService.Mdata.Param_blackx;
                    multimeterService.Mdata.multimeterblackstarty = multimeterService.Mdata.Param_blacky;
                    multimeterService.Mdata.multimeterblackradianx = multimeterService.Mdata.Param_blackcx;
                    multimeterService.Mdata.multimeterblackradiany = multimeterService.Mdata.Param_blackcy;
                    multimeterService.Mdata.multimeterblackstopx = multimeterService.Mdata.Param_blackpx;
                    multimeterService.Mdata.multimeterblackstopy = multimeterService.Mdata.Param_blackpy;
                    $("#path_Red").attr("d", "M" + multimeterService.Mdata.Param_redx + " " + multimeterService.Mdata.Param_redy + " C" + multimeterService.Mdata.Param_redx + " " + multimeterService.Mdata.Param_redy + " " + multimeterService.Mdata.Param_redcx + " " + multimeterService.Mdata.Param_redcy + " " + multimeterService.Mdata.Param_redpx + " " + multimeterService.Mdata.Param_redpy);
                    $("#path_black").attr("d", "M" + multimeterService.Mdata.Param_blackx + " " + multimeterService.Mdata.Param_blacky + " C" + multimeterService.Mdata.Param_blackx + " " + multimeterService.Mdata.Param_blacky + " " + multimeterService.Mdata.Param_blackcx + " " + multimeterService.Mdata.Param_blackcy + " " + multimeterService.Mdata.Param_blackpx + " " + multimeterService.Mdata.Param_blackpy);

                }//当红黑表笔都在热区上时，万用表整体的拖动
                if (multimeterService.Mdata.multimeter_body == 1 && multimeterService.Mdata.multimeter_red == 0 && multimeterService.Mdata.multimeter_black == 0) {

                    var redLeftInt = parseInt($("#hhjmultimeterRed").css("left").replace("px", "")) + 10,
                        redTopInt = parseInt($("#hhjmultimeterRed").css("top").replace("px", "")) - 104,
                        blackLeftInt = parseInt($("#hhjmultimeterBlack").css("left").replace("px", "")) + 10,
                        blackTopInt = parseInt($("#hhjmultimeterBlack").css("top").replace("px", "")) + 10,
                        topInt = parseInt($("#mask-multimeter").css("top").replace("px", "")),
                        leftInt = parseInt($("#mask-multimeter").css("left").replace("px", "")),

                        redcl = (redLeftInt - 40),
                        redct = (redTopInt - 80),
                        blackcl = (blackLeftInt - 40),
                        blackct = (blackTopInt - 80);


                    multimeterService.Mdata.Param_redx = redLeftInt;
                    multimeterService.Mdata.Param_redy = redTopInt + 110;
                    multimeterService.Mdata.Param_redcx = redcl;
                    multimeterService.Mdata.Param_redcy = redct;
                    multimeterService.Mdata.Param_redpx = leftInt + 114;
                    multimeterService.Mdata.Param_redpy = topInt + 300;

                    multimeterService.Mdata.multimeterredstartx = multimeterService.Mdata.Param_redx;
                    multimeterService.Mdata.multimeterredstarty = multimeterService.Mdata.Param_redy;
                    multimeterService.Mdata.multimeterredradianx = multimeterService.Mdata.Param_redcx;
                    multimeterService.Mdata.multimeterredradiany = multimeterService.Mdata.Param_redcy;
                    multimeterService.Mdata.multimeterredstopx = multimeterService.Mdata.Param_redpx;
                    multimeterService.Mdata.multimeterredstopy = multimeterService.Mdata.Param_redpy;

                    multimeterService.Mdata.Param_blackx = blackLeftInt;
                    multimeterService.Mdata.Param_blacky = blackTopInt;
                    multimeterService.Mdata.Param_blackcx = blackcl;
                    multimeterService.Mdata.Param_blackcy = blackct;
                    multimeterService.Mdata.Param_blackpx = leftInt + 90;
                    multimeterService.Mdata.Param_blackpy = topInt + 300;

                    multimeterService.Mdata.multimeterblackstartx = multimeterService.Mdata.Param_blackx;
                    multimeterService.Mdata.multimeterblackstarty = multimeterService.Mdata.Param_blacky;
                    multimeterService.Mdata.multimeterblackradianx = multimeterService.Mdata.Param_blackcx;
                    multimeterService.Mdata.multimeterblackradiany = multimeterService.Mdata.Param_blackcy;
                    multimeterService.Mdata.multimeterblackstopx = multimeterService.Mdata.Param_blackpx;
                    multimeterService.Mdata.multimeterblackstopy = multimeterService.Mdata.Param_blackpy;

                    $(document).find("#path_Red").attr("d", "M" + multimeterService.Mdata.Param_redx + " " + multimeterService.Mdata.Param_redy + " C" + multimeterService.Mdata.Param_redx + " " + multimeterService.Mdata.Param_redy + " " + multimeterService.Mdata.Param_redcx + " " + multimeterService.Mdata.Param_redcy + " " + multimeterService.Mdata.Param_redpx + " " + multimeterService.Mdata.Param_redpy);
                    $(document).find("#path_black").attr("d", "M" + multimeterService.Mdata.Param_blackx + " " + multimeterService.Mdata.Param_blacky + " C" + multimeterService.Mdata.Param_blackx + " " + multimeterService.Mdata.Param_blacky + " " + multimeterService.Mdata.Param_blackcx + " " + multimeterService.Mdata.Param_blackcy + " " + multimeterService.Mdata.Param_blackpx + " " + multimeterService.Mdata.Param_blackpy);


                }
            }
        });


    };
    $scope.skipSpeedy = function (href) {
        if (href != null) {
            $state.go(href);
            $scope.multimeterShortcutHtml(href);
        }
    }
    $scope.multimeterShortcutHtml = function (href) {

        if (multimeterService.Mdata.multimeterStatus) {
            if (multimeterService.Mdata.w_multimeter_blackHtml == href || multimeterService.Mdata.w_multimeter_blackHtml == null) {
                multimeterService.Mdata.SvgBlackStatus = true;
            } else {
                multimeterService.Mdata.SvgBlackStatus = false;
            }
            if (multimeterService.Mdata.w_multimeter_redHtml == href || multimeterService.Mdata.w_multimeter_redHtml == null) {

                multimeterService.Mdata.SvgRedStatus = true;
            } else {
                multimeterService.Mdata.SvgRedStatus = false;
            }
        }

    }
    $scope.multimeteroff = function () {

        $(".multimeter-bottom").css("transform", "rotate(0deg)");
        //万用表OFF档位
        multimeterService.Mint.In1MultiLogic_x_Off_x_x = "1";
        multimeterService.Mint.In1MultiLogic_x_ACVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_DCVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_DCmVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_hFE_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_Amp_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_mAmp_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_mirAmp_x_x = "0";
        multimeterService.Mdata.multimeterScreenStatus = false,
            multimeterService.Mdata.multimeterScreenUnit = "";
    };
    $scope.multimetervv = function () {
        $(".multimeter-bottom").css("transform", "rotate(23deg)");
        multimeterService.Mdata.multimeterScreenStatus = true;
        multimeterService.Mdata.multimeterScreenUnit = "V~";
        multimeterService.Mint.In1MultiLogic_x_Off_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_ACVlt_x_x = "1";
        multimeterService.Mint.In1MultiLogic_x_DCVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_DCmVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_hFE_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_Amp_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_mAmp_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_mirAmp_x_x = "0";
    };
    $scope.multimeterv = function () {

        $(".multimeter-bottom").css("transform", "rotate(46deg)");
        multimeterService.Mdata.multimeterScreenStatus = true;
        multimeterService.Mdata.multimeterScreenUnit = "V";

        multimeterService.Mint.In1MultiLogic_x_Off_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_ACVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_DCVlt_x_x = "1";
        multimeterService.Mint.In1MultiLogic_x_DCmVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_hFE_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_Amp_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_mAmp_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_mirAmp_x_x = "0";

        //测量值的记录
        multimeterService.recordMeasure();
		
    };
    $scope.multimetermv = function () {

        $(".multimeter-bottom").css("transform", "rotate(69deg)");
        multimeterService.Mdata.multimeterScreenStatus = true;
        multimeterService.Mdata.multimeterScreenUnit = "mV";
        multimeterService.Mint.In1MultiLogic_x_Off_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_ACVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_DCVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_DCmVlt_x_x = "1";
        multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_hFE_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_Amp_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_mAmp_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_mirAmp_x_x = "0";
    };
    $scope.multimeterk = function () {

        $(".multimeter-bottom").css("transform", "rotate(92deg)");
        multimeterService.Mdata.multimeterScreenStatus = true;
        multimeterService.Mdata.multimeterScreenUnit = "";//去除Ω

        multimeterService.Mint.In1MultiLogic_x_Off_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_ACVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_DCVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_DCmVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x = "1";
        multimeterService.Mint.In1MultiLogic_x_hFE_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_Amp_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_mAmp_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_mirAmp_x_x = "0";

        //判断是否测量了电阻(两个表针是否都测量了，并且是否打到欧姆档)
		if((multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x=='1')&&(multimeterService.Mdata.Radrepetition!='0')&&(multimeterService.Mdata.Blackrepetition!='0')){
			//创建警告框
			if((parseInt(multimeterService.Mdata.Radrepetition)<=parseInt(4000))){
				$rootScope.createResistanceWarn('此功能不能用');
			}
		}
        
    };
    $scope.multimeternofine = function () {

        $(".multimeter-bottom").css("transform", "rotate(115deg)");
        multimeterService.Mdata.multimeterScreenStatus = true;
        multimeterService.Mdata.multimeterScreenUnit = "";
        multimeterService.Mint.In1MultiLogic_x_Off_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_ACVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_DCVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_DCmVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_hFE_x_x = "1";
        multimeterService.Mint.In1MultiLogic_x_Amp_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_mAmp_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_mirAmp_x_x = "0";
    };
    $scope.multimeterAA = function () {

        $(".multimeter-bottom").css("transform", "rotate(138deg)");
        multimeterService.Mdata.multimeterScreenStatus = true;
        multimeterService.Mdata.multimeterScreenUnit = "A~";

        multimeterService.Mint.In1MultiLogic_x_Off_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_ACVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_DCVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_DCmVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_hFE_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_Amp_x_x = "1";
        multimeterService.Mint.In1MultiLogic_x_mAmp_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_mirAmp_x_x = "0";
    };
    $scope.multimeterA = function () {
        $(".multimeter-bottom").css("transform", "rotate(161deg)");
        multimeterService.Mdata.multimeterScreenStatus = true;
        multimeterService.Mdata.multimeterScreenUnit = "A";
        multimeterService.Mint.In1MultiLogic_x_Off_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_ACVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_DCVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_DCmVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_hFE_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_Amp_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_mAmp_x_x = "1";
        multimeterService.Mint.In1MultiLogic_x_mirAmp_x_x = "0";
    };
    $scope.multimetermA = function () {

        $(".multimeter-bottom").css("transform", "rotate(184deg)");
        multimeterService.Mdata.multimeterScreenStatus = true;
        multimeterService.Mdata.multimeterScreenUnit = "mA";
        multimeterService.Mint.In1MultiLogic_x_Off_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_ACVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_DCVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_DCmVlt_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_hFE_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_Amp_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_mAmp_x_x = "0";
        multimeterService.Mint.In1MultiLogic_x_mirAmp_x_x = "1";

    };
    $rootScope.closemultimeter = function () {
        //具体注释见js/angularJs/Service.js
        $scope.multimeteroff();
        multimeterService.Mdata.multimeterStatus = false;
        multimeterService.Mdata.multimeter_drag = '0';
  		multimeterService.Mint.In1MultiLogic_x_Red_x_x='0',
        multimeterService.Mint.In1MultiLogic_x_Black_x_x='0';
        multimeterService.Mdata.w_multimeter_redHtml = null;
        multimeterService.Mdata.w_multimeter_blackHtml = null;
        multimeterService.Mdata.SvgStatus = false;
        multimeterService.Mdata.multimeter_red = '0';
        multimeterService.Mdata.multimeter_black = '0';

        multimeterService.Mdata.wanyongbiao = '0';
        multimeterService.Mdata.svgRecoverStatus = '1';
        multimeterService.Mdata.multimeterblackPosition = null;
        multimeterService.Mdata.multimeterredPosition = null;
        multimeterService.Mdata.Radrepetition = '0';
        multimeterService.Mdata.Blackrepetition = '0';
        multimeterService.Mdata.multimeter_red = '1';
        multimeterService.Mdata.multimeter_black = '1';

        multimeterService.Mdata.multimeterredstartx = multimeterService.Mdata.Param_redx = '440';//红色表线起始x坐标
        multimeterService.Mdata.multimeterredstarty = multimeterService.Mdata.Param_redy = '100';//红色表线起始y坐标
        multimeterService.Mdata.multimeterredradianx = multimeterService.Mdata.Param_redcx = '420';//红色表线曲线拐x坐标
        multimeterService.Mdata.multimeterredradiany = multimeterService.Mdata.Param_redcy = '37';//红色表线曲线拐y坐标
        multimeterService.Mdata.multimeterredstopx = multimeterService.Mdata.Param_redpx = '403';//红色表线曲线结束x坐标
        multimeterService.Mdata.multimeterredstopy = multimeterService.Mdata.Param_redpy = '375';//红色表线曲线结束x坐标

        multimeterService.Mdata.multimeterblackstartx = multimeterService.Mdata.Param_blackx = '282';
        multimeterService.Mdata.multimeterblackstarty = multimeterService.Mdata.Param_blacky = '100';
        multimeterService.Mdata.multimeterblackradianx = multimeterService.Mdata.Param_blackcx = '302';
        multimeterService.Mdata.multimeterblackradiany = multimeterService.Mdata.Param_blackcy = '37';
        multimeterService.Mdata.multimeterblackstopx = multimeterService.Mdata.Param_blackpx = '376';
        multimeterService.Mdata.multimeterblackstopy = multimeterService.Mdata.Param_blackpy = '375';
        $("#mask-multimeter").css("top", "80px");
        $("#mask-multimeter").css("left", "290px");
        $("#hhjmultimeterRed").css("top", "97px");
        $("#hhjmultimeterRed").css("left", "428px");
        $("#hhjmultimeterBlack").css("top", "97px");
        $("#hhjmultimeterBlack").css("left", "272px");
        $("#hhjmultimeterRed-hotspot").css("top", "311px");
        $("#hhjmultimeterRed-hotspot").css("left", "431px");
        $("#hhjmultimeterBlack-hotspot").css("top", "315px");
        $("#hhjmultimeterBlack-hotspot").css("left", "272px");
        $("#path_Red").attr("d", "M" + multimeterService.Mdata.multimeterredstartx + " " + multimeterService.Mdata.multimeterredstarty + " C" + multimeterService.Mdata.multimeterredstartx + " " + multimeterService.Mdata.multimeterredstarty + " " + multimeterService.Mdata.multimeterredradianx + " " + multimeterService.Mdata.multimeterredradiany + " " + multimeterService.Mdata.multimeterredstopx + " " + multimeterService.Mdata.multimeterredstopy);
        $("#path_black").attr("d", "M" + multimeterService.Mdata.multimeterblackstartx + " " + multimeterService.Mdata.multimeterblackstarty + " C" + multimeterService.Mdata.multimeterblackstartx + " " + multimeterService.Mdata.multimeterblackstarty + " " + multimeterService.Mdata.multimeterblackradianx + " " + multimeterService.Mdata.multimeterblackradiany + " " + multimeterService.Mdata.multimeterblackstopx + " " + multimeterService.Mdata.multimeterblackstopy);
		
		//去除右侧工具栏的触发状态
		$(".right-multimeter").parent().removeClass("active");
		//隐藏热区
        hideAHot();
        //把状态码设为0；
        multimeterStay=0;
    };

}]);


