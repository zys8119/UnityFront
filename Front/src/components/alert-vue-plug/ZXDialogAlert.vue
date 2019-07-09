<template>
    <div class="ZXDialogAlert">
        <x-dialog :mask-z-index="maskZIndex" :dialog-style="{width:width,maxWidth:maxWidthValue}" :hide-on-blur="hideOnBlur" v-model="show" @on-show="onShow" @on-hide="onHide" class="x-dialog">
            <div class="ZXDialogAlertTitle" v-if="showTitile">
                <span class="text">{{title}}</span>
                <span class="iconfont" @click="onClose" v-if="showClose">&#xe6b5;</span>
                <span class="minTitle" v-if="minTitle">{{minTitle}}</span>
            </div>
            <component ref="component" class="ZXDialogAlertContent"  v-if="show && components" :is="temp"></component>
            <div v-if="show && !components && content" v-html="content" class="ZXDialogAlertContent console-PagePadding"></div>
        </x-dialog>
    </div>
</template>

<script>
    import importVue from "import-vue"
    import { XDialog } from "vux"
    export default {
        name: "z-x-dialog-alert",
        components:{ XDialog },
        props:{
            width:{
                type:String,
                default:"80%",
            },
            maxWidth:{
                type:String,
                default:null
            },
            components:{
                type:String,
                default:null
            },
            hideOnBlur:{
                type:Boolean,
                default:true
            },
            showTitile:{
                type:Boolean,
                default:true
            },
            showClose:{
                type:Boolean,
                default:true
            },
            maskZIndex:{
                type:Number,
                default:1000
            },
            title:{
                type:String,
                default:null
            },
            minTitle:{
                type:String,
                default:null
            },
            props:{
                type:Object,
                default:()=>{
                    return {}
                }
            },
            content:{
                type:String,
                default:null
            }
        },
        data(){
            return {
                show:false,
            }
        },
        methods:{
            onShow(){
                this.$emit('on-show');
            },
            onHide(){
                this.$emit('on-hide');
            },
            onClose(){
                this.show = false;
                this.$emit('on-hide');
            },
            init(){
                try {
                    let  currentView = importVue(this.components).component;
                    if(currentView.props && !currentView.CopyPropsBool){
                        currentView.CopyPropsBool = true;
                        currentView.CopyProps = JSON.parse(JSON.stringify(currentView.props));
                    }
                    for (let j in currentView.CopyProps){
                        currentView.props[j].default = currentView.CopyProps[j].default;
                    }
                    for(let i in this.props){
                        try {
                            if(Object.keys(currentView.props).indexOf(i) > -1){
                                currentView.props[i].default = this.props[i];
                            }
                        }catch (e){}
                    }
                    this.$nextTick(()=>{
                        if(currentView.methods && !currentView.methodsBool){
                            currentView.methodsBool = true;
                            currentView.CopyMethods = JSON.parse(JSON.stringify(currentView.methods));
                        }
                        for (let j in currentView.CopyMethods){
                            currentView.$vnode.componentOptions._events[j] = currentView.CopyMethods[j];
                        }
                        for(let i in this._event){
                            this.$refs.component._events[i] = [this._event[i]];
                        }
                    })

                    return currentView;
                }catch (e){}
            }
        },
        computed:{
            temp(){
                return this.init();
            },
            maxWidthValue(){
                if(this.maxWidth){
                    return this.maxWidth;
                }
                return this.width;
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/vars";
    .ZXDialogAlert{
        &/deep/ .x-dialog{
            width: auto;
            .weui-mask{
                z-index: 499!important;
            }
            .weui-dialog{
                width: auto;
                z-index: 500!important;
                border-radius: 6px;
                overflow: hidden;
                background-color: @themeColor;
            }
        }
        .ZXDialogAlertTitle{
            width: 100%;
            background-color: #FFFFFF;
            line-height: 40px;
            text-align: left;
            overflow: hidden;
            .minTitle{
                color: @themeColor;
                margin-left: @pa;
            }
            .iconfont{
                float: right;
                width: 50px;
                display: inline-block;
                text-align: center;
                font-size: 14px;
                cursor: pointer;
                &:hover{
                    background-color: #f8f8f8*0.9;
                }
            }
            .text{
                float: left;
                margin-left: 30px;
            }
        }
        .ZXDialogAlertContent{
            text-align: left;
            padding: @pa;
            background-color: @themeColor;
        }
    }
</style>
