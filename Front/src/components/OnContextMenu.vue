<template>
    <div class="OnContextMenu" v-if="show" :style="style">
        <div class="menu" v-for="(item,key) in menus" @click="menuClick(item)">{{item.name}}</div>
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
                    {name:"删除全部",type:"deleteAll"},
                ],
                menus:[],
                target:null,
                targetData:{},
            }
        },
        methods:{
            oncontextmenu(){
                window.oncontextmenu=e=>{
                    e.preventDefault();  //去掉默认的contextmenu事件，否则会和右键事件同时出现。
                    try {
                        if(e.path.some(e=>e == this.$parent.$el)){
                            if(e.target == document.getElementById("UnityFrontViewContent")){
                                this.menus = [
                                    ...this.list,
                                ]
                            }else {
                                this.menus = [
                                    {name:"复制",type:"copy"},
                                    {name:"删除",type:"delete"},
                                    ...this.list,
                                ]
                            }
                            let offset = e.path.slice(0,e.path.findIndex(e=>e == this.$parent.$el)-1).map(e=>{
                                return [e.offsetLeft,e.offsetTop]
                            });
                            let offsetLeft = 0;
                            let offsetTop = 0;
                            try {
                                offsetLeft = offset.map(e=>e[0]).reduce(function(prev, curr){return prev + curr;});
                                offsetTop = offset.map(e=>e[1]).reduce(function(prev, curr){return prev + curr;});
                            }catch (e) {
                            }
                            this.style = {
                                left:e.offsetX+offsetLeft+"px",
                                top:e.offsetY+offsetTop+"px",
                            };
                            this.show = true;
                            this.target = e.path.find(el=>el.getAttribute("item"));
                            this.targetData = {};
                            try {
                                this.targetData = JSON.parse(this.target.getAttribute("item"))
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
                                let component = _.cloneDeep(this.airforce.UnityFrontView.component);
                                this.action({moduleName:"UnityFrontView", goods:{component:null}});
                                this.action({moduleName:"UnityFrontView", goods:{component:component.filter(e=>e.id !== this.targetData.id),}});
                            }
                            break;
                        case "deleteAll":
                            if(this.targetData.id){
                                this.action({moduleName:"UnityFrontView", goods:{component:null}});
                                this.action({moduleName:"UnityFrontView", goods:{component:[]}});
                            }
                            break;
                        case "copy":
                            let component = _.cloneDeep(this.airforce.UnityFrontView.component);
                            component = component.map(e=>({...e,operate:false}));
                            let targetData = _.cloneDeep(this.targetData);
                            targetData.id = this.$utils.getId();
                            targetData.left += 5;
                            targetData.top += 5;
                            component.push(targetData);
                            this.action({moduleName:"UnityFrontView", goods:{component:null}});
                            this.action({moduleName:"UnityFrontView", goods:{component:component}});
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
    position: absolute; /*自定义菜单相对与body元素进行定位*/
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