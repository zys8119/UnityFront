<template>
    <div class="UnityFrontView">
        <unity-front-layout-title title="场景视图"></unity-front-layout-title>
        <div class="UnityFrontViewContent" ref="UnityFrontViewContent" id="UnityFrontViewContent"
             v-dragdrop dragdrop=".UnityFrontViewContent"
             @drop="drop"
             @dragover="allowDrop"
             :style="{
                 left:airforce.UnityFrontView.left+'px',
                 top:airforce.UnityFrontView.top+'px',
                 width:airforce.UnityFrontView.width+'px',
                 height:airforce.UnityFrontView.height+'px',
                 transform:`scale(${airforce.UnityFrontView.scaleIndex})`,
                 backgroundColor:airforce.UnityFrontView.backgroundColor,
                 backgroundImage:`url(${airforce.UnityFrontView.backgroundImage})`
             }"
             :item="JSON.stringify({
                left:airforce.UnityFrontView.left,
                top:airforce.UnityFrontView.top,
             })"
        >
            <div class="ProjectGridItem" v-for="(item,key) in airforce.UnityFrontView.component" :key="key"
                 v-dragdrop dragdrop="draggable_data"
                 :id="item.id"
                 :style="{
                    left:`${item.left}px`,
                    top:`${item.top}px`,
                    width:`${item.width}px`,
                    height:`${item.height}px`,
                    zIndex:key+10
                }"
                 :class="{select:item.operate}"
                 @dblclick="ondblclick(item,key)"
                 :item="JSON.stringify({...item,key})"
            >
                <div class="ProjectGridItemBox">
                    <div class="iconfont" v-html="item.info.icon"></div>
                    <p class="msg" v-html="item.info.name"></p>
                </div>
                <span v-for="(sapnItem,key2) in OperateList" :key="`${key2}-o`" :class="`operate ${sapnItem}`"
                      v-dragdrop dragdrop="draggable_data_operate"
                      :item="JSON.stringify({...item,key, type:sapnItem})"></span>
            </div>
            <OnContextMenu ref="OnContextMenu"></OnContextMenu>
        </div>
        <div class="Range">
            <Range class="x-range"
                   :value="airforce.UnityFrontView.scaleIndex*100"
                   @on-change="RangeChange"
                   :min="10" :max="400"
                   minHTML="0"
                   maxHTML="100"
            ></Range>
            <x-button class="z_XButton" @click.native="airforce.input({left:0,top:0,scaleIndex:1},'UnityFrontView')">重置视图</x-button>
        </div>
    </div>
</template>

<script>
    import UnityFrontLayoutTitle from "@/components/layout/UnityFrontLayoutTitle"
    import { OnContextMenu } from "@/components/index"
    import { Range, XButton } from "vux"
    export default {
        name: "UnityFrontView",
        components:{ UnityFrontLayoutTitle, OnContextMenu, Range, XButton },
        data(){
            return {
                bool:true,
                OperateList:[
                    "top_left","top_right","bottom_left","bottom_right",
                    "center_left","center_top","center_right","center_bottom",
                ],
            }
        },
        methods:{
            drop(ev) {
                try {
                    let data = JSON.parse(ev.dataTransfer.getData("data"));
                    let n = 300;
                    let id = Date.now().toString()+parseInt(Math.random()*100000);
                    let component = _.cloneDeep(this.airforce.UnityFrontView.component);
                    component.push({
                        id,
                        operate:false,
                        left:parseInt((ev.layerX - n/2)),
                        top:parseInt((ev.layerY - n/2)),
                        width:n,
                        height:n,
                        info:data
                    });
                    this.action({moduleName:"UnityFrontView", goods:{component:null}});
                    this.action({moduleName:"UnityFrontView", goods:{component}});
                    ev.preventDefault();
                }catch (e) {}
            },
            allowDrop(ev) {
                ev.preventDefault();
            },
            windowAddMouseWheel(){
                this.$utils.windowAddMouseWheel((type,e)=>{
                    if(e.path.some(e=>e == this.$refs.UnityFrontViewContent)){
                        let scaleIndex = this.airforce.UnityFrontView.scaleIndex;
                        if(scaleIndex == 0){
                            scaleIndex = 1;
                        };
                        if(type == "top"){
                            //最大
                            if(scaleIndex >= 4){
                                return;
                            }
                            scaleIndex += 0.02;
                        }else if(type == "down"){
                            //最小
                            if(scaleIndex <= 0.1){
                                return;
                            }
                            scaleIndex -= 0.02;
                        };
                        this.action({moduleName:"UnityFrontView", goods:{scaleIndex}});
                    }
                })
            },
            ondblclick(item,key){
                let component = _.cloneDeep(this.airforce.UnityFrontView.component);
                let componentFindObj = component.find(e=>e.operate);
                if(componentFindObj && componentFindObj.id !== item.id){
                    component = component.map(e=>{
                        return {...e,operate:false};
                    });
                }
                component[key].operate = !component[key].operate;
                this.action({moduleName:"UnityFrontView", goods:{component:null}});
                this.action({moduleName:"UnityFrontView", goods:{component}});
            },
            RangeChange(val){
                this.action({moduleName:"UnityFrontView", goods:{scaleIndex:val/100}});
            }
        },
        mounted() {
            this.windowAddMouseWheel();
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/vars";
    .UnityFrontView {
        .Range{
            position: absolute !important;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 50px;
            background-color: rgba(41,41,41,0.5);
            text-align: right;
            .x-range{
                width: 120px;
                float: right;
                margin-top: 27px;
                margin-right: 45px !important;
                &/deep/ .range-bar{
                    .range-handle{
                        height: 20px;
                        width: 20px;
                        top: -11.5px !important;
                    }
                    .range-min{
                        color: @textColor;
                    }
                    .range-max{
                        .range-min;
                    }
                }
            }
            .z_XButton{
                float: left;
                width: auto;
                margin-left: 15px;
                margin-top: 12px;
            }
        }
        &/deep/ .UnityFrontLayoutTitle{
            .UnityFrontLayoutTitleBox{
                z-index: 2;
            }
        }
        .UnityFrontViewContent{
            position: absolute;
            left: 0;
            top:0;
            top: ~"calc(32px)";
            width: 100%;
            height: 100%;
            height: ~"calc(100% - 32px)";
            background-color: @themeColor;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            .line(@deg:0){
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                @color:rgba(255,255,255,0.1);
                @size:12px;
                background-size: @size @size;
                background-repeat: repeat;
                background-position: center;
                background-image: linear-gradient(
                        unit(@deg,deg),
                        transparent 0,
                        transparent 10px,
                        @color 10px,
                        @color 11px,
                        transparent 11px
                );
            }
            &:before{
                content: "";
                .line(90deg);
            }
            &:after{
                content: "";
                .line(0deg);
            }
            &/deep/ .ProjectGridItem{
                @boderColor:#f00;
                position: absolute;
                left: 0;
                top: 0;
                border:1px dashed @boderColor;
                text-align: center;
                .iconfont{
                    color: #ffffff;
                    font-size: 18px;
                }
                &:before{
                    content: "";
                    border: none;
                    background-color: transparent;
                }
                &:after{
                    content: "";
                    border: none;
                    background-color: transparent;
                }
                .ProjectGridItemBox{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                }
                &:active{
                    background-color: transparent;
                }
                span{
                    &.operate{
                        display: none;
                        position: absolute;
                        @s:10px;
                        width: @s;
                        height: @s;
                        border-radius: 100%;
                        background-color: fadeout(@boderColor,50%);
                        &.top_left{
                            left: -@s/2;
                            top: -@s/2;
                            cursor: nw-resize;
                        }
                        &.top_right{
                            right: -@s/2;
                            top: -@s/2;
                            cursor: sw-resize;
                        }
                        &.bottom_left{
                            left: -@s/2;
                            bottom: -@s/2;
                            cursor: sw-resize;
                        }
                        &.bottom_right{
                            right: -@s/2;
                            bottom: -@s/2;
                            cursor: nw-resize;
                        }
                        &.center_left{
                            top: 50%;
                            left: -@s/2;
                            transform: translateY(-50%);
                            cursor: e-resize;
                        }
                        &.center_top{
                            left: 50%;
                            top: -@s/2;
                            transform: translateX(-50%);
                            cursor: n-resize;
                        }
                        &.center_right{
                            top: 50%;
                            right: -@s/2;
                            transform: translateY(-50%);
                            cursor: e-resize;
                        }
                        &.center_bottom{
                            left: 50%;
                            bottom: -@s/2;
                            transform: translateX(-50%);
                            cursor: n-resize;
                        }
                    }
                }
                &.select{
                    border:1px solid @boderColor;
                    span{
                        &.operate{
                            display: block;
                        }
                    }
                }
            }
        }
    }
</style>
