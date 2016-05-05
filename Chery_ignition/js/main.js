//页面标识码，备用，用于判断
var sysStay=1;
//原理页面定时器
var principleTimes1;
//电路页面定时器
var circuitTimer;
//仪表转速定时器
 var dashboardTimer;
//检查页面定时器
var detectTimer;
//诊断仪数据变化定时器
var DataChangeTimer;
/*============================================================================================*/
//原理页面线路的颜色进行初始化
function principleLineInit(){
    clearInterval(principleTimes1);
    $(".principle_arrow_red").hide();
    $(".principle_arrow_blue").hide();
    $(".principle_line_on").attr("fill","#fff");
    $(".principle_line_on1").attr("stroke","#000");
    $(".principle_line_blue").attr("fill","#fff");
    $(".principle_line_blue1").attr("stroke","#000");
    $(".principle_line_blue2").attr("fill","#000");
    $(".principle_line_other").attr("fill","#fff");//开始最前面一段
    $(".principle_line_other1").attr("stroke","#000");
    $(".principle_line_red").attr("fill","#fff");
    $(".principle_line_red1").attr("stroke","#000");
    $(".principle_line_yellow").attr({"fill":"#fff","stroke":"#000"});
    $(".principle_line_green").attr("stroke","#000");
    $(".principle_line_switch").attr("d","M289.405,172.516l-15.654-27.503l-2.841,1.615l15.478,27.657 C289.405,172.516,289.405,172.516,289.405,172.516z")
}
//达到on档时的线路变化
function principleLineOn(){
    $(".principle_line_on").attr("fill","#0670B9");
    $(".principle_line_on1").attr("stroke","#0670B9");
    $(".principle_line_other").attr("fill","#0670B9");//开始最前面一段
    $(".principle_line_other1").attr("stroke","#0670B9");
    $(".principle_line_floor").attr("fill","#A95D30");
    $(".principle_line_floor1").attr("stroke","#A95D30");
    $(".principle_line_green").attr("stroke","#0670B9");
    $(".principle_arrow_blue").show();
    $(".principle_line_switch").attr("d","M289.87,173.766l-6.204-31.033l-3.205,0.638l5.988,31.124 C289.87,173.766,289.87,173.766,289.87,173.766z")
}
//达到strart档时的线路变化
function principleLineStart(){
    clearInterval(principleTimes1);
    function diao(){
        if($(".principle_line_yellow").attr("fill")=="#fff"){
            $(".principle_line_yellow").attr({"fill":"#ff0","stroke":"#ff0"});
            $(".principle_line_blue").attr("fill","#A95D30");//变蓝的部分
            $(".principle_line_blue1").attr("stroke","#0670B9");
            $(".principle_line_blue2").attr("fill","#0670B9");//三角形那个
            $(".principle_line_other").attr("fill","#0670B9");//开始最前面一段
            $(".principle_line_other1").attr("stroke","#0670B9");
            $(".principle_line_red").attr("fill","#fff");//红色变化的部分
            $(".principle_line_red1").attr("stroke","#000");
            $(".principle_arrow_blue").show();//蓝色箭头
            $(".principle_arrow_red").hide();//红色箭头
            $(".principle_line_green").attr("stroke","#0670B9");
        }else if($(".principle_line_yellow").attr("fill")=="#ff0"){
            $(".principle_line_yellow").attr({"fill":"#fff","stroke":"#000"});
            $(".principle_line_blue").attr("fill","#fff");
            $(".principle_line_blue1").attr("stroke","#000");
            $(".principle_line_blue2").attr("fill","#000");
            $(".principle_line_other").attr("fill","#f00");
            $(".principle_line_other1").attr("stroke","#f00");
            $(".principle_line_red").attr("fill","#f00");
            $(".principle_line_red1").attr("stroke","#f00");
            //$(".principle_arrow_blue").hide();
            $(".principle_arrow_red").show();
            $(".principle_line_green").attr("stroke","#f00");
        }
        //principleLineOn();
    }
    principleTimes1=setInterval(diao,1000);
}
/*=============================================================================================*/
//电路页面线路初始化
function circuitLineInit(){
    clearInterval(circuitTimer);
    $(".circuit_line_dhxq_on").attr("fill","#CECECE");
    //电路页面在线路每次跳转之前先进行一个初始化
    circuiStartInit();
}
//电路页面在线路每次跳转之前先进行一个初始化，因为每次跳转都是一条1,4,3,2
function circuiStartInit(){
    $(".circuit_line_dhxq1").attr("fill","#CECECE");
    $(".circuit_line_dhxq2").attr("fill","#CECECE");
    $(".circuit_line_dhxq3").attr("fill","#CECECE");
    $(".circuit_line_dhxq4").attr("fill","#CECECE");
    $(".circuit_line_dhxqz").attr("stroke","#CECECE");
    $(".circuit_line_dhxq1z").attr("stroke","#CECECE");
    $(".circuit_line_dhxq2z").attr("stroke","#CECECE");
    $(".circuit_line_dhxq3z").attr("stroke","#CECECE");
    $(".circuit_line_dhxq4z").attr("stroke","#CECECE");
    $(".circuit_fire_dhxq1").hide();
    $(".circuit_fire_dhxq2").hide();
    $(".circuit_fire_dhxq3").hide();
    $(".circuit_fire_dhxq4").hide();
    $(".circuit_fire_dhxq1_po").hide();
    $(".circuit_fire_dhxq2_po").hide();
    $(".circuit_fire_dhxq3_po").hide();
    $(".circuit_fire_dhxq4_po").hide();
}
//电路页面点火开关打到on档
function circuitLineOn(){
    $(".circuit_line_dhxq_on").attr("fill","#F00");
}
//电路页面点火开关打到start档
function circuitLinestart(){
    clearInterval(circuitTimer);
    var circuitParam=1;
    function diao(){
        //电路页面在线路每次跳转之前先进行一个初始化
        circuiStartInit();

        //alert(circuitParam)
        if(circuitParam==1){
            $(".circuit_line_dhxq1").attr("fill","#FF0");
            $(".circuit_line_dhxq1z").attr("stroke","#6D5236");
            $(".circuit_line_dhxqz").attr("stroke","#6D5236");
            circuitParam++;
        }else if(circuitParam==2){
            $(".circuit_fire_dhxq1").show();
            $(".circuit_fire_dhxq1_po").show();
            $(".circuit_line_dhxqz").attr("stroke","#CECECE");
            circuitParam++;
        }
        else if(circuitParam==3){
            $(".circuit_line_dhxq3").attr("fill","#FF0");
            $(".circuit_line_dhxq3z").attr("stroke","#6D5236");
            $(".circuit_line_dhxqz").attr("stroke","#6D5236");
            circuitParam++;
        }else if(circuitParam==4){
            $(".circuit_fire_dhxq3").show();
            $(".circuit_fire_dhxq3_po").show();
            $(".circuit_line_dhxqz").attr("stroke","#CECECE");
            circuitParam++;
        }else if(circuitParam==5){
            $(".circuit_line_dhxq4").attr("fill","#FF0");
            $(".circuit_line_dhxq4z").attr("stroke","#6D5236");
            $(".circuit_line_dhxqz").attr("stroke","#6D5236");
            circuitParam++;
        }else if(circuitParam==6){
            $(".circuit_fire_dhxq4").show();
            $(".circuit_fire_dhxq4_po").show();
            $(".circuit_line_dhxqz").attr("stroke","#CECECE");
            circuitParam++;
        }else if(circuitParam==7){
            $(".circuit_line_dhxq2").attr("fill","#FF0");
            $(".circuit_line_dhxq2z").attr("stroke","#6D5236");
            $(".circuit_line_dhxqz").attr("stroke","#6D5236");
            circuitParam++;
        }else if(circuitParam==8){
            $(".circuit_fire_dhxq2").show();
            $(".circuit_fire_dhxq2_po").show();
            $(".circuit_line_dhxqz").attr("stroke","#CECECE");
            circuitParam=1;
        }
        circuitLineOn();
    }
    circuitTimer=setInterval(diao,1000)

}
/*=============================================================================================*/
//面板拖拽事件
function dragDiv(){
    //给新面板加上拖拽事件
    $(".dashboard_body").draggable({
        containment:".main",
        cursor:"move"
    })
}
//概述页面动画事件
function animateClixk(){
    //执行系统原理动画(给了执行口令，开始执行动画才能执行,这里是为了预防点不着火的交互)
    isRunAnimate=2;
    //系统原理线路箭头的动画
    principleArrowFlowRepeat(parseInt(principleAnimateTime)*2);
    //系统电路运动动画
    principleAnimateRunAll();
}
//策略页面动画事件
function animateClixk1(){
    //执行系统原理动画(给了执行口令，开始执行动画才能执行,这里是为了预防点不着火的交互)
    isRunAnimate=2;
    //系统电路运动动画
    principleAnimateRunAll1();
   /* //策略
    plotAnimate(principleAnimateTime);*/
}

