import applicationController from "../../../UnityFrontUtils/controller/applicationController";
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { createApp } from './app'
import { CompilerOptions, ModuleKind, ScriptTarget, transpileModule } from 'typescript'
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

    compiler(){
        const Vue = require("vue");
        const VueLoader = require("vue-loader");
        const vueTemplateCompiler = require("vue-template-compiler");
        const filePath = resolve(__dirname,"./aa.vue")
        const fileStr = readFileSync(filePath,"utf8");
        const data = vueTemplateCompiler.parseComponent(fileStr);
        /**
         * vue-loader
         */
        // console.log(VueLoader.call({
        //     emitError:new Function,
        //     resourcePath:filePath,
        //     resourceQuery:[]
        // },fileStr))

        /**
         * ts 输出
         */
        const TranspileOutput = transpileModule(data.script.content,{
            compilerOptions:<CompilerOptions>{
                module:ModuleKind.CommonJS,
                target:ScriptTarget.ES3
            }
        })
        console.log(TranspileOutput.outputText)
        /**
         * 获取虚拟Dom
         */
        // const VNode = vueTemplateCompiler.compileToFunctions(data.template.content).render.call({
        //     bb:new Function(),
        //     aa:111,
        //     _c:new Vue().$createElement,
        //     _v:Vue.prototype._v
        // })
        // console.log(VNode)

        const render = vueTemplateCompiler.compile(data.template.content).render
        this.$_success({
            render,
            js:TranspileOutput.outputText
        })
    }
}