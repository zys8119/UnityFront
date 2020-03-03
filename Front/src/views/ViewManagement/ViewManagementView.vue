<template>
    <div class="ViewManagementScene">
        <div class="ViewManagementSceneTop">
            <x-button class="add z_XButton_type" @click.native="add"><span class="iconfont">&#xe64f;</span>添加视图</x-button>
        </div>
        <div class="ViewManagementSceneBottom">
            <div class="SceneItem" v-for="(item,key) in list" :key="key">
                <div class="preview"
                     @click="$utils.go('/preview/'+item.id)"
                    :style="{
                    backgroundImage:(item.config && item.config.image)?`url(${item.config.image})`:null
                }">
                    <div class="operation"> <span class="iconfont">&#xe660;</span></div>
                    <unity-front-preview class="preview" :id="item.id" auto></unity-front-preview>
                </div>
                <div class="previewMsg text-overflow">
                    {{item.name}}
                </div>
                <div class="btns">
                    <XButton class="z_XButton_type iconfont" title="删除" @click.native="deleteItem(item)">&#xe613;</XButton>
                    <XButton class="z_XButton_type iconfont" title="复制" @click.native="copy(item)">&#xe605;</XButton>
                    <XButton class="z_XButton_type iconfont" title="编辑" @click.native="$utils.go('/preview/'+item.id+'?type=editor')">&#xe601;</XButton>
                    <XButton class="z_XButton_type iconfont" title="设置" @click.native="setView(item)">&#xe617;</XButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UnityFrontPreview from "../UnityFront/UnityFrontPreview"
    import { XButton } from "vux"
    export default {
        name: "ViewManagementScene",
        components:{ XButton, UnityFrontPreview },
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
                this.api().view_viewList().then(res=>{
                    this.list = res.data;
                });
            },
            setView(item){
                this.$ZAlert.show({
                    title:"修改视图",
                    components:"Alert/CreateNewProjectsView",
                    width:"500px",
                    props:{
                        vm:()=>this,
                        scene:()=>JSON.parse(JSON.stringify(item)),
                    },
                    _event:{
                        save:this.init,
                    }
                });
            },
            add(){
                this.$ZAlert.show({
                    title:"创建视图",
                    components:"Alert/CreateNewProjectsView",
                    width:"500px",
                    props:{
                        vm:()=>this,
                    },
                    _event:{
                        save:this.init,
                    }
                });
            },
            deleteItem(item){
                this.$vux.confirm.show({
                    title:"温馨提示",
                    content:"确定删除此视图吗？",
                    onConfirm:()=>{
                        this.api().view_viewDelete(item).then(()=>{
                            this.init();
                        });
                    }
                });
            },
            copy(item){
                this.api().view_viewCreate({
                    project_name:item.name,
                    project_id:item.project_id,
                    config:item.config,
                }).then(res=>{
                    if(res.code === 200){
                        this.init();
                    }
                })
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
            width: 280px;
            box-shadow: 0 0 0 2px #d8d8d8;
            float: left;
            margin: 0 15px;
            margin-bottom: 15px;
            border:1px solid transparent;
            background-color: #ffffff;
            .preview{
                width: 100%;
                height: 120px;
                position: relative;
                background-color: #e5e5e5;
                background-repeat: no-repeat;
                background-size: cover;
                border-bottom: 1px solid #e5e5e5;
                overflow: hidden;
                *{
                    cursor: pointer;
                }
                .preview{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }
                .operation{
                    opacity: 0;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.3);
                    z-index: 2;
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
                height: 30px;
                color: @themeLogoColor;
                line-height: 30px;
            }
            .btns{
                padding: 0 15px;
                margin-bottom: 15px;
                text-align: right;
                overflow: hidden;
                .z_XButton_type{
                    cursor: pointer;
                    width: auto;
                    margin: 0;
                    float: left;
                    line-height: 40px;
                    min-width: 50px;
                    text-align: center;
                    font-size: 16px !important;
                    background-color: @themeLogoColor*0.9 !important;
                    color: #ffffff !important;
                    &+.z_XButton_type{
                        margin-left: 15px;
                    }
                }
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