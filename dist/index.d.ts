/**
 * 防止缓存，强制刷新
 * @param {any} router vue-router实例
 * @export
 */
export default function reload(router?: {
    go: (num: number) => void;
}): any;
