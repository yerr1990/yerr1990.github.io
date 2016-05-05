/**
 * Created by  @author 谢国亮 2015-08-09
 */

var validateCtrl = angular.module('xcj.validate', []);

    validateCtrl.factory('validateService', function() {

        var prov={};

        /*验证是否为空*/
        prov.isNull=function(str,field){
            if ($.trim(str) != ""){
                return true;
            }
//          console.log(field+"字段为空");
            return false;
        };

       /*验证邮箱*/
        prov.isEmail=function(str,field){
/*            var regInvalid=/(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/;
            var regValid=/^([A-Za-z0-9])(\w)+@(\w)+(\.)(com|com\.cn|net|cn|so|网络|公司|中国|tel|co|asia|me|mobi|name|tv|cc|info|biz|net\.cn|org|biz|info|gov|gov\.cn|edu|edu\.cn)/;*/
            var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(!myreg.test(str.value)){
                return true;
            }
//          console.log(field+"格式不正确");
            return false;
        };



        //验证时间格式
       prov.isDateTime=function(str,field){
           var reDateTime = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
           if(reDateTime.test(str)){
               return true;
           }
//         console.log(field+"格式不正确");
           return false;
       };
        /*验证 0-100的整数*/
        prov.checkNumber=function(str,field){
            var reg=/^(100|[1-9]\d|\d)$/;
            if(reg.test(str)){
                return true;
            }
//          console.log(field+"格式不正确");
            return false;
        };

        /*是否是字符串不能为空*/
        prov.checkString=function(str,field){
            if($.trim(str) != "" && typeof str == 'string'){
                return true;
            }
//          console.log(field+"格式不正确");
            return false;
        };

        /*验证是否是字符串*/
        prov.isString=function(str,field){
            if(typeof str == 'string'){
                return true;
            }
//          console.log(field+"格式不正确");
            return false;
        };

        /*验证是否 通过*/
        prov.isPass=function(str,field){
            if( typeof str == 'number') {
                return true;
            }
//          console.log(field+"格式不正确");
            return false;
        };

        /**/
        prov.isNum=function(str){
            if( typeof str == 'number'&& $.trim(str) != "") {
                return true;
            }
//          console.log(field+"为空或格式不正确");
            return false;
        };

        return prov;

    });






