mainModule.service('PageService',function(){
	var pageService={};
	pageService.Pdata=pageService.Pdata||{}
	//页面中的一些使用的数据
	pageService.Pdata={
		templateSrc:['template/outline.html','template/principle.html','template/circuit.html','template/detect.html','template/plot.html'],
		dashboardSrc:'template/dashboard.html',
		principleSvg:'template/principle_svg.html',
		circuitSvg:'template/circuit_svg.html',//电路页面
		obdscanSrc:'template/obdscan/obdscanMenu.html'
	}
	//页面中的控制类数据
	pageService.Pctrl={
		
	}
	
	return pageService
})
