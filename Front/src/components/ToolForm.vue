<template>
    <div class="ToolForm" :info="componentInfo">
        <uf-group title="视图属性">
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
                <flexbox-item title="width">
                    <uf-color title="背景颜色"
                              :value="airforce.UnityFrontView.backgroundColor"
                              @on-change="airforce.input($event.hex8,'backgroundColor','UnityFrontView')"
                    ></uf-color>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item title="width">
                    <x-input class="z_Input" title="背景图"
                             :value="airforce.UnityFrontView.backgroundImage"
                             @on-change="airforce.input($event,'backgroundImage','UnityFrontView')"
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
        <uf-group title="组件基础属性" open v-if="info">
            <flexbox>
                <flexbox-item title="名称">
                    <x-input class="z_Input" title="名称"
                             :value="info.name"
                             @on-change="change($event,'info.name')"
                    ></x-input>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item title="width">
                    <x-number class="x_number" title="width" fillable
                              :value="formData.width"
                              @input="change($event,'width')"
                    ></x-number>
                </flexbox-item>
                <flexbox-item title="height">
                    <x-number class="x_number" title="height" fillable
                              :value="formData.height"
                              @input="change($event,'height')"
                    ></x-number>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item title="left">
                    <x-number class="x_number" title="left" fillable
                              :value="formData.left"
                              @input="change($event,'left')"
                    ></x-number>
                </flexbox-item>
                <flexbox-item title="top">
                    <x-number class="x_number" title="top" fillable
                              :value="formData.top"
                              @input="change($event,'top')"
                    ></x-number>
                </flexbox-item>
            </flexbox>
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
                formData:{},
                index:-1,
            }
        },
        components:{
            UfGroup, XInput, Flexbox, FlexboxItem, Selector, UfColor, XTextarea, XNumber
        },
        computed:{
            componentInfo(){
                try {
                    this.formData = _.cloneDeep(this.airforce.UnityFrontView.component.find(e=>e.operate)) || {};
                    this.index = _.cloneDeep(this.airforce.UnityFrontView.component.findIndex(e=>e.operate));
                    return;
                }catch (e) {}
                this.index = -1;
                this.formData = {};
            },
            info(){
                return this.formData.info
            }
        },
        methods:{
            change(val,key){
                let component = _.cloneDeep(this.airforce.UnityFrontView.component);
                component[this.index] = _.set( component[this.index],key,val);
                this.action({moduleName:"UnityFrontView", goods:{component:null}});
                this.action({moduleName:"UnityFrontView", goods:{component}});
            }
        }
    }
</script>

<style scoped lang="less">
    .ToolForm {

    }
</style>
