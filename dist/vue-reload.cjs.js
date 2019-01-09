/*!
* vue-reload v0.0.8
* (c) 2017-2019 fan19900404
* Released under the MIT License.
*/
'use strict';

var qs = require('qs');

/**
 * 浏览器标准刷新方法
 * @param num 值为0，为了兼容vue-router的API
 */
const go = (num) => {
    if (num === 0) {
        location.reload(true);
    }
};
/**
 * 判断是否在IOS中
 */
const isIOS = () => /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
/**
 * 获取时间戳
 */
const getNowTimeStamp = () => `${Date.now()}`;
/**
 * 处理url，获得更新时间戳之后的url
 */
const getUrl = () => {
    let { origin, pathname, search, hash } = location;
    if (search) {
        const searchObj = qs.parse(search.slice(1));
        searchObj.jxytime = getNowTimeStamp();
        search = `?${qs.stringify(searchObj)}`;
    }
    else {
        search = `?jxytime=${getNowTimeStamp()}`;
    }
    return `${origin}${pathname}${search}${hash}`;
};
/**
 * 防止缓存，强制刷新
 * @param router vue-router实例
 */
function reload(router = { go: go }) {
    if (isIOS()) {
        // 为了兼容IOS
        location.replace(getUrl());
    }
    else {
        router.go(0);
    }
}

module.exports = reload;
