const Vue = require("vue")
// @ts-ignore
import { createRouter } from './router'
export function createApp () {
    // 创建 router 实例
    const router = createRouter()

    const app = new Vue({
        // 注入 router 到根 Vue 实例
        router,
        render: h => h("router-view")
    })

    // 返回 app 和 router
    return { app, router }
}