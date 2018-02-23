# vue-reload

解决 ios 下，微信端，vue-router 的这个。$ router.go（0）无法刷新问题

## Typescript

使用 TypesScript 作为开发语言

## 依赖

依赖`qs`模块

## 安装

```bash
npm i git+https://github.com/fan19900404/vue-reload.git
```

## 使用

```js
// vue文件的script中
import reload from "vue-reload";

export default {
  data() {
    return {};
  },
  methods: {
    refurbish() {
      reload(this.$router);
    }
  }
};
```

```html
<!-- 浏览器中 -->
<script src="./dist/vue-reload.min.js"></script>
<script>
  // 刷新页面
  setTimeout(()=>{vueReload()},1000)
</script>
```
