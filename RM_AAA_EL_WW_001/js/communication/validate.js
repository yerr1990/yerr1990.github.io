/**
 * @author  谢国亮
 * 验证数据格式
 */


/**
 * 验证是否为空，返回true/false
 * @param string
 * @returns {boolean}
 */

function isNull(string) {
    if (trim(string) == "")
        return false;
    else{
        return true;
    }
}


/**
 * 去除空格
 * @param string
 * @returns {*}
 */
function trim(string) {
    return string.replace(/(^\s*)|(\s*$)/g, "");
}


/**
 * 验证是否为邮箱，返回true/false
 * @param string
 * @returns {boolean}
 */

function isEmail(string) {
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(!myreg.test(str.value)){
        return true;
    }
    return false;
}

/**
 *
 * @param val
 * @returns {boolean}
 */
function isNumber(val){
    if(!isNaN(val)){
        return true;
    }else{
        return false;
    }
}