<template>
    <div class="UnityFrontView" :class="{preview:airforce.UnityFrontView.preview}">
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
            <project-grid-item v-for="(item,key) in airforce.UnityFrontView.component" :key="key"
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
                 @dblclick.native="ondblclick(item,key)"
                 :item="JSON.stringify({...item,key})"
                 :data="{...item,key}"
            >

            </project-grid-item>
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
            <x-button class="z_XButton" @click.native="airforce.input({preview:false},'UnityFrontView')" v-if="airforce.UnityFrontView.preview"><span class="iconfont" style="margin-right: 10px">&#xe660;</span>取消预览</x-button>
            <x-button class="z_XButton" @click.native="airforce.input({preview:true},'UnityFrontView')" v-else><span class="iconfont" style="margin-right: 10px">&#xe660;</span>预览</x-button>
            <x-button class="z_XButton" @click.native="airforce.input({left:0,top:0,scaleIndex:1},'UnityFrontView')">重置视图</x-button>
        </div>
    </div>
</template>

<script>
    import UnityFrontLayoutTitle from "@/components/layout/UnityFrontLayoutTitle"
    import { OnContextMenu } from "@/components/index"
    import { Range, XButton } from "vux"
    import ProjectGridItem from "./ProjectGridItem"
    export default {
        name: "UnityFrontView",
        components:{ UnityFrontLayoutTitle, OnContextMenu, Range, XButton, ProjectGridItem },
        methods:{
            getData(data,ev){
                let publicStyle = {
                    transform:"matrix(1, 0, 0, 1, 0, 0)",
                    borderRadius:"0 0 0 0",
                };
                switch (data.info.type) {
                    case "layout":
                        data = {
                            ...data,
                            info:{
                                ...data.info,
                                style:{
                                    ...publicStyle
                                }
                            },
                        };
                        break;
                    case "text":
                        data = {
                            ...data,
                            info:{
                                ...data.info,
                                style:{
                                    textAlign: "left",
                                    color: "#ffffff",
                                    wordWrap: "break-word",
                                    fontSize: "18px",
                                    ...publicStyle
                                }
                            },
                        };
                        break;
                    case "images":
                        data = {
                            ...data,
                            info:{
                                ...data.info,
                                url:require("@/assets/logo.png"),
                                style:{
                                    opacity:1,
                                    ...publicStyle
                                },
                            },
                        };
                        break;
                    case "svg":
                        data = {
                            ...data,
                            info:{
                                ...data.info,
                                viewBox:"0 0 1024 1024",
                                style:{
                                    fill:"#fff",
                                    stroke:"#fff",
                                    strokeWidth:0,
                                    ...publicStyle
                                }
                            },
                        };
                        break;
                    case "rect":
                        data = {
                            ...data,
                            info:{
                                ...data.info,
                                style:{
                                    backgroundColor: "#fff",
                                    borderWidth:0,
                                    border: "0px solid",
                                    borderColor:"#fff",
                                    backgroundImage:"linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0))",
                                    ...publicStyle
                                }
                            },
                        };
                        break;
                };
                return data;
            },
            drop(ev) {
                try {
                    let data = JSON.parse(ev.dataTransfer.getData("data"));
                    let n = 300;
                    let id = Date.now().toString()+parseInt(Math.random()*100000);
                    let component = _.cloneDeep(this.airforce.UnityFrontView.component);
                    component.push(this.getData({
                        id,
                        operate:false,
                        left:parseInt((ev.layerX - n/2)),
                        top:parseInt((ev.layerY - n/2)),
                        width:n,
                        height:n,
                        info:data
                    },ev));
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
        }
        &.preview{
            &/deep/ .UnityFrontViewContent{
                &:before{
                    background-image: none;
                }
                &:after{
                    background-image: none;
                }
                .ProjectGridItem{
                    border:none;
                    &.select{
                        span.operate{
                            display: none;
                        }
                    }
                }
            }
        }
    }
</style>
