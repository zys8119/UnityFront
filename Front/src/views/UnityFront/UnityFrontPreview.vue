<template>
    <div class="UnityFrontPreview" v-if="watchAuto" :class="{auto:layout.auto || auto}" :style="{
        ...getStyle(layout,null,true),
        backgroundColor:layout.backgroundColor,
        backgroundImage:`url(${layout.backgroundImage})`,
    }">
        <template v-for="(item,key) in layout_component">
            <template v-if="item.info.type === 'layout'">
                <div class="layout" :style="{
                    ...getStyle(item,key),
                    ...item.info.style
                }">
                    <component
                            v-if="config[item.id]"
                           :is="config[item.id]"
                           :config="item"
                           :layout="layout"
                           :getStyle="getStyle(item,key)"
                    ></component>
                    <div v-if="editor" class="layoutEditor">
                        <div class="layoutEditorContent">
                            <div class="layoutEditorContentBtn" @click="bindingComponents(item, view,layout,getStyle(item,key))">
                                <span class="iconfont">&#xe708;</span>
                                <p>绑定组件</p>
                            </div>
                            <div class="layoutEditorContentBtn" @click="unBindingComponents(item, view, layout,getStyle(item,key))">
                                <span class="iconfont">&#xe709;</span>
                                <p>解绑组件</p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="item.info.type === 'text'">
                <div class="text" :style="{
                    ...item.info.style,
                    ...getStyle(item,key),
                }">{{item.info.name}}</div>
            </template>
            <template v-if="item.info.type === 'rect'">
                <div class="rect" :style="{
                    ...getStyle(item,key),
                    ...item.info.style
                }"></div>
            </template>
            <template v-if="item.info.type === 'images'">
                <img class="images"
                     :src="item.info.url"
                     :style="{
                    ...getStyle(item,key),
                    ...item.info.style
                }">
            </template>
            <template v-if="item.info.type === 'svg'">
                <div :style="getStyle(item,key)" class="svgBox">
                    <svg t="1582622641578" class="icon" style="vertical-align: middle;fill: currentColor;overflow: hidden;"
                         :viewBox="item.info.viewBox"
                         version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8467"  :style="item.info.style" v-html="item.info.path"></svg>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
    export default {
        name: "UnityFrontPreview",
        props:{
            auto:{type:Boolean,default:false},
        },
        data(){
            return {
                view:{},
                project:{},
                watchAuto:true,
                dashboard:[],
            }
        },
        computed:{
            layout(){
                try {
                    return this.project.config || {};
                }catch (e) {
                    return  {};
                }
            },
            layout_component(){
                try {
                    return this.layout.component || [];
                }catch (e) {
                    return  [];
                }
            },
            editor(){
                let bool = this.$route.query.type === "editor";
                if(bool){
                    document.title = "视图编辑"
                }
                return bool;
            },
            config(){
                return this.view.config || {};
            }
        },
        mounted() {
            this.init();
            let winOnresize = window.onresize || new Function();
            window.onresize = ()=>{
                winOnresize();
                if(this.layout.auto){
                    this.watchAuto = false;
                    this.$nextTick(()=>{
                        this.watchAuto = true;
                    });
                }
            };
            this.dashboard = window.dashboard;
        },
        methods:{
            init(){
                this.api().view_getView({
                    id:this.$route.params.id
                }).then(res=>{
                    this.view = res.data;
                    this.api().view_get_project({
                        project_id:res.data.project_id,
                    }).then(resp=>{
                        this.project = resp.data;
                    });
                });
            },
            getStyle(item,key,bool){
                try {
                    let resUltStyle = {
                        width:item.width+'px',
                        height:item.height+'px',
                    };
                    if(!bool){
                        resUltStyle = {
                            ...resUltStyle,
                            left:item.left+'px',
                            top:item.top+'px',
                            zIndex:key+10,
                        }

                        if(this.layout.auto || this.auto){
                            // 响应式处理
                            let b = window.innerWidth/this.layout.width;
                            resUltStyle = {
                                ...resUltStyle,
                                width:item.width/this.layout.width*100+'%',
                                height:item.height/this.layout.height*100+'%',
                                left:item.left/this.layout.width*100+'%',
                                top:item.top/this.layout.height*100+'%',
                            };
                            if(item.info.type === 'text' && item.info.style.fontSize){
                                let fontSize = b*parseInt(item.info.style.fontSize)*9;
                                resUltStyle.fontSize = fontSize + "%";
                            }
                        }
                    }
                    return resUltStyle;
                }catch (e) {
                    return {};
                }

            },
            bindingComponents(item, view, layout,getStyle){
                this.$ZAlert.show({
                    title:"绑定组件",
                    props: {
                        id:this.$route.params.id,
                        item:()=>item,
                        view:()=>view,
                        layout:()=>layout,
                        getStyle:()=>getStyle,
                    },
                    components:"Alert/BindingComponents"
                })
            },
            unBindingComponents(){

            }
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/less/vars";
.UnityFrontPreview{
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    &.auto{
        position: absolute;
        left: 0 !important;
        top: 0 !important;
        width: 100% !important;
        height: 100% !important;
    }
    .layout,.text,.rect,.images,.svgBox{
        position: absolute;
    }
    .layout{
        overflow: hidden;
        .layoutEditor{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255,255,255,0.8);
            z-index: 1000000;
            .layoutEditorContent{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                color: #666666;
                .layoutEditorContentBtn{
                    display: inline-block;
                    cursor: pointer;
                    position: relative;
                    text-align: center;
                    span{
                        &.iconfont{
                            font-size: 40px;
                        }
                    }
                    &+.layoutEditorContentBtn{
                        margin-left: 15px;
                    }
                    &:hover{
                        color: @themeLogoColor;
                    }
                    &:active{
                        color: @themeLogoColor*0.9;
                    }
                    &:before{
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                    }
                }

            }
        }
    }
}
</style>