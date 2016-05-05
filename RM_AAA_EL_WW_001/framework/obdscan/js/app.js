/**
 * @createDate   2015-08-13 下午05:28:38
 * @author       hao liqiang
 * @email        lq.hao@xiaochejiang.com
 * @version      1.0
 */
var obdscanModule = angular.module('obdscanModule', []);

/*加载诊断仪的模板*/
obdscanModule.run(function ( $templateCache) {
    $templateCache.put("obdscan.html", "framework/obdscan/template/obdscan/obdscan.html");
});

obdscanModule.directive("obdscan", function ($templateCache) {
    return {
        restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
        templateUrl: $templateCache.get("obdscan.html"),
        replace: true //是否用模板替换当前元素，若为false，则append在当前元素上
    }
});

