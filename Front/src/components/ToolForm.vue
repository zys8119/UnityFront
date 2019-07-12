<template>
    <div class="ToolForm">
        <x-input class="z_Input" title="组件名称" value="input"></x-input>
        <uf-group title="基础属性" open>
            <flexbox>
                <flexbox-item>
                    <z-select class="z_select" v-model="value" :options="list" :show-labels="false" placeholder="posType"></z-select>
                </flexbox-item>
                <flexbox-item>
                    <z-select class="z_select" v-model="value2" :options="floatList" :close-on-select="false" :show-labels="false" placeholder="float"></z-select>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item title="left">
                    <x-input class="z_Input" title="Left" value="0"></x-input>
                </flexbox-item>
                <flexbox-item title="right">
                    <x-input class="z_Input" title="Right" value="0"></x-input>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item title="width">
                    <x-input class="z_Input" title="width" value="0"></x-input>
                </flexbox-item>
                <flexbox-item title="height">
                    <x-input class="z_Input" title="height" value="0"></x-input>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item title="margin-top">
                    <x-input class="z_Input" title="maT" value="0"></x-input>
                </flexbox-item>
                <flexbox-item title="margin-right">
                    <x-input class="z_Input" title="maR" value="0"></x-input>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item title="margin-bottom">
                    <x-input class="z_Input" title="maB" value="0"></x-input>
                </flexbox-item>
                <flexbox-item title="margin-left">
                    <x-input class="z_Input" title="maL" value="0"></x-input>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item title="padding-top">
                    <x-input class="z_Input" title="paT" value="0"></x-input>
                </flexbox-item>
                <flexbox-item title="padding-right">
                    <x-input class="z_Input" title="paR" value="0"></x-input>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item title="padding-bottom">
                    <x-input class="z_Input" title="paB" value="0"></x-input>
                </flexbox-item>
                <flexbox-item title="padding-left">
                    <x-input class="z_Input" title="paL" value="0"></x-input>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item title="background-color">
                    <uf-color title=""></uf-color>
                </flexbox-item>
                <flexbox-item title="padding-color">
                    <uf-color></uf-color>
                </flexbox-item>
            </flexbox>
        </uf-group>
    </div>
</template>

<script>
    import UfGroup from "./UfGroup"
    import UfColor from "./UfColor"
    import { XInput, Flexbox, FlexboxItem, Selector  } from "vux"
    export default {
        name: "ToolForm",
        data(){
            return {
                value:"",
                value2:"",
                list:["inherit","relative","absolute","fixed"],
                floatList:["inherit","left","right","top","bottom","none"],
            }
        },
        components:{
            UfGroup, XInput, Flexbox, FlexboxItem, Selector, UfColor
        },
        mounted() {

        }
    }
</script>

<style scoped lang="less">
    .ToolForm {

    }
</style>
