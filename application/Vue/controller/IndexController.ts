import applicationController from "../../../UnityFrontUtils/controller/applicationController";
import { resolve } from 'path'
import { createApp } from './app'
export class IndexController extends applicationController {
    constructor() {
        super();
        this.readdirSync(resolve(__dirname)).forEach(item=>{
            delete require.cache[item.path];
        })
    }

    index(){
        const renderer = require('vue-server-renderer').createRenderer()
        const { app, router } = createApp(this)
        router.back();
        // 设置服务器端 router 的位置
        router.push(this.$_query.url || "/")
        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return this.$_error()
            }
            const appJs = {
                template:"",
                data(){
                    return {}
                },
                mounted(){},
                methods:{},
                ...matchedComponents[0],
            }
            let methods = "";
            for(let k in appJs.methods){
                methods += `${k}:${appJs.methods[k].toString()},`;
            }
            renderer.renderToString(app).then(html => {
                this.Render({
                    app:`
                        {
                            template:\`${appJs.template}\`,
                            data:${appJs.data.toString()},
                            mounted:${appJs.mounted.toString()},
                            methods:{${methods}},
                            ${appJs.render ? "render :" + appJs.render.toString() + "," : ""}
                        }
                    `,
                    html
                })
            }).catch(err => {
                console.log(err)
                this.$_error()
            })
        }, this.$_error)

    }
}