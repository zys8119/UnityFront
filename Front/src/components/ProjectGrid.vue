<template>
    <div class="ProjectGrid">
        <grid class="grid" :cols="3">
            <grid-item class="grid-item ProjectGridItem"
                       v-for="(item,key) in this.airforce.ProjectGrid"
                       :title="item.msg"
                       :id="`draggable_id_${key}`"
                       :key="key"
                       draggable="true"
                       @dragstart.native="drag($event,item)">
                <div class="ProjectGridItemBox">
                    <div class="iconfont img" v-html="item.icon"></div>
                    <p class="msg">{{item.name}}</p>
                </div>
            </grid-item>
        </grid>
    </div>
</template>

<script>
    import { Grid, GridItem } from "vux"
    export default {
        name: "ProjectGrid",
        components:{ Grid, GridItem },
        methods:{
            drag(ev, item)
            {
                ev.dataTransfer.setData("target",ev.target.id);
                ev.dataTransfer.setData("data",JSON.stringify(item));
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/less/vars";
    .ProjectGrid {
        .grid{
            &:before{
                border: none;
            }
            &:after{
                border:none;
            }
            .grid-item{
                text-align: center;
                box-shadow: 0 0 5px rgba(0,0,0,0.5);
                position: relative;
                &:hover{
                    background-color:@themeColor;
                }
                &:before{
                    border: none;
                }
                &:after{
                    border:none;
                }
                .iconfont{
                    font-size: 50px;
                    color: @textColor;
                }
            }
        }
    }
</style>
