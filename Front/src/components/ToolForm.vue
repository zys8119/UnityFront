<template>
    <div class="ToolForm">
        <uf-group title="基础属性">
            内容sdfsd
        </uf-group>
    </div>
</template>

<script>
    import UfGroup from "./UfGroup"
    export default {
        name: "ToolForm",
        components:{
            UfGroup
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
