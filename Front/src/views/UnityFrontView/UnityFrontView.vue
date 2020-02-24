<template>
    <div class="UnityFrontView">
        <unity-front-layout-title title="场景视图"></unity-front-layout-title>
        <div class="UnityFrontViewContent" ref="UnityFrontViewContent" id="UnityFrontViewContent"
             v-dragdrop.native.stop dragdrop=".UnityFrontViewContent"
             @drop="drop"
             @dragover="allowDrop"
             :style="{
                 width:airforce.UnityFrontView.width,
                 height:airforce.UnityFrontView.height,
             }"
        >
            <OnContextMenu ref="OnContextMenu"></OnContextMenu>
        </div>
    </div>
</template>

<script>
    import UnityFrontLayoutTitle from "@/components/layout/UnityFrontLayoutTitle"
    import { OnContextMenu } from "@/components/index"
    import Directive from "@/directive/index"
    export default {
        name: "UnityFrontView",
        components:{ UnityFrontLayoutTitle, OnContextMenu },
        data(){
            return {
                bool:true,
            }
        },
        methods:{
            drop(ev)
            {
                try {
                    let El_id = ev.dataTransfer.getData("target");
                    let data = JSON.parse(ev.dataTransfer.getData("data"));
                    let target = document.getElementById(El_id);
                    let targetClone = target.cloneNode(true);
                    let n = 300;
                    let id = Date.now().toString()+parseInt(Math.random()*100000);
                    targetClone.removeAttribute("draggable");
                    targetClone.setAttribute("id",id);
                    targetClone.setAttribute("dragdrop","draggable_data");
                    targetClone.setAttribute("draggable_data",JSON.stringify({
                        id
                    }));
                    let styles = {
                        left:parseInt((ev.layerX - n/2)),
                        top:parseInt((ev.layerY - n/2)),
                        width:n,
                        height:n,
                        info:data
                    };
                    targetClone.style.left = styles.left + "px";
                    targetClone.style.top = styles.top + "px";
                    targetClone.style.width = styles.width + "px";
                    targetClone.style.height = styles.height + "px";
                    targetClone.ondblclick=()=>{
                        this.ondblclick(targetClone,id);
                    };
                    this.setOperate(targetClone,id);
                    Directive.dragdrop.inserted(targetClone);
                    let component = _.cloneDeep(this.airforce.UnityFrontView.component);
                    targetClone.style.zIndex = component.length + 10;
                    component.push({
                        id,
                        el:targetClone,
                        operate:false,
                        ...styles
                    });
                    this.action({moduleName:"UnityFrontView", goods:{component:null}});
                    this.action({moduleName:"UnityFrontView", goods:{component}});
                    this.$refs.UnityFrontViewContent.appendChild(targetClone);
                    ev.preventDefault();
                }catch (e) {}
            },
            allowDrop(ev)
            {
                ev.preventDefault();
            },
            windowAddMouseWheel(){
                this.$utils.windowAddMouseWheel((type,e)=>{
                    if(e.path.some(e=>e == this.$refs.UnityFrontViewContent)){
                        let index = new Number(this.$refs.UnityFrontViewContent.style.transform.replace(/[^0-9.]/img,""));
                        if(index == 0){
                            index = 1;
                        };
                        if(type == "top"){
                            //最大
                            if(index >= 4){
                                return;
                            }
                            index += 0.02;
                        }else if(type == "down"){
                            //最小
                            if(index <= 0.1){
                                return;
                            }
                            index -= 0.02;
                        };
                        this.$refs.UnityFrontViewContent.style.transform = `scale(${index})`;
                    }
                })
            },
            ondblclick(el,id){
                let name = "select";
                let component = _.cloneDeep(this.airforce.UnityFrontView.component);
                let componentFindObj = component.find(e=>e.operate);
                if(componentFindObj && componentFindObj.id !== id){
                    component = component.map(e=>{
                        let ElObj = document.getElementById(e.id);
                        ElObj.className = ElObj.className.replace(new RegExp(name,"img"),"");
                        return {...e,operate:false};
                    });
                }
                let index = component.findIndex(e=>e.id === id);
                this.action({moduleName:"UnityFrontView", goods:{component:null}});
                if(el.className.indexOf(name) > -1){
                    component[index].operate = false;
                    el.className = el.className.replace(new RegExp(name,"img"),"");
                }else {
                    component[index].operate = true;
                    el.className += ` ${name}`;
                }
                this.action({moduleName:"UnityFrontView", goods:{component}});
            },
            setOperate(el,id){
                [
                    "top_left","top_right","bottom_left","bottom_right",
                    "center_left","center_top","center_right","center_bottom",
                ].forEach(className=>{
                    let span = document.createElement("span");
                    span.className = className+" operate";
                    span.setAttribute("dragdrop","draggable_data_operate");
                    span.setAttribute("draggable_data",JSON.stringify({
                        type:className,
                        id,
                    }));
                    Directive.dragdrop.inserted(span,()=>{
                        let dragObj = document.getElementById(id);
                        span.setAttribute("draggable_data",JSON.stringify({
                            type:className,
                            id,
                            width:parseInt(dragObj.style.width),
                            height:parseInt(dragObj.style.height),
                            left:parseInt(dragObj.style.left),
                            top:parseInt(dragObj.style.top),
                        }));
                    });
                    el.appendChild(span);
                });
            }
        },
        mounted() {
            // this.windowAddMouseWheel();
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/vars";
    .UnityFrontView {
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
            background-color: #0078ff;
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
