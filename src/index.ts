import { parse, stringify } from "querystring";

/**
 * 浏览器标准刷新方法
 * @param num 值为0，为了兼容vue-router的API
 */
const go = (num: number): void => {
  if (num === 0) {
    location.reload(true);
  }
};

/**
 * 判断是否在IOS中
 */
const isIOS = (): boolean => /(iPhone|iPad|iPod)/i.test(navigator.userAgent);

/**
 * 获取时间戳
 */
const getNowTimeStamp = (): string => `${Date.now()}`;

/**
 * 处理url，获得更新时间戳之后的url
 */
const getUrl = (): string => {
  let { origin, pathname, search, hash } = location;
  if (search) {
    const searchObj = parse(search.slice(1, -1));
    searchObj.jxytime = getNowTimeStamp();
    search = `?${stringify(searchObj)}`;
  } else {
    search = `?jxytime=${getNowTimeStamp()}`;
  }
  return `${origin}${pathname}${search}${hash}`;
};

/**
 * 防止缓存，强制刷新
 * @param router vue-router实例
 */
function reload(router = { go }): void {
  if (isIOS()) {
    // 为了兼容IOS
    location.replace(getUrl());
  } else {
    router.go(0);
  }
}

export default reload;
