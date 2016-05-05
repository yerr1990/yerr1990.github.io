var routerModule=angular.module('routerModule',['ui.router'])

routerModule.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('alertModel');
	$stateProvider
	.state('alertModel',{
		url:'/alertModel',
		templateUrl:'template/alert_model.html'
	})
})