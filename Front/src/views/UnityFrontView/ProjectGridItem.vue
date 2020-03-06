<template>
    <div :class="`ProjectGridItem type_${data.info.type}`">
        <!--文字-->
        <div class="ProjectGridItemBox_type_text"  v-if="data.info.type === 'text'" :style="{
            textAlign:data.info.style.textAlign,
            transform:data.info.style.transform,
        }">
            <span v-html="data.info.name" :style="{...data.info.style,transform:'none'}"></span>
        </div>
        <!--图片-->
        <img class="ProjectGridItemBox_type_images" :src="data.info.url" v-else-if="data.info.type === 'images'" :style="data.info.style">
        <!--SVG-->
        <div class="ProjectGridItemBox_type_svg" v-else-if="data.info.type === 'svg'" ref="svg">
            <svg t="1582622641578" class="icon" style="vertical-align: middle;fill: currentColor;overflow: hidden;"
                 :viewBox="data.info.viewBox"
                 version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8467"  :style="data.info.style" v-html="data.info.path"></svg>
        </div>
        <!--矩形-->
        <div class="ProjectGridItemBox_type_rect"  v-else-if="data.info.type === 'rect'" :style="data.info.style"></div>
        <component class="ProjectGridItemBox_type_material"
                   v-else-if="data.info.type === 'material'"
                   :is="`material-${data.info.mapName}`"
                   :config="data"
                   :style="{
                       transform:data.info.style.transform
                   }"
        ></component>
        <!--布局-->
        <div class="ProjectGridItemBox" v-else :style="data.info.style">
            <div class="iconfont" v-html="data.info.icon"></div>
            <p class="msg" v-html="data.info.name"></p>
        </div>

        <span v-for="(sapnItem,key2) in OperateList" :key="`${key2}-o`" :class="`operate ${sapnItem}`"
              v-dragdrop dragdrop="draggable_data_operate"
              :item="JSON.stringify({...data, type:sapnItem})"></span>
    </div>
</template>

<script>
    import { XInput } from "vux"
    export default {
        name: "ProjectGridItem",
        components:{ XInput },
        props:{
            data:{
                type:Object,
                default:Object
            }
        },
        watch:{
          "data.info.style.fill"(){
              this.getSvgPath().forEach(e=>{
                  try {
                      e.style.fill = this.data.info.style.fill;
                  }catch (e) {}
              });
          },
          "data.info.style.stroke"(){
              this.getSvgPath().forEach(e=>{
                  try {
                      e.style.stroke = this.data.info.style.stroke;
                  }catch (e) {}
              });
          },
          "data.info.style.strokeWidth"(){
              this.getSvgPath().forEach(e=>{
                  try {
                      e.style.stroke = this.data.info.style.strokeWidth;
                  }catch (e) {}
              });
          }
        },
        data(){
            return {
                OperateList:[
                    "top_left","top_right","bottom_left","bottom_right",
                    "center_left","center_top","center_right","center_bottom",
                ],
            }
        },
        methods:{
            getSvgPath(){
                try {
                    return this.$refs.svg.querySelectorAll(".ProjectGridItemBox_type_svg svg path");
                }catch (e) {
                    return  [];
                }
            }
        }
    }
</script>

<style scoped lang="less">
.ProjectGridItem{
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
    .ProjectGridItemBox{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    &.type_text{
        text-align: left;
        .ProjectGridItemBox_type_text{

        }
    }
    .fn(){
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    &.type_images{
        .ProjectGridItemBox_type_images{
            .fn();
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
            border:none;
            outline: medium;
        }
    }
    &.type_svg{
        .ProjectGridItemBox_type_svg{
            .fn();
            svg{
                .fn();
            }
        }
    }
    &.type_rect{
        .ProjectGridItemBox_type_rect{
            .fn();
        }
    }
    &.type_material{
        .ProjectGridItemBox_type_material{
            .fn();
        }
    }

}
</style>