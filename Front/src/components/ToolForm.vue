<template>
    <div class="ToolForm" :info="componentInfo">
        <uf-group title="视图属性" open>
            <x-input class="z_Input" title="名称"
                     :value="airforce.UnityFrontView.title"
                     @on-change="airforce.input($event,'title','UnityFrontView')"
            ></x-input>

            <flexbox>
                <flexbox-item title="width">
                    <x-input class="z_Input" title="缩放"
                             :value="airforce.UnityFrontView.scaleIndex*100"
                             @on-change="airforce.input($event/100,'scaleIndex','UnityFrontView')"
                    ></x-input>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item title="width">
                    <x-number class="x_number" title="width" fillable
                             :value="airforce.UnityFrontView.width"
                             @input="airforce.input($event,'width','UnityFrontView')"
                    ></x-number>
                </flexbox-item>
                <flexbox-item title="height">
                    <x-number class="x_number" title="height" fillable
                              :value="airforce.UnityFrontView.height"
                              @input="airforce.input($event,'height','UnityFrontView')"
                    ></x-number>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item title="left">
                    <x-number class="x_number" title="left" fillable
                             :value="airforce.UnityFrontView.left"
                             @input="airforce.input($event,'left','UnityFrontView')"
                    ></x-number>
                </flexbox-item>
                <flexbox-item title="top">
                    <x-number class="x_number" title="top" fillable
                              :value="airforce.UnityFrontView.top"
                              @input="airforce.input($event,'top','UnityFrontView')"
                    ></x-number>
                </flexbox-item>
            </flexbox>
        </uf-group>
        <uf-group title="基础属性" open>
<!--            <x-input class="z_Input" title="组件名称" value="input"-->
<!--                     :value="formData.info.name"-->
<!--                     @on-change="change"-->
<!--            ></x-input>-->
            <flexbox>
                <flexbox-item title="width">
                    <x-input class="z_Input" title="width" value="0"></x-input>
                </flexbox-item>
                <flexbox-item title="height">
                    <x-input class="z_Input" title="height" value="0"></x-input>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item title="background-color">
                    <uf-color title="背景颜色" v-model="color1"></uf-color>
                </flexbox-item>
            </flexbox>
        </uf-group>
        <uf-group title="盒子属性">
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
        </uf-group>
        <uf-group title="布局">
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
        </uf-group>
        <uf-group title="文字">
            <x-textarea title="内容" class="z_textarea">sdadf</x-textarea>
            <flexbox>
                <flexbox-item title="padding-color">
                    <uf-color title="文字颜色" v-model="color2"></uf-color>
                </flexbox-item>
            </flexbox>
        </uf-group>
        <uf-group title="样式表" open>
            <z-select class="z_select z_select_more" v-model="value" :options="list" :show-labels="false" placeholder="搜索或选择" :multiple="true" :searchable="true"></z-select>
        </uf-group>
        <uf-group title="脚本" open>
            <z-select class="z_select z_select_more" v-model="value" :options="list" :show-labels="false" placeholder="搜索或选择" :multiple="true" :searchable="true"></z-select>
        </uf-group>
    </div>
</template>

<script>
    import UfGroup from "./UfGroup"
    import UfColor from "./UfColor"
    import { XInput, Flexbox, FlexboxItem, Selector, XTextarea, XNumber  } from "vux"
    export default {
        name: "ToolForm",
        data(){
            return {
                color1:"#f00",
                color2:"#f00",
                value:"",
                value2:"",
                list:["inherit","relative","absolute","fixed"],
                floatList:["inherit","left","right","top","bottom","none"],
                formData:{},
                index:{},
            }
        },
        components:{
            UfGroup, XInput, Flexbox, FlexboxItem, Selector, UfColor, XTextarea, XNumber
        },
        computed:{
            componentInfo(){
                // try {
                //
                //     this.formData = _.cloneDeep(this.airforce.UnityFrontView.component.find(e=>e.operate));
                //     return;
                // }catch (e) {}
                this.formData = {};
            }
        },
        methods:{
            change(val){
                console.log(val);
            }
        }
    }
</script>

<style scoped lang="less">
    .ToolForm {

    }
</style>
