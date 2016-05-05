/**
 * @author 周博宇
 */
(function (global) {

    //判断对象是否存在，存在就退出
    if (global.myHttp) {
        return;
    }
    //创建对象
    var _h = global.myHttp = {};

    // 给定默认参数
    var defaultOptions = {
        type: 'get', //http method
        url: '',//request url
        data: {},//send data
        dataType: 'text',//data type
        jsonp:"",
        cache: false,//is cache
        async: true,//is async
        username: void 0,//username
        password: void 0,//password
        success: function () {
        },//成功的方法
        error: function () {
        },//失败的处理方法
        timeout: 0,//超时时间
        headers: {},//自定义头部
        context: global,//给定this指向
        mimeType: ''
    };

    // ajax验证参数
    _h.ajax = function (settings) {
        if (!myUtil.isObject(settings)) {
            throw new Error('参数必须是一个对象');
        }
        settings = myUtil.extend(defaultOptions, settings);
        // ajax创建对象
        var xhr = myUtil.getXHR();
        var deferred = new Deferred();

        var verify = Verify(settings);
        verify.validate({
            name: '验证http method',
            key: 'type',
            errMsg: 'http method错误',
            validateRule: function (type) {
                return /^(get|post|head|delete|put)$/igm.test(type)
            }
        }).validate({
            name: '验证dataType',
            key: 'dataType',
            errMsg: 'dataType错误',
            validateRule: function (datatype) {
                return /^(text|json|jsonp)$/igm.test(datatype)
            }
        }).start();
        //
        if (myUtil.isObject(settings.data)) {
            settings.data = myUtil.encodeObject2URI(settings.data);
        }
        // 防止缓存。加随机数
        if (settings.cache === false) {
            settings.url = myUtil.hasSearch(settings.url, '_=' + ~~(Math.random() * 0xffffff))
        }
        // 强转boolean类型
        settings.async = !!settings.async;
        // 绑定success和error的this指向

        settings.success = myUtil.bind(settings.success, settings.context);
        settings.error = myUtil.bind(settings.error, settings.context);
        //超时处理
        if (settings.timeout > 500) {
            if ('timeout' in xhr) {
                xhr.timeout = settings.timeout;
                xhr.ontimeout = function () {
                    deferred.error();
                    settings.error();
                };
            } else {
                setTimeout(function () {
                    if (xhr.readyState !== 4) {
                        // 停止ajax请求
                        xhr.abort();
                        deferred.error();
                        settings.error();
                    }
                }, settings.timeout)
            }
        }
        // ?判断是否get系，是就拼接data
        if (/(get|delete|head)/igm.test(settings.type) && settings.data) {
            settings.url = myUtil.hasSearch(settings.url, settings.data);
            settings.data = void 0;
            //判断是否为jsonp，调用jsonp方法
            if(settings.type=="get"&&settings.dataType=="jsonp"){
                jsonpFn(settings.url,settings.data,settings.jsonp,settings.success);
                return;
            }
        }
        //ajax第二步
        xhr.open(settings.type, settings.url, settings.async, settings.username, settings.password);

        // 改写mimetype
        if (myUtil.isString(settings.mimeType) && xhr.overrideMimeType) {
            xhr.overrideMimeType(settings.mimeType);
        }
        if (myUtil.isObject(settings.headers)) {
            for (var n in settings.headers) {
                if (!settings.headers.hasOwnProperty(n)) continue;
                xhr.setRequestHeader(n, settings.headers[n]);
            }
        }
        // ajax第三步onreadystatechange
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var resText = xhr.responseText;
                if (/2\d{2}/.test(xhr.status)) {
                    if (settings.dataType.toLowerCase() === 'json') {
                        try {
                            resText = myUtil.JSONParse(xhr.responseText);
                        } catch (e){

                            deferred.error(e);
                            return settings.error(e);
                        }
                    }
                    settings.success(resText);
                    deferred.success(resText);
                }
                if (/^(4|5)\d{2}$/.test(xhr.status)) {
                    deferred.error(xhr.status, xhr.getAllResponseHeaders());
                    settings.error(xhr.status, xhr.getAllResponseHeaders());
                }
            }
        };
        //ajax第四步
        console.log(settings.data);
        xhr.send(settings.data);
        return deferred.promise;
    };
    //工具方法对象
    var myUtil = {
        //创建xhr对象
        getXHR: (function () {
            var xhrList = [function () {
                return new XMLHttpRequest();
            }, function () {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }, function () {
                return new ActiveXObject('MsXML2.XMLHTTP');
            }, function () {
                return new ActiveXObject('MsXML3.XMLHTTP');
            }], xhr = null;

            while (xhr = xhrList.shift()) {
                try {
                    xhr();
                    break;
                } catch (e) {
                    xhr = null;
                    continue;
                }
            }


            if (xhr === null) {
                throw new Error('没有ajax对象');
            } else {
                return xhr;
            }

        })(),
        //  遍历方法
        each: (function () {
            return function (list, callback, context) {
                for (var i = 0, l = list.length; i < l; i++) {
                    callback.call(context, list[i], i, list);
                }
            }
        })(),
        //替换默认参数
        extend: function (_old, _new) {
            // ?????????????????,?????????????????.
            var o = {};
            for (var n in _old) {
                if (!_old.hasOwnProperty(n)) continue;
                o[n] = _new[n] || _old[n];
            }
            return o;
        },
        // 转换uri格式
        encodeObject2URI: function (data) {
            var arr = [];
            for (var n in data) {
                if (!data.hasOwnProperty(n)) continue;
                if (myUtil.isFunction(data[n])) continue;
                var value = String(data[n]);
                arr.push(n+ '=' +value);
            }
            return arr.join('&');
        },
        // 拼接url
        hasSearch: function (url, data) {
            return url + (/\?/.test(url) ? '&' : '?') + data;
        },
        // 绑定this
        bind: (function () {
            if (Function.prototype.bind) {
                return function (func, context) {
                    return func.bind(context);
                }
            }
            return function (func, context) {
                return function () {
                    func.apply(context, arguments);
                }
            }
        })(),
        // 转化json对象
        JSONParse: (function () {
            if (global.JSON) {
                return function (data) {
                    return JSON.parse(data)
                };
            }
            return function (data) {
                return (new Function('return ' + data))();
            }
        })()
    };
    // 判断数据类型
    var isType = function (type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) == '[object ' + type + ']';
        }
    };
    myUtil.each(['String', 'Object', 'Function', 'Array'], function (item) {
        myUtil['is' + item] = isType(item);
    });

    // ???????
    var Verify = function (settins) {
        if (!(this instanceof Verify)) {
            return new Verify(settins);
        }
        this.obj = settins;
        this.stateList = [];
    };
    Verify.prototype = {
        validate: function (option) {
            this.stateList.push(option);
            return this;
        },
        start: function () {
            myUtil.each(this.stateList, function (item) {
                if (!item.validateRule(this[item.key])) {
                    throw new Error('[' + item.name + '] ' + item.errMsg);
                }
            }, this.obj);
        }
    };


    myUtil.each(['get', 'post'], function (item) {
        _h[item] = function (url, data, callback, datatype) {
            return myHttp.ajax({
                type: item,
                url: url,
                data: data,
                success: callback,
                dataType: datatype
            })
        }
    });
    //jsonp方法
    var jsonpFn=function(url, data, jsonpcb, callback){
        myHttp.count=0;
        var cbName = 'cb' + myHttp.count++;
        var jsonpName = 'myHttp.' + cbName;
        myHttp[cbName] = function (data) {
            try {
                callback(data);
            } finally {
                script.parentNode.removeChild(script);
                delete myHttp[cbName];
            }
        };
        var script = document.createElement('script');
        var tail= jsonpcb+'=' + jsonpName;
        script.src = myUtil.hasSearch(url, tail);
        document.head.appendChild(script);
    };
    // promise实现
    var Promise = function () {
        this.onDone = this.onFail = this.onAlways = function () {
        };
    };
    Promise.prototype = {
        done: function (func) {
            if (myUtil.isFunction(func)) {
                this.onDone = func;
            }
            return this;
        },
        fail: function (func) {
            if (myUtil.isFunction(func)) {
                this.onFail = func;
            }
            return this;
        },
        always: function (func) {
            if (myUtil.isFunction(func)) {
                this.onAlways = func;
            }
            return this;
        }
    };
    // deferr实现
    var Deferred = function () {
        this.promise = new Promise();
        this.status = 'unInit';
    };
    Deferred.prototype = {
        success: function (data) {
            this.status = 'done';
            this.promise.onDone(data)
        },
        error: function (data) {
            this.status = 'fail';
            this.promise.onFail(data)
        },
        always: function (data) {
            this.promise.onAlways(data)
        }
    }
})
(window);