import { parse, stringify } from 'querystring';

/**
 * 浏览器标准刷新方法
 * @param num 值为0，为了兼容vue-router的API
 */
const go = (num: number) => {
    if (num === 0) {
        location.reload(true)
    }
}

/**
 * 防止缓存，强制刷新
 * @param {any} router vue-router实例
 * @export
 */
export default function reload(router = { go }): any {
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) { // 为了兼容IOS
        const hash = location.hash;
        const origin = location.origin;
        const pathname = location.pathname;
        let search = location.search;
        if (search) {
            const searchObj = parse(search.slice(1, -1));
            searchObj.jxytime = String(Date.now());
            search = `?${stringify(searchObj)}`;
        } else {
            search = `?jxytime=${10000 * Math.random()}`;
        }
        location.replace(`${origin}${pathname}${search}${hash}`);
    } else {
        router.go(0);
    }
}