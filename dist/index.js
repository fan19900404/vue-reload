"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring_1 = require("querystring");
/**
 * 浏览器标准刷新方法
 * @param num 值为0，为了兼容vue-router的API
 */
var go = function (num) {
    if (num === 0) {
        location.reload(true);
    }
};
/**
 * 判断是否在IOS中
 */
var isIOS = function () { return /(iPhone|iPad|iPod)/i.test(navigator.userAgent); };
/**
 * 获取时间戳
 */
var getNowTimeStamp = function () { return "" + Date.now(); };
/**
 * 处理url，获得更新时间戳之后的url
 */
var getUrl = function () {
    var origin = location.origin, pathname = location.pathname, search = location.search, hash = location.hash;
    if (search) {
        var searchObj = querystring_1.parse(search.slice(1, -1));
        searchObj.jxytime = getNowTimeStamp();
        search = "?" + querystring_1.stringify(searchObj);
    }
    else {
        search = "?jxytime=" + getNowTimeStamp();
    }
    return "" + origin + pathname + search + hash;
};
/**
 * 防止缓存，强制刷新
 * @param router vue-router实例
 */
function reload(router) {
    if (router === void 0) { router = { go: go }; }
    if (isIOS()) {
        // 为了兼容IOS
        location.replace(getUrl());
    }
    else {
        router.go(0);
    }
}
exports.default = reload;
//# sourceMappingURL=index.js.map