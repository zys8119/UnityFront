<template>
    <div class="ComponentView">
        <unity-front-layout-title title="图层"></unity-front-layout-title>
        <uf-box>
            <draggable v-model="list"
                    @update="treeClick"
                    :animation="500"
                    :componentList="componentList"
            >
                <component-tree v-for="(item,key) in list" :item="item" :key="key" init :styleHover="false" class="tree">
                    <div slot-scope="{data}" class="treeItem text-overflow" :class="{operate:data.operate}" @click="treeClick(key)">
                        {{data.info.name}}
                        <span class="iconfont" @click.stop="deleteItem(item)" title="删除">&#xe6b5;</span>
                        <span class="iconfont copy" @click.stop="copyItem(item)" title="复制">&#xe605;</span>
                    </div>
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
            },
            deleteItem(item){
                let component = _.cloneDeep(this.airforce.UnityFrontView.component);
                this.action({moduleName:"UnityFrontView", goods:{component:null}});
                this.action({moduleName:"UnityFrontView", goods:{component:component.filter(e=>e.id !== item.id),}});
            },
            copyItem(item){
                let component = _.cloneDeep(this.airforce.UnityFrontView.component);
                component = component.map(e=>({...e,operate:false}));
                let targetData = _.cloneDeep(item);
                targetData.id = this.$utils.getId();
                targetData.left += 5;
                targetData.top += 5;
                component.push(targetData);
                this.action({moduleName:"UnityFrontView", goods:{component:null}});
                this.action({moduleName:"UnityFrontView", goods:{component:component}});
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/vars";
    .ComponentView {
        position: relative;
        height: 30%;
        &/deep/ .tree{
            .iconfont{
                display: none;
            }
            .treeItem{
                padding: 0 15px;
                &.operate{
                    color: #0078ff;
                }
                .iconfont{
                    font-size: 12px !important;
                    float: right !important;
                    text-align: center;
                    display: block;
                    &:hover{
                        color: @themeLogoColor !important;
                        cursor: pointer !important;
                    }
                    &.copy{
                        font-size: 16px !important;
                    }
                }
                &:hover{
                    background-color: @themeColor;
                }
            }
        }
    }
</style>
