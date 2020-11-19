import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/less/public.less';
import '../package/ui';
import plug from '@/plug/index';
//引入store-vue
import store from "store-vue"
import loginVue from "login-vue"
import layoutInitState from "@/store/layoutInitState"




Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(plug);

router.beforeEach((to, from, next)=>{
  loginVue(to, from, next, store,{
    layoutInitState,
  });
})

window._this = new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
