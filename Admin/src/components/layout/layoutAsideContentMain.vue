<template>
    <div class="layoutAsideContentMain">
        <el-tree class="el-tree"
             ref="tree"
             :data="menus"
             empty-text=""
             @node-click="nodeClick"
             node-key="id"
             :current-node-key="airforce.menusId ? airforce.menusId: null"
             :default-expanded-keys="airforce.menusId ? [airforce.menusId]: []"
             accordion>
            <div slot-scope="{node,data}" class="layoutAsideContentMainItem">
                <span class="data_label ellipsis-1">{{ data.title }}</span>
                <i class="icons" v-if="!node.isLeaf" :class="{
                    'el-icon-arrow-down':node.expanded,
                    'el-icon-arrow-right':!node.expanded,
                }"></i>
            </div>
        </el-tree>
    </div>
</template>

<script>
export default {
    name: "layoutAsideContentMain",
    data(){
        return {
            defaultProps: {
                children: 'children',
            }
        }
    },
    watch:{
        "airforce.menusId"(){
            this.$nextTick(()=>{
                this.change();
            })
        }
    },
    computed:{
        menus(){
            try {
                return this.airforce.menusInfo.children || [];
            }catch (e){
                return [];
            }
        }
    },
    mounted() {
        this.$root.$on("menusIdChange",()=>{
            this.change();
        })
    },
    methods:{
        nodeClick(data, node){
            if(node.isLeaf){
                this.$router.push(data.path);
                this.action({
                    moduleName:"menusId",
                    goods:data.id,
                });
                localStorage.setItem("menusId", data.id);
            }
        },
        change(){
            let menusId = this.airforce.menusId || localStorage.getItem("menusId");
            if(menusId === "null"){
                menusId = null;
            }
            setTimeout(()=>{
                if(menusId){
                    this.$refs.tree.setCurrentKey(menusId);
                    return ;
                }else {
                    if(this.airforce.menusInfo && this.airforce.menusInfo.children && this.airforce.menusInfo.children.length > 0){
                        this.nodeClick(this.airforce.menusInfo.children[0],{isLeaf:true});
                        return ;
                    }
                }
                this.$refs.tree.setCurrentKey(null);
            },300)
        }
    }
}
</script>

<style scoped lang="less">
.layoutAsideContentMain {
    /deep/.el-tree{
        background-color: transparent;
        position: relative;
        margin-top: @unit15;
        &:before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            height: 1px;
            width: 100%;
            background:linear-gradient(to left,@layoutColor2, @themeColor, @layoutColor2);
        }
        .el-tree-node{
            &:focus{
                .el-tree-node__content{
                    background: transparent;
                }
            }
            &:hover{
                .el-tree-node__content{
                    background: transparent;
                }
            }
            .el-tree-node__content{
                position: relative;
                &:before{
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    height: 1px;
                    width: 100%;
                    background:linear-gradient(to left,@layoutColor2, @themeColor, @layoutColor2);
                }
            }
            &.is-expanded{
                background: @layoutColor/1.5;
            }
            &.is-current{
                &>.el-tree-node__content {
                    background: linear-gradient(to left, @layoutColor2, @themeColor, @layoutColor2);
                }
            }
        }
        .el-tree-node__content{
            height: @layoutHeader;
            padding: 0 !important;
            .el-tree-node__expand-icon{
                display: none;
            }
            .layoutAsideContentMainItem{
                display: flex;
                justify-content: center;
                align-items: center;
                height: @layoutHeader;
                width: 100%;
                padding: 0 @unit15;
                user-select: none;
                color: @white;
                .data_label{
                    flex: 1;
                }
                .icons{
                    margin-left: @unit15;
                    &:before{

                        transition: all ease-in-out 300ms;
                    }
                }
                &:hover{
                    background-color: transparent;
                    background: linear-gradient(to left,@layoutColor2, @themeColor, @layoutColor2);
                }
            }
        }
    }
}
</style>