<template>
    <div class="ProjectGrid">
        <grid class="grid" :cols="3">
            <grid-item class="grid-item">
                <div class="iconfont img">&#xe674;</div>
                <p class="msg">images</p>
            </grid-item>
            <grid-item class="grid-item">
                <div class="iconfont css">&#xe614;</div>
                <p class="msg">css</p>
            </grid-item>
            <grid-item class="grid-item">
                <div class="iconfont js">&#xe61a;</div>
                <p class="msg">js</p>
            </grid-item>
            <grid-item class="grid-item " title="士大夫士大夫似的法式风格是否多少个">
                <div class="iconfont preset">&#xe60c;</div>
                <p class="msg text-overflow">preset</p>
            </grid-item>
        </grid>
    </div>
</template>

<script>
    import { Grid, GridItem } from "vux"
    export default {
        name: "ProjectGrid",
        components:{ Grid, GridItem }
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
                    &.img{
                        color: #de0021;
                    }
                    &.css{
                        color: #da920a;
                    }
                    &.js{
                        color: #91b708;
                    }
                    &.preset{
                        color:#02bcd3;
                    }
                }
            }
        }
    }
</style>
