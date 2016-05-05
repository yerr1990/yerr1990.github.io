/**
 * @author  谢国亮
 * 定义模拟map方法 size ， put ， get ， delete ， eachMap
 */

/**
 * @author  谢国亮
 * @constructor
 */

function Map() {
    this.map={};
};

/**
 * 获得map容器的个数
 */

Map.prototype.size = function() {
    var sum=0;
    for(var props in this.map){
        sum+=1;
    }
    return sum;
};

/**
 * 添加元素
 * @param key
 * @param value
 */

Map.prototype.put = function(key , value) {

    this.map[key] = value ;

};

/**
 * get 方法 根据key 取得value
 * @param key
 */

Map.prototype.get = function(key) {

     return this.map[key];

};

/**
 *
 * find 方法 查找value 是否存在
 * @param key
 * @returns {*}
 */
Map.prototype.find = function(key) {
    if(this.map[key] || this.map[key] === 0 || this.map[key] === false){
        return true;
    } else {
        return false;
    }
};

/**
 *  map 中的删除方法
 * @param key
 */

Map.prototype.delete = function(key) {
    if(this.map[key] || this.map===0 || this.map==false){
        delete this.map[key];
    }
};

/**
 * 遍历map 容器的方法
 * @param fn
 */

Map.prototype.eachMap=function(fn){
    for(var props in this.map){
        fn(props,this.map[props]);
    }
};

