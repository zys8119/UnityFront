<template>
    <div class="AddMenu">
        <el-form label-width="120px">
            <el-form-item label="菜单名称" required>
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="菜单url地址" required>
                <el-input v-model="formData.url"></el-input>
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
        type:{type:String,default:null},
    },
    data(){
        return {
            formData:{},
        }
    },
    methods:{
        // 保存
        save(){
            if(this.$utils.is_S(this.formData.name)){return this.$message.error("请输入菜单名称")}
            if(this.$utils.is_S(this.formData.url)){return this.$message.error("请输入菜单url地址")}
            this.apis.AuthorityManagement.Menu.add({
                ...this.formData,
                type:this.type,
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