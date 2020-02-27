<template>
    <div class="ViewManagementScene">
        <div class="ViewManagementSceneTop">
            <x-button class="add z_XButton" @click.native="add"><span class="iconfont">&#xe64f;</span>添加场景</x-button>
        </div>
        <div class="ViewManagementSceneBottom">
            <div class="SceneItem" v-for="(item,key) in list" :key="key">
                <div class="preview"
                     @click="$router.push('/view?project_id='+item.project_id)"
                    :style="{
                    backgroundImage:(item.config && item.config.image)?`url(${item.config.image})`:null
                }">
                    <div class="operation"> <span class="iconfont">&#xe601;</span></div>
                </div>
                <div class="previewMsg">
                    {{item.project_name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { XButton } from "vux"
    export default {
        name: "ViewManagementScene",
        components:{ XButton },
        data(){
            return {
                list:[]
            }
        },
        mounted() {
            this.init();
        },
        methods:{
            init(){
                this.api().view_list().then(res=>{
                    this.list = res.data;
                    console.log(this.list)
                });
            },
            add(){
                this.$ZAlert.show({
                    title:"创建新项目",
                    components:"Alert/CreateNewProjects",
                    width:"500px",
                    props:{
                        vm:()=>this,
                        scene:true,
                    },
                    _event:{
                        save:this.init,
                    }
                });
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/less/vars";
.ViewManagementScene{
    .ViewManagementSceneTop{
        text-align: left;
        margin-bottom: 15px;
        &/deep/ .add{
            width: auto;
            margin: 0;
            cursor: pointer;
            .iconfont{
                margin-right: 10px;
            }
        }
    }
    .ViewManagementSceneBottom{
        .SceneItem{
            width: 200px;
            box-shadow: 0 0 0 2px @borderColor;
            float: left;
            margin: 0 15px;
            margin-bottom: 15px;
            border:1px solid transparent;
            .preview{
                width: 100%;
                height: 120px;
                position: relative;
                background-color: #e5e5e5;
                *{
                    cursor: pointer;
                }
                .operation{
                    opacity: 0;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.3);
                    .iconfont{
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        width: 50px;
                        height: 50px;
                        border-radius: 100%;
                        background-color: rgba(255,255,255,0.3);
                        color: #ffffff;
                        font-size: 30px;
                        line-height: 50px;
                        text-align: center;
                    }
                }
                &:hover{
                    .operation{
                        opacity: 1;
                        transition: opacity ease-in 0.3s;
                    }
                }
            }
            .previewMsg{
                padding: 15px;
                color: @textColor;
            }
            &:hover{
                border-color: @themeLogoColor;
                transition:
                        border-top-color,
                        border-left-color,
                        border-right-color,
                        border-bottom-color
                        ease-in 0.3s;
            }
        }
    }
}
</style>