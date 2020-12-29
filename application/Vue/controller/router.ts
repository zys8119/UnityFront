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
                    data(){
                        return {
                            a:11,
                        }
                    },
                    template:`
                        <div>
                            <h1 @click="bb">{{a}}</h1>
                            <div v-for="i in  100">{{i}}</div>
                        </div>
                    `,
                    mounted() {
                        console.log(888)
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