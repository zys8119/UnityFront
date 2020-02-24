<template>
    <div class="OnContextMenu" v-if="show" :style="style">
        <div class="menu" v-for="(item,key) in list" @click="menuClick(item)">{{item.name}}</div>
    </div>
</template>

<script>
    export default {
        name: "oncontextmenu",
        data(){
            return {
                show:false,
                style:{},
                list:[
                    {name:"删除",type:"delete"},
                    {name:"删除全部",type:"deleteAll"},
                ],
                target:null,
                targetData:{},
            }
        },
        methods:{
            oncontextmenu(){
                window.oncontextmenu=e=>{
                    try {
                        e.preventDefault();  //去掉默认的contextmenu事件，否则会和右键事件同时出现。
                        if(e.path.some(e=>e == this.$parent.$el)){
                            this.style = {
                                left:e.clientX+"px",
                                top:e.clientY+"px",
                            };
                            this.show = true;
                            this.target = e.path.find(el=>el.getAttribute("draggable_data"));
                            this.targetData = {};
                            try {
                                this.targetData = JSON.parse(this.target.getAttribute("draggable_data"))
                            }catch (e) {}
                        }
                    } catch (e) {}
                };
                window.onclick = e=>{
                    this.show = false;
                }
            },
            menuClick(item){
                try {
                    if(!this.targetData){return};
                    switch (item.type) {
                        case "delete":
                            if(this.targetData.id){
                                document.getElementById(this.targetData.id).remove();
                                let component = _.cloneDeep(this.airforce.UnityFrontView.component);
                                this.action({moduleName:"UnityFrontView", goods:{component:null}});
                                this.action({moduleName:"UnityFrontView", goods:{component:component.filter(e=>e.id !== this.targetData.id),}});
                            }
                            break;
                        case "deleteAll":
                            if(this.targetData.id){
                                document.querySelectorAll("#UnityFrontViewContent .ProjectGridItem").forEach(el=>el.remove());
                                this.action({moduleName:"UnityFrontView", goods:{component:null}});
                                this.action({moduleName:"UnityFrontView", goods:{component:[]}});
                            }
                            break;
                    }
                }catch (e) {

                }

            }
        },
        mounted() {
            this.oncontextmenu();
        }
    }
</script>

<style scoped lang="less">
.OnContextMenu{
    overflow: hidden; /*隐藏溢出的元素*/
    box-shadow: 0 1px 1px #888,1px 0 1px #ccc;
    position: fixed; /*自定义菜单相对与body元素进行定位*/
    left: 0;
    top: 0;
    z-index: 100000;
    background-color: #ffffff;
    .menu{
        width: 130px;
        height: 25px;
        line-height: 25px;
        padding: 0 10px;
        &+.menu{
            border-top:1px solid #d8d8d8;
        }
        &:hover{
            background-color: #e5e5e5;
            color: #0078ff;
        }
    }
}
</style>