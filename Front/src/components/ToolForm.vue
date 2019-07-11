<template>
    <div class="ToolForm">
        <x-input class="z_Input" title="组件名称" value="input"></x-input>
        <uf-group title="基础属性" open>
            内容sdfsd
        </uf-group>
    </div>
</template>

<script>
    import UfGroup from "./UfGroup"
    import { XInput } from "vux"
    export default {
        name: "ToolForm",
        components:{
            UfGroup, XInput
        },
        mounted() {
            var a = function () {
                var c = 11;
                var b = function () {
                    console.log(this)
                }
                new b()
            }
        }
    }
</script>

<style scoped lang="less">
    .ToolForm {

    }
</style>
