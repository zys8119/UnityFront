<template>
    <div class="BoundRole">
        <TransferBoxNew
            :options="options"
            v-model="roles"
        ></TransferBoxNew>
        <z-alert-footer>
            <el-button type="primary" @click="save">保存</el-button>
        </z-alert-footer>
    </div>
</template>

<script>
export default {
    name: "BoundRole",
    props:{
        row:{type:Object,default:Object},
    },
    data(){
        return {
            options:[],
            roles:[],
        }
    },
    mounted() {
        let type = this.row.type+1;
        this.apis.AuthorityManagement.RolesType.list({
            type
        }).then(res=>{
            this.options = [];
            Promise.all(res.map(e=>this.apis.AuthorityManagement.Roles.list({
                type:e.id,
            }))).then(res=>{
                res.forEach(d=>{
                    this.options = this.options.concat(d);
                })
            });
        })
        this.apis.AuthorityManagement.UserRoles.get({user_id:this.row.id}).then(res=>{
            this.roles = res.user_roles_id
        });
    },
    methods:{
        // 保存
        save(){
            this.apis.AuthorityManagement.UserRoles.update({
                user_id:this.row.id,
                user_roles_id:this.roles,
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
.BoundRole{
}
</style>