<template>
    <div class="AddApp">
        <el-form label-width="120px">
            <el-form-item label="应用名称" required>
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="应用类型" required>
                <el-select v-model="formData.type">
                    <el-option :value="item.id" :label="item.name" v-for="(item,key) in appTypeList" :key="key"></el-option>
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
    name: "AddApp",
    props:{
        row:{type:Object, default:null}
    },
    data(){
        return {
            formData:{},
            appTypeList:[]
        }
    },
    mounted() {
        this.apis.LogNakadai.ApplicationType.list({no_page:true}).then(res=>{
            this.appTypeList = res;
        })
        if(this.row){
            this.formData = {...this.row}
        }
    },
    methods:{
        save(){
            if(this.$utils.is_S(this.formData.name)){return this.$message.error("请输入应用名称")}
            if(this.$utils.is_S(this.formData.name)){return this.$message.error("请选择应用类型")}
            if(this.row){
                this.apis.LogNakadai.Application.update(this.formData).then(()=>{
                    this.$message({type:"success", message:"保存成功"})
                    this.$emit("save")
                    this.$ZAlert.hide()
                })
                return
            }
            this.apis.LogNakadai.Application.add(this.formData).then(()=>{
                this.$message({type:"success", message:"保存成功"})
                this.$emit("save")
                this.$ZAlert.hide()
            })
        }
    }
}
</script>

<style scoped lang="less">
.AddApp {
}
</style>
