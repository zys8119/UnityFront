import { RouterOptions } from "vue-router"
import {CreateElement, RenderContext, VNode} from "vue";
import { DefaultProps } from "vue/types/options";
const Vue = require('vue')
const Router = require('vue-router')
Vue.use(Router)


export function createRouter () {
    return new Router(<RouterOptions>{
        mode: 'history',
        routes: [
            {
                path:"/",
                component: {
                    render(createElement: CreateElement, hack: RenderContext<DefaultProps>): VNode {
                        return createElement("div","asasdsd")
                    }
                }
            }
        ]
    })
}