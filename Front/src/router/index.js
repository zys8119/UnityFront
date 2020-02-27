import Vue from 'vue'
import Router from 'vue-router'
import importVue from "import-vue"

Vue.use(Router)

export default new Router({
  routes: [
    importVue({
      name:"ViewManagement/ViewManagement",
      children:[
        importVue("ViewManagement/ViewManagementScene","/","UnityFront场景管理",{meta:{viewKey:"scene"}}),
        importVue("ViewManagement/ViewManagementView","/viewManagement","UnityFront视图管理",{meta:{viewKey:"view"}}),
      ]
    }),
    importVue("UnityFront/UnityFrontPreview","/preview/:id","视图预览"),
    importVue("UnityFront/UnityFront","/view","UnityFront"),
    importVue("install/install","/install","初始化项目"),
    importVue("WebSocketTest/WebSocketTest","/WebSocketTest","WebSocketTest"),
  ]
})
