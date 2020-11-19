<template>
    <div class="AddMenu">
        <el-form label-width="140px">
            <el-form-item label="菜单名称：" required>
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="菜单url地址：" required>
                <el-input v-model="formData.url"></el-input>
            </el-form-item>
            <el-form-item label="是否为子菜单：" required>
                <el-switch v-model="formData.is_child_page" active-text="如果为子菜单将不可见"></el-switch>
            </el-form-item>
        </el-form>
        <z-alert-footer>
            <el-button type="primary" @click="save">保存</el-button>
        </z-alert-footer>
    </div>
</template>

<script>
export default {
    name: "AddMenu",
    props:{
        // 菜单类型
        type:{type:String,default:null},
        // 操作类型
        type2:{type:String,default:null},
        parent:{type:String,default:null},
        row:{type:Object,default:null},
    },
    data(){
        return {
            formData:{},
        }
    },
    mounted() {
        this.formData = this.row && this.type2 === "modify"? {
            ...this.row,
            is_child_page:this.row.is_child_page === 2
        } : {};
    },
    methods:{
        // 保存
        save(){
            if(this.$utils.is_S(this.formData.name)){return this.$message.error("请输入菜单名称")}
            if(this.$utils.is_S(this.formData.url)){return this.$message.error("请输入菜单url地址")}
            if(this.row && this.type2 === "modify"){
                this.apis.AuthorityManagement.Menu.update({
                    ...this.formData,
                    is_child_page:this.formData.is_child_page ? 2 :1,
                }).then(()=>{
                    this.$message({type:"success",message:"保存成"})
                    this.$emit("save")
                    this.$ZAlert.hide();
                })
                return ;
            }
            this.apis.AuthorityManagement.Menu.add({
                ...this.formData,
                type:this.type,
                parent:this.parent,
                is_child_page:this.formData.is_child_page ? 2 :1,
            }).then(()=>{
                this.$message({type:"success",message:"保存成"})
                this.$emit("save")
                this.$ZAlert.hide();
            })
        }
    }
}
</script>

<style scoped lang="less">
.AddMenu{
}
</style>