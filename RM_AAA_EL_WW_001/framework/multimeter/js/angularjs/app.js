/**
 * @createDate   2015-08-4 下午05:28:38
 * @author       hao liqiang
 * @email        lq.hao@xiaochejiang.com
 * @version      1.0
 */

var multimeterModule=angular.module("multimeterModule",[]);
//注射器加载完所有模块时，此方法执行一次
multimeterModule.run(function ($templateCache) {
    $templateCache.put("multimeterTemplate", "framework/multimeter/template/multimeter.html");
});


multimeterModule.directive("multimeter", function ($templateCache) {
    return {
        restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
        templateUrl: $templateCache.get("multimeterTemplate"),
        replace: false //是否用模板替换当前元素，若为false，则append在当前元素上
    }

})

