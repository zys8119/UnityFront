// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "store-vue"
import loginVue from "login-vue"
import layoutInitState from "./store/layoutInitState"

Vue.config.productionTip = false



router.beforeEach((to,from,next)=>{
    loginVue(to, from, next, store,{
        layoutInitState
    });
});

//国际化
import zi18nz from "zi18nz"
Vue.use(zi18nz);

//弹出层
import alertVuePlug from "./components/alert-vue-plug/index"
Vue.use(alertVuePlug);

//全局注入指令
import directive from "./directive"
Object.keys(directive).forEach(directiveName=>{
    Vue.directive(directiveName, directive[directive])
});


//Vux插件
//todo 按需加载===============
import { AlertPlugin, ToastPlugin, ConfirmPlugin } from 'vux'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)

//todo 全局加载===============
// const Vux = require('vux');
// Object.keys(Vux).map(e=>{
//     if(e.indexOf("Plugin") > -1 ){
//         //插件
//         try {
//             Vue.use(Vux[e]);
//         }catch (err){}
//     }else {
//         //组件
//         try {
//             let component = Vux[e];
//             if(component.name && component.name.length > 0){
//                 if(["video","WeekCalendar","VTooltip"].some(e=>e == Vux[e].name)){
//                     Vux[e].name = "X-"+Vux[e].name.toLowerCase();
//                 }
//                 Vue.component(Vux[e].name,Vux[e])
//             }else {
//                 console.log(component,e)
//             }
//         }catch (err){}
//     }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
