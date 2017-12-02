"use strict";
exports.__esModule = true;
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
 * 防止缓存，强制刷新
 * @param {any} router vue-router实例
 * @export
 */
function reload(router) {
    if (router === void 0) { router = { go: go }; }
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
        var hash = location.hash;
        var origin = location.origin;
        var pathname = location.pathname;
        var search = location.search;
        if (search) {
            var searchObj = querystring_1.parse(search.slice(1, -1));
            searchObj.jxytime = String(Date.now());
            search = "?" + querystring_1.stringify(searchObj);
        }
        else {
            search = "?jxytime=" + 10000 * Math.random();
        }
        location.replace("" + origin + pathname + search + hash);
    }
    else {
        router.go(0);
    }
}
exports["default"] = reload;
//# sourceMappingURL=index.js.map