<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
//变量
@import './assets/less/vars.less';
//公共方法及样式
@import './assets/less/public.less';
//vux样式重置
@import '~vux/src/styles/reset.less';
//vux 1px解决方案，更多样式请参考vux官方
@import '~vux/src/styles/1px.less';
</style>
