import { RouterOptions } from "vue-router"
// @ts-ignore
import {CreateElement, RenderContext, VNode} from "vue";
// @ts-ignore
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
                    data(){
                        return {
                            a:11,
                        }
                    },
                    template:`
                        <div>
                            <h1 @click="bb">{{a}}</h1>
                            <div v-for="i in  50">{{i}}</div>
                        </div>
                    `,
                    mounted() {
                        console.log(888888888)
                    },
                    methods:{
                        bb(e){
                            console.log(111)
                        }
                    }
                }
            }
        ]
    })
}