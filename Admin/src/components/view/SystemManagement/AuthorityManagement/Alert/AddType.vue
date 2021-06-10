<template>
    <div class="AddType">
        <el-form label-width="120px">
            <el-form-item label="菜单类型名称" required>
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="分类" required>
                <el-select v-model="formData.type">
                    <el-option v-for="(item,key) in typeOptions" :key="key" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <z-alert-footer>
            <el-button type="primary" @click="save">保存</el-button>
        </z-alert-footer>
    </div>
</template>

<script>
export default {
    name: "AddType",
    props:{
        typeOptions:{type:Array,default:Array},
        row:{type:Object,default:null},
    },
    data(){
        return {
            formData:{},
        }
    },
    mounted() {
        this.formData = this.row? {...this.row} : {};
    },
    methods:{
        // 保存
        save(){
            if(this.$utils.is_S(this.formData.name)){return  this.$message.error("请输入菜单类型名称")}
            if(this.$utils.is_S(this.formData.type)){return  this.$message.error("请选择分类")}
            if(this.row){
                this.apis.AuthorityManagement.MenuType.update(this.formData).then(()=>{
                    this.$message({type:"success",message:"保存成功"})
                    this.$emit("save")
                    this.$ZAlert.hide()
                })
                return ;
            }
            this.apis.AuthorityManagement.MenuType.add(this.formData).then(()=>{
                this.$message({type:"success",message:"保存成功"})
                this.$emit("save")
                this.$ZAlert.hide()
            })
        }
    }
}
</script>

<style scoped lang="less">
.AddType{
}
</style>