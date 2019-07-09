import Vue from 'vue'
import Router from 'vue-router'
import importVue from "import-vue"

Vue.use(Router)

export default new Router({
  routes: [
    importVue("UnityFront/UnityFront","/","UnityFront"),
  ]
})
