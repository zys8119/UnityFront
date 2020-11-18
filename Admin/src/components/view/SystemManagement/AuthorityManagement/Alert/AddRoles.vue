<template>
    <div class="AddRoles">
        <el-form label-width="120px">
            <el-form-item label="角色名称" required><el-input v-model="formData.name"></el-input></el-form-item>
            <el-form-item label="角色类型" required>
                <el-select v-model="formData.type">
                    <el-option v-for="(item,key) in typeList" :key="key" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="角色描述"><el-input v-model="formData.description"></el-input></el-form-item>
            <el-form-item label="角色是否可用" required><el-switch v-model="formData.is_effective"></el-switch></el-form-item>
        </el-form>
        <z-alert-footer>
            <el-button type="primary" @click="save">保存</el-button>
        </z-alert-footer>
    </div>
</template>

<script>
export default {
    name: "AddRoles",
    props:{
        row:{type:Object,default:null},
    },
    data(){
        return {
            formData:{},
            typeList:[],
        }
    },
    mounted() {
        this.formData = this.row ? {...this.row} : {};
        this.apis.AuthorityManagement.RolesType.list().then(res=>{
            this.typeList = res;
        });
    },
    methods:{
        // 保存
        save(){
            if(this.$utils.is_S(this.formData.name)){return this.$message.error("请输入角色名称")}
            if(this.$utils.is_S(this.formData.type)){return this.$message.error("请选择角色类型")}
            this.apis.AuthorityManagement.Roles.add({
                ...this.formData,
                is_effective:this.formData.is_effective ? 1 : 2
            }).then(()=>{
                this.$message({type:"success",message:"保存成功"});
                this.$emit("save");
                this.$ZAlert.hide();
            })
        }
    }
}
</script>

<style scoped lang="less">
.AddRoles{
}
</style>