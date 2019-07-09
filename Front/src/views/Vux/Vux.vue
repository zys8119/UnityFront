<template>
    <div class="Vux">
        <h1>欢迎使用Vux</h1>
        <group title="翻译测试">
            <box gap="15px">
                <p>{{$t("Translation test")}}</p>
                <p>{{$t("I am a partial translation test")}}</p>
            </box>
        </group>
        <group title="主题测试">
            <x-button type="primary">vux主题测试</x-button>
        </group>
    </div>
</template>

<script>
    import { XButton, Box, Group } from "vux"
    export default {
        name: "vux",
        components:{ XButton, Box, Group },
        data(){
            return {
                $t_t:{
                    "zh-cn":{
                        "I am a partial translation test":"我是局部翻译测试"
                    }
                }
            }
        },
        mounted(){

        }
    }
</script>

<style scoped lang="less">
.Vux{
    padding: 15px;
    background-color: #e5e5e5;
    h1{
        text-align: center;
    }
}
</style>