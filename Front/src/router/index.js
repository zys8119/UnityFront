import Vue from 'vue'
import Router from 'vue-router'
import importVue from "import-vue"

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    // importVue("HelloWorld/HelloWorld","/","欢迎使用vue"),
    // importVue("Vux/Vux","/Vux","欢迎使用Vux"),
    importVue("UnityFront/UnityFront","/","UnityFront"),
  ]
})
