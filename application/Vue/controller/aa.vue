<template>
    <div class="aa" :a="aa" @click="bb">
            asdasdasd
        <el-button>asdasd</el-button>
        <bb></bb>
    </div>
</template>

<script lang="ts">
import bb from "../bb"
import { ComponentOptions } from "vue"
export default <ComponentOptions>{
    name: "aa",
    components:{bb},
    data(){
        return {
            aa:11
        };
    },
    methods:{
        bb(a = 1){
            const aa = ()=>{
                console.log(5555, Object.assign({},{
                    ...this.aa,
                }))
            }
        }
    }
}
</script>

<style scoped lang="less">
.aa{
}
</style>