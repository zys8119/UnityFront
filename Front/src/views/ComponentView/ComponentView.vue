<template>
    <div class="ComponentView">
        <unity-front-layout-title title="图层"></unity-front-layout-title>
        <uf-box>
            <draggable v-model="list"
                    @update="treeClick"
                    :animation="500"
                    :componentList="componentList"
            >
                <component-tree v-for="(item,key) in list" :item="item" :key="key" init :styleHover="false">
                    <div slot-scope="{data}" class="treeItem" :class="{operate:data.operate}" @click="treeClick(key)">{{data.info.name}}</div>
                </component-tree>
            </draggable>
        </uf-box>

    </div>
</template>

<script>
    import UnityFrontLayoutTitle from "@/components/layout/UnityFrontLayoutTitle"
    import { UfBox, ComponentTree } from "@/components"
    import draggable from 'vuedraggable'
    export default {
        name: "ComponentView",
        components:{ UnityFrontLayoutTitle, UfBox, ComponentTree, draggable },
        provide(){
            return {
                treeData:this.list,
                list:[],
            }
        },
        computed:{
            componentList(){
                try {
                    this.list = _.cloneDeep(this.airforce.UnityFrontView.component);
                }catch (e) {
                    this.list = [];
                }
            }
        },
        methods:{
            treeClick(key){
                let component = _.cloneDeep(this.list);
                if(typeof key === "number"){
                    try {
                        component = component.map(e=>{
                            return {...e,operate:false};
                        });
                        let Obj = component[key];
                        Obj.operate = true;
                    }catch (e) {}
                }
                this.action({moduleName:"UnityFrontView", goods:{component:null}});
                this.action({moduleName:"UnityFrontView", goods:{component}});
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/vars";
    .ComponentView {
        position: relative;
        height: 30%;
        .treeItem{
            &.operate{
                color: #0078ff;
            }
            &:hover{
                background-color: @themeColor;
            }
        }
    }
</style>
