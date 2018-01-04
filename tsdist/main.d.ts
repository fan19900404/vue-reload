/**
 * 防止缓存，强制刷新
 * @param router vue-router实例
 */
declare function reload(router?: {
    go: (num: number) => void;
}): void;
export = reload;
