<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import lib_setInterval from "@/lib/setInterval"
export default {
  name: 'App',
  created(){
    window.__vm__ = this;
    if(!this.$route.query.project_id){
      this.$ZAlert.show({
        title:"创建新项目",
        components:"Alert/CreateNewProjects",
        width:"500px",
        showClose:false,
        mask:true,
        hideOnBlur:false,
        props:{
          vm:()=>this
        }
      });
    }
  },
  mounted() {
    this.setInterval();
  },
  methods:{
    setInterval(){
      //全局定时器
      setInterval(()=>{
        try {
          Object.keys(lib_setInterval).forEach(keyName=>{
            try {
              lib_setInterval[keyName].call(this,keyName);
            }catch (e) {};
          })
        }catch (e) {};
      });
    }
  }
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
