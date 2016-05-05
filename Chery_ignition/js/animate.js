//系统原理动画============================================================================================================================================
//转杆钟摆的定时器
var timerShaftStickGo;
var timerShaftStickBack;
//火花塞和转杆循环往复动画的定时器
var timerSparkingPlugMove;
//策略火花塞和转杆循环往复动画的定时器
var timerSparkingPlugMove1
//策略页面曲轴和凸轮轴的动画
var plotTimer;
//缸中转轴的定时器
var timerShaft;
//点火火花显示定时器
var timerSpark;
//右侧箭头流动定时器
var timerArrow;
//设置动画执行的状态码（是否运行执行动画，是就为1，不是就为0，一般是到on档才让执行动画）
var isRunAnimate=0;
//缸中转轴的角度
var shaftRoutate=0;
//两次打开的气门不一样，切换参数
var leftOrRight=true;
//原理动画的运动时间（速度）
var principleAnimateTime=800;
//电路动画的运动时间（速度）
var circuitAnimateTime=1600;
//电路动画闪速的定时器
var timerIgnationLineFlash;

//开始所有系统原理动画
function principleAnimateRunAll(){
	if(isRunAnimate!=2){
		return;
	}
	//系统原理活塞与曲轴转杆动画
	sparkingPlugMove(principleAnimateTime);
	//系统原理缸中转轴旋转动画
	shaftRotate(principleAnimateTime);
}
//策略页面系统原理动画
function principleAnimateRunAll1(){
	if(isRunAnimate!=2){
		return;
	}
	//系统原理活塞与曲轴转杆动画
	sparkingPlugMove1(principleAnimateTime);
	//系统原理缸中转轴旋转动画
	shaftRotate(principleAnimateTime);
}

//暂停所有系统原理动画
function principleAnimateStopAll(){
	//定时器全部停止
	clearInterval(timerSparkingPlugMove);
	clearInterval(timerSparkingPlugMove1);
	clearInterval(timerShaftStickGo);
	clearInterval(timerShaftStickBack);
	clearInterval(timerShaft);
	clearInterval(timerArrow);
	clearInterval(plotTimer);
	//让动画立即停止
	$(".valve_left").stop();
	$(".valve_right").stop(true);
	$(".shaft_valve").stop();
	$(".principle_arrow_flow .flow_arrow_1").stop();
	$(".principle_arrow_flow .flow_arrow_2").stop();
	$(".principle_arrow_flow .flow_arrow_3").stop();
	$(".principle_arrow_flow .flow_arrow_4").stop();
}
//初始化所有系统原理动画状态
function principleAnimateInitialize(){
	//先暂停所有动画
	principleAnimateStopAll();
	//初始化=================================
	//让曲轴旋转的角度旋转的角度变成从零开始
	shaftRoutate=0;
	//缸内转盘归位
	$(".principle_shaft").css("transform","rotate("+shaftRoutate+"deg)")
	//凸轮轴转归位
	$(".camshaft_left").css("transform","rotate("+(shaftRoutate/2)+"deg)")
	$(".camshaft_right").css("transform","rotate("+(shaftRoutate/2)+"deg)")
	//进气出气阀门
	$(".valve_left").css("width","55px");
	$(".valve_right").css("width","54px");
	//活塞归位
	$(".shaft_valve").css("top","145px");
	//活塞转杆归位
	$(".principle_shaft_stick").css("transform","rotate(0deg)");
	//进气、出气，点火，燃烧状态去除
	$(".oilFire,.inOil,.fillingOil,.exhaustGas,.principleSpark").addClass("hideImportant");
	//电路上的箭头
	$(".principle_arrow_flow .flow_arrow_1").show().css({"left":"677px","top":"180px","transform":"rotate(0deg)"})
	$(".principle_arrow_flow .flow_arrow_2").show().css({"left":"689px","top":"180px","transform":"rotate(180deg)"})
	$(".principle_arrow_flow .flow_arrow_3").show().css({"left":"700px","top":"180px","transform":"rotate(180deg)"})
	$(".principle_arrow_flow .flow_arrow_4").show().css({"left":"713px","top":"180px","transform":"rotate(180deg)"})
}
//点火动画
function fireTheHole(val){
	//点火火花的动画
	$(".principleSpark").removeClass("hideImportant")
	if(timerSpark){clearTimeout(timerSpark)}
	timerSpark=setTimeout(function(){
		$(".principleSpark").addClass("hideImportant")
	},200)
	//火燃烧的gif打开
	$(".oilFire").removeClass("hideImportant");
}
//关闭点火状态的动画
function clearTheFire(){
	//火燃烧的gif关闭
	$(".oilFire").addClass("hideImportant");
	//燃油停留关闭
	$(".fillingOil").addClass("hideImportant");
}
//左侧气门动画
function camshaftValveLeft(time){
	//燃油停留关闭
	$(".fillingOil").addClass("hideImportant");
	$(".valve_left").stop().animate({
		width:"60px"
	},100,function(){ 
		//废弃排出汽缸
		$(".exhaustGas").removeClass("hideImportant");
		$(this).delay(parseInt(time)-220).animate({
			width:"55px"
		},100,function(){
			//废弃排出汽缸关闭
			$(".exhaustGas").addClass("hideImportant");
		})
	})
}
//策略页面传感器闪动的动画
/*function plotAnimate(){
	$(".outline_hotspot1").fadeOut(500).delay().fadeIn(500);
}*/
//右侧气门动画
function camshaftValveRight(time){
	//气门打开
	$(".valve_right").stop().animate({
		width:"60px"
	},100,function(){
		//燃油进入汽缸
		$(".inOil").removeClass("hideImportant");
		$(this).delay(parseInt(time)-220).animate({
			width:"54px"
		},100,function(){
			//燃油进入关闭
			$(".inOil").addClass("hideImportant");
			//燃油停留打开
			$(".fillingOil").removeClass("hideImportant");
		})
	})
}

//活塞与曲轴转杆动画
function sparkingPlugMove1(time){
	function sparkingPlugMoveRepeat1(){
		shaftRoutate=0;
		//右侧进气
		camshaftValveRight(time)
		//转杆运动（1/2）
		shaftStickRotate("-",parseInt(time)/2);
		//箭头流动
		principleArrowFlowFire(time*2);
		//活塞运动
		$(".shaft_valve").stop().animate({
			top:"170px"
		},parseInt(time),function(){
			//填充燃料
			shaftStickRotate("",parseInt(time)/2);
			//活塞运动
			$(this).stop().animate({
				top:"145px"
			},parseInt(time),function(){
				//点火
				fireTheHole(1);
				//转杆运动（1/2）
				shaftStickRotate("-",parseInt(time)/2);
				$(this).stop().animate({
					top:"170px"
				},parseInt(time),function(){
					//熄火
					clearTheFire();
					//左侧出气
					camshaftValveLeft(time)
					//转杆运动（1/2）
					shaftStickRotate("",parseInt(time)/2);
					$(this).stop().animate({
						top:"145px"
					},parseInt(time),function(){})
				})
			})
		})
//		if(timerSparkingPlugMove){clearTimeout(timerSparkingPlugMove);}
//		timerSparkingPlugMove=setTimeout(sparkingPlugMoveRepeat,parseInt(time*4))
	}
	sparkingPlugMoveRepeat1();
	if(timerSparkingPlugMove1){clearInterval(timerSparkingPlugMove1);}
	timerSparkingPlugMove1=setInterval(sparkingPlugMoveRepeat1,parseInt(time*4));
	//策略
	plotAnimate(principleAnimateTime);
}
//策略页面的动画
function plotAnimate(time){
	var num=1;
	function sparkingPlugMoveRepeat2(){
		if(num==1){
			//策略页面曲轴传感器闪动的动画
			$(".outline_hotspot2").fadeOut(500).delay().fadeIn(500);
			num++;
		}
		else if(num==2){
			//页面箭头2动画
			principleArrowFlow4(1200);
			$(".outline_hotspot3").stop().show().css("opcity","1");
			num++;
		}
		else if(num==3){
			//策略页面凸轮轴传感器闪动的动画
			$(".outline_hotspot1").fadeIn(500).fadeOut(500).delay().fadeIn(500);
			num++;
		}
		else if(num==4){
			//页面箭头4动画
			principleArrowFlow2(1200);
			//策略页面凸轮轴传感器闪动的动画
			$(".outline_hotspot3").fadeIn(100).delay(1100).fadeOut(500).delay().fadeIn(500);
			num=1;
		}

	}
	sparkingPlugMoveRepeat2();
	if(plotTimer){clearInterval(plotTimer);}
	plotTimer=setInterval(sparkingPlugMoveRepeat2,parseInt(time))
}
//活塞与曲轴转杆动画
function sparkingPlugMove(time){
	function sparkingPlugMoveRepeat(){
		shaftRoutate=0;
		//右侧进气
		camshaftValveRight(time)
		//转杆运动（1/2）
		shaftStickRotate("-",parseInt(time)/2);
		//箭头流动
		principleArrowFlowFire(time*2);
		//活塞运动
		$(".shaft_valve").stop().animate({
			top:"170px"
		},parseInt(time),function(){
			//填充燃料
			shaftStickRotate("",parseInt(time)/2);
			//活塞运动
			$(this).stop().animate({
				top:"145px"
			},parseInt(time),function(){
				//点火
				fireTheHole(1);
				//转杆运动（1/2）
				shaftStickRotate("-",parseInt(time)/2);
				$(this).stop().animate({
					top:"170px"
				},parseInt(time),function(){
					//熄火
					clearTheFire();
					//左侧出气
					camshaftValveLeft(time)
					//转杆运动（1/2）
					shaftStickRotate("",parseInt(time)/2);
					$(this).stop().animate({
						top:"145px"
					},parseInt(time))
				})
			})
		})
	}
	sparkingPlugMoveRepeat();
	if(timerSparkingPlugMove){clearInterval(timerSparkingPlugMove);}
	timerSparkingPlugMove=setInterval(sparkingPlugMoveRepeat,parseInt(time*4))
}
//转杆钟摆运动动画
function shaftStickRotate(sign,time){
	//console.log("=======================================================================================")

	//转杆角度
	var RshaftStick=0;
	if(timerShaftStickGo){clearInterval(timerShaftStickGo);}
	if(timerShaftStickBack){clearInterval(timerShaftStickBack);}
	timerShaftStickGo=setInterval(function(){
		RshaftStick++;
		$(".principle_shaft_stick").css("transform","rotate("+sign+RshaftStick+"deg)");
		//console.log(sign+RshaftStick)
		if(RshaftStick==10){
			clearInterval(timerShaftStickGo);
			//执行返回动画
			if(timerShaftStickBack){clearInterval(timerShaftStickBack);}
			timerShaftStickBack=setInterval(function(){
				RshaftStick--
				$(".principle_shaft_stick").css("transform","rotate("+sign+RshaftStick+"deg)");
				//console.log(sign+RshaftStick)
				if(RshaftStick==0){
					clearInterval(timerShaftStickBack);
				}
			},parseInt(time)/10)
		}
	},parseInt(time)/10)
}
//----------------------------------------------------------------------------------------------------------------------------
//缸中转轴旋转动画
function shaftRotate(time){
	function shaftRotateRepeat(){
		shaftRoutate=shaftRoutate+9.3;
		$(".principle_shaft").css("transform","rotate("+shaftRoutate+"deg)")
		//凸轮轴转动动画
		$(".camshaft_left").css("transform","rotate("+(shaftRoutate/2)+"deg)")
		$(".camshaft_right").css("transform","rotate("+(shaftRoutate/2)+"deg)")
		//console.log(shaftRoutate)
	}
	shaftRotateRepeat();
	if(timerShaft){clearInterval(timerShaft)}
	timerShaft=setInterval(shaftRotateRepeat,(parseInt(time)/20))
}

//---------------------------------------------------------------------------------------------------------
//系统原理箭头的流动动画(点火线圈的箭头)
function principleArrowFlowFire(time){
	$(".principle_arrow_flow .flow_arrow_1").show().stop().css({"left":"677px","top":"180px","transform":"rotate(0deg)"}).animate({
		top:"201px"
	},(time*19)/510,function(){
		$(this).css("transform","rotate(90deg)").stop().animate({
			left:"505px"
		},(time*172)/510,function(){
			$(this).css("transform","rotate(180deg)").stop().animate({
				top:"80px"
			},(time*119)/510,function(){
				$(this).css("transform","rotate(90deg)").stop().animate({
					left:"305px"
				},(time*200)/510,function(){
					//隐藏箭头
					$(this).hide();
				})
			})
		})
	})
}
//系统原理箭头的流动动画
function principleArrowFlow2(time){
	$(".principle_arrow_flow .flow_arrow_2").show().css({"left":"405px","top":"127px","transform":"rotate(270deg)"}).stop().animate({
		left:"463px"
	},(time*58)/430,'linear',function(){
		$(this).css("transform","rotate(0deg)").stop().animate({
			top:"226px"
		},(time*100)/430,'linear',function(){
			$(this).css("transform","rotate(-90deg)").stop().animate({
				left:"689px"
			},(time*226)/430,'linear',function(){
				$(this).css("transform","rotate(180deg)").stop().animate({
					top:"180"
				},(time*46)/430,'linear',function(){
					//隐藏箭头并归位
					$(this).hide()
				})
			})
		})
	})
}
function principleArrowFlow3(time){
	$(".principle_arrow_flow .flow_arrow_3").show().css({"left":"375px","top":"256px","transform":"rotate(270deg)"}).stop().animate({
		left:"700px"
	},(time*325)/400,'linear',function(){
		$(this).css("transform","rotate(180deg)").stop().animate({
			top:"180px"
		},(time*75)/400,'linear',function(){
			//隐藏箭头并归位
			$(this).hide()
		})
	})
}
function principleArrowFlow4(time){
	$(".principle_arrow_flow .flow_arrow_4").show().css({"left":"390px","top":"370px","transform":"rotate(270deg)"}).stop().animate({
		left:"713px"
	},(time*323)/512,'linear',function(){
		$(this).css("transform","rotate(180deg)").stop().animate({
			top:"180px"
		},(time*189)/512,'linear',function(){
			//隐藏箭头并归位
			$(this).hide();
		})
	})
}
//箭头循环流动动画
function principleArrowFlowRepeat(time){
	if(isRunAnimate==0){
		return;
	}
	principleArrowFlow2(time);
	principleArrowFlow3(time);
	principleArrowFlow4(time);
	if(timerArrow){clearInterval(timerArrow)}
	timerArrow=setInterval(function(){
		principleArrowFlow2(time);
		principleArrowFlow3(time);
		principleArrowFlow4(time);
	},parseInt(time)+30)
}

//切换浏览器标签是，防止js动画变慢处理----------------------------------------------------------------------------------------------
/*window.onfocus=function(){
	//打开定时器钱先初始化所有动画
	//principleAnimateInitialize();
	//principleAnimateRunAll(800);
	//principleArrowFlowRepeat(parseInt(principleAnimateTime)*2);
}*/
window.onblur=function(){
//	stopAllAnimate();
//	principleAnimateInitialize();
//	lineAnimateInitialize()
}





//系统电路动画====================================================================================================================================================
//开始所有系统电路动画
function circuitAnimateRunAll(){
	if(isRunAnimate==2){
		return;
	}
	//线路动画
	lineAnimate(circuitAnimateTime);
}
//电路开关闭合断开动画
function circuitSwicthAnimate(id,closeOrOpen){
	if(closeOrOpen==1){
		if((id==1)||(id=="1")){
			$(".circuit_switch_"+id).css("transform","rotate(0deg)").attr("src","images/circuit_switch.png");	
		}else{
			$(".circuit_switch_"+id).css("transform","rotate(90deg)").attr("src","images/circuit_switch.png")
		}
	}else{
		if((id==1)||(id=="1")){
			$(".circuit_switch_"+id).css("transform","rotate(20deg)").attr("src","images/circuit_switch_red.png")	
		}else{
			$(".circuit_switch_"+id).css("transform","rotate(110deg)").attr("src","images/circuit_switch_red.png")
		}
	}
}
//线路用电器变色动画
function applianceColorCharge(id,color){
	if(id<=4){
		$(".appliance_"+id).attr("src","images/appliance_1_"+color+".png");
	}else{
		$(".appliance_"+id).attr("src","images/appliance_2_"+color+".png");
	}
	//这两个始终是红色的
	$(".appliance_3,.appliance_4").attr("src","images/appliance_1_r.png");
}
//线路变色电路流动动画,电路开始动画
function lineAnimate(time){
//	//计算出来的时间要乘以1000换算成毫秒
//	speed=speed/1000;
	//闭合第一个开关
	circuitSwicthAnimate(1,0);
	//第一段-------------------------------------------------------------------------------
	$(".line_21").stop().animate({
		width:"9px"
	},(time/8),"linear",function(){
	//第二三的1段（分叉）---------------------------------------------------------------------
		//第二1段--------------------------------------------------------------------------		
		$(".line_22").stop().animate({
			width:"191px"
		},(time*191)/679,"linear",function(){
		//第二2段--------------------------------------------------------------------------
			//用电器1变红色
			applianceColorCharge(1,'r');
			$(".line_23").stop().animate({
				width:"83px"
			},(time*83)/679,"linear",function(){
		//第二3段--------------------------------------------------------------------------		
				$(".line_24").stop().animate({
					height:"167px"
				},(time*167)/679,"linear",function(){
		//第二4段--------------------------------------------------------------------------		
					$(".line_27").stop().animate({
						height:"74px"
					},(time*74)/679,"linear",function(){
		//第二5段--------------------------------------------------------------------------		
						$(".line_28").stop().animate({
							width:"126px"
						},(time*126)/679,"linear",function(){
		//第二6段--------------------------------------------------------------------------
							$(".line_29").stop().animate({
								height:"38px"
							},(time*38)/679,"linear",function(){
								//用电器6颜色变红
								applianceColorCharge(6,'r');
								//闭合第二个开关
								circuitSwicthAnimate(3,0);
	//第五段--------------------------------------------------------------------------------										
								$(".line_30").stop().animate({
									height:"110px"
								},(time*30)/(124*2),"linear",function(){
	//第六段--------------------------------------------------------------------------------	
									$(".line_31").stop().animate({
										width:"84px"
									},(time*84)/(124*2),"linear",function(){
	//第七八段(分叉)--------------------------------------------------------------------------------										
		//第七1段---------------------------------------------------------------------								
										$(".line_32").stop().animate({
											height:"33px"
										},(time*1)/(1*2),"linear")
		//第八1段---------------------------------------------------------------------
										$(".line_33").stop().animate({
											width:"30px"
										},(time*50)/(65*2),"linear",function(){
		//第八2段---------------------------------------------------------------------
											$(".line_34").stop().animate({
												height:"35px"
											},(time*62)/(65*2),"linear",function(){
												//传感器线变色
												$(".fixed_late_show_sensor_line").removeClass("hideImportant");
											})
										})
									})
								})
							})
						})
					})
				})
			})
		})
		//第三2段--------------------------------------------------------------------------
		$(".line_25").stop().animate({
			height:"50px"
		},(time*50)/112,"linear",function(){
			//用电器2变红色
			applianceColorCharge(2,'r');
		//第三3段--------------------------------------------------------------------------	
			$(".line_26").stop().animate({
				height:"62px"
			},(time*62)/112,"linear",function(){
				//用电器5颜色变红
				applianceColorCharge(5,'r');
				//闭合第二个开关
				circuitSwicthAnimate(2,0);
	//第四段--------------------------------------------------------------------------------
				$(".line_35").stop().animate({
					height:"119px"
				},(time*1)/1,"linear",function(){
	//第九十段(分叉)--------------------------------------------------------------------------------				
		//第九段(分叉)--------------------------------------------------------------------------------								
					$(".line_36").stop().animate({
						height:"82px"
					},(time*82)/392,"linear")
		//第十段(分叉)--------------------------------------------------------------------------------				
					$(".line_37").stop().animate({
						width:"310px"
					},(time*310)/392,"linear",function(){
						//点火线圈线变色(上半部分)
						$(".fixed_late_show_ignition_line").removeClass("hideImportant");
						//闪烁动画的线
						$(".fixed_late_show_flash_line").removeClass("hideImportant");
					})
				})
	
			})
		})
	})
}
//一轮动画是否播放完毕，是否可以进行下一轮
var isFlashLineOpen=1;
//点火线圈四条线的闪动
function flashLineAnimate(){
	//如果电流没走完，也不允许播放
	if($(".fixed_late_show_ignition_line").hasClass("hideImportant")){
		return;
	}
	//只有播放完毕了才能继续播放
	if(isFlashLineOpen==0){
		return;
	}
	isFlashLineOpen=0;
	//点火线圈线变色（捎带变个色，这是点火线圈下面的2脚颜色）
	$(".fixed_late_show_ignition_line_on").removeClass("hideImportant");
	//闪动速度
	var time=500;
	//线开始颜色
	lineColor2="000000";
	//线之后颜色
	lineColor1="fff100";
	$(".line_59").stop().animate({
		backgroundColor:"#"+lineColor1
	},time,function(){
		$(this).stop().animate({
			backgroundColor:"#"+lineColor2
		},time,function(){
			$(".line_61").stop().animate({
				backgroundColor:"#"+lineColor1
			},time,function(){
				$(this).stop().animate({
					backgroundColor:"#"+lineColor2
				},time,function(){
					$(".line_62").stop().animate({
						backgroundColor:"#"+lineColor1
					},time,function(){
						$(this).stop().animate({
							backgroundColor:"#"+lineColor2
						},time,function(){
							$(".line_60").stop().animate({
								backgroundColor:"#"+lineColor1
							},time,function(){
								$(this).stop().animate({
									backgroundColor:"#"+lineColor2
								},time,function(){
									//一轮动画播放完毕,是否可以下一轮
									isFlashLineOpen=1;
								})
							})
						})
					})
				})
			})
		})
	})
}
//点火线圈连续闪动动画
function flashLineAnimateToggle(){
	flashLineAnimate();
	if(timerIgnationLineFlash){clearInterval(timerIgnationLineFlash);}
	timerIgnationLineFlash=setInterval(function(){
		flashLineAnimate();
	},30)
}
//电路线路初始化
function lineAnimateInitialize(){
	//关闭点火线圈4条线的闪动
	clearInterval(timerIgnationLineFlash);
	isFlashLineOpen=1;
	//暂停所有线路动画
	$(".flow_line_animate span").stop();
	//闪烁动画变回黑色
	$(".fixed_late_show_flash_line span").stop().css("background","#000000");
	//线路流动初始化
	$(".flow_line_animate .width").css("width","0px");
	$(".flow_line_animate .height").css("height","0px");
	//传感器和点火线圈线路初始化
	$(".fixed_late_show_flash_line").addClass("hideImportant");
	$(".fixed_late_show_sensor_line").addClass("hideImportant");
	$(".fixed_late_show_ignition_line").addClass("hideImportant");
	$(".fixed_late_show_ignition_line_on").addClass("hideImportant");
	//开关和用电器初始化
	for(var id=0;id<=6;id++){
		applianceColorCharge(id,"b");
		circuitSwicthAnimate(id,1);
	}
}


//面板拖拽事件=====================================================
function dragDiv(){
	//给新面板加上拖拽事件
	$(".dragSource_alert").draggable({
		containment:".main",
		handle: ".alert_header",
		cursor:"move"
	})
	//给新面板加上拖拽事件
	$(".dragSource").draggable({
		containment:".main",
		cursor:"move"
	})
}

//公用动画，点火线圈点火动画=================================================================================================================
var timerComponentSpark;
function ignitionSparkAnimate(){
	//故障1下部冒火
	if(goCheckStay==1){
		return;
	}
	var toggle=1;
	if(timerComponentSpark){clearInterval(timerComponentSpark)}
	timerComponentSpark=setInterval(function(){
		if(toggle==1){
			$(".component_spark").removeClass("hideImportant");
			toggle=2;
		}else{
			$(".component_spark").addClass("hideImportant");
			toggle=1;
		}
	},100)
}
function ignitionSparkAnimateClose(){
	clearInterval(timerComponentSpark);
	$(".component_spark").addClass("hideImportant");
}

//故障动画===============================================================================================
function goIngitionMal(){
	//原理图火花消失
	$(".principle_body_part .principleSpark").addClass("transparent");
	//原理图点着火的背景消失
	$(".principle_body_part .oilFire").addClass("transparent");
	//出气gif图更换
	$(".principle_body_part .exhaustGas").attr("src","images/gifAnimate/exhaustGasMal.gif");
}
function clearIngitionMal(){
	//原理图火花消失
	$(".principle_body_part .principleSpark").removeClass("transparent");
	//原理图点着火的背景消失
	$(".principle_body_part .oilFire").removeClass("transparent");
	//出气gif图更换
	$(".principle_body_part .exhaustGas").attr("src","images/gifAnimate/exhaustGas.gif");
}





