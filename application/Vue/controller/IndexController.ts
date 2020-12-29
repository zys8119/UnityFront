import applicationController from "../../../UnityFrontUtils/controller/applicationController";
import { readFileSync } from "fs"
import { resolve } from "path"
import { createApp } from './app'
export class IndexController extends applicationController {
    constructor() {
        super();
    }

    index(){
        const renderer = require('vue-server-renderer').createRenderer()
        const { app, router } = createApp()
        // 设置服务器端 router 的位置
        console.log(this.$_query.url)
        router.push(this.$_query.url || "/")
        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return this.$_error()
            }
            renderer.renderToString(app).then(html => {
                this.Render({
                    app:html
                })
            }).catch(err => {
                this.$_error()
            })
        }, this.$_error)

    }
}