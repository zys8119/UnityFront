<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import lib_setInterval from "@/lib/setInterval"
import { UnityFrontView } from "@/data"
import html2canvas from "html2canvas";
export default {
  name: 'App',
  data(){
    return {
      time:null
    }
  },
  created(){
    window.__vm__ = this;
  },
  watch:{
    $route(){
      try {
        clearInterval(this.time);
      }catch (e) {}
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods:{
    setInterval(){
      //全局定时器
      this.time = setInterval(()=>{
        try {
          Object.keys(lib_setInterval).forEach(keyName=>{
            try {
              lib_setInterval[keyName].call(this,keyName);
            }catch (e) {};
          })
        }catch (e) {};
      });
    },
    setUnityFrontView(config){
      this.action({moduleName:"UnityFrontView",goods:null});
      this.action({moduleName:"UnityFrontView",goods:{}});
      this.action({moduleName:"UnityFrontView",goods:config});
    },
    init(){
      if(this.$route.path === "/view"){
        this.setInterval();
        if(this.$route.query.project_id){
          this.api().view_get_project({
            project_id:this.$route.query.project_id
          }).then(res=>{
            try {
              let config = res.data.config;
              if(!config){
                config = UnityFrontView;
              }
              config.component = config.component || [];
              if(!config.image){
                html2canvas(document.getElementById("UnityFrontViewContent"),{
                  allowTaint:true,
                  useCORS:true,
                  copyStyles:true,
                }).then(canvas => {
                  config.image = canvas.toDataURL("image/png");
                  this.setUnityFrontView(config);
                });
              }
              this.setUnityFrontView(config);
            }catch (e) {}
          })
        }else {
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
      }
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
