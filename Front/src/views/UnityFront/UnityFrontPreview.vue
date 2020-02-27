<template>
    <div class="UnityFrontPreview" :class="{auto:auto}" :style="{
        ...getStyle(layout,null,true),
        backgroundColor:layout.backgroundColor,
        backgroundImage:`url(${layout.backgroundImage})`,
    }">
        <template v-for="(item,key) in layout_component">
            <template v-if="item.info.type === 'layout'">
                <div class="layout" :style="{
                    ...getStyle(item,key),
                    ...item.info.style
                }"></div>
            </template>
            <template v-if="item.info.type === 'text'">
                <div class="text" :style="{
                    ...getStyle(item,key),
                    ...item.info.style
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
        data(){
            return {
                view:{},
                project:{},
                auto:true,
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
            }
        },
        mounted() {
            this.init();
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

                        if(this.auto){
                            // 响应式处理
                            resUltStyle = {
                                ...resUltStyle,
                                width:item.width/this.layout.width*100+'%',
                                height:item.height/this.layout.height*100+'%',
                                left:item.left/this.layout.width*100+'%',
                                top:item.top/this.layout.height*100+'%',
                            }
                        }
                    }
                    return resUltStyle;
                }catch (e) {
                    return {};
                }

            }
        }
    }
</script>

<style scoped lang="less">
.UnityFrontPreview{
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    &.auto{
        position: fixed;
        left: 0 !important;
        top: 0 !important;
        width: 100% !important;
        height: 100% !important;
    }
    .layout,.text,.rect,.images,.svgBox{
        position: absolute;
    }
}
</style>