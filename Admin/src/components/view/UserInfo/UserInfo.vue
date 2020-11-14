<template>
    <div class="UserInfo">
        <layout-box>
            <layout-filter-content>
                <div class="UserInfoFrom">
                    <div class="Avatar">
                        <Upload :show-file-list="true" @on-success="onSuccess" :limit="1" ref="upload">
                            <el-image fit="fill" :src="formData.avatar" class="el-image">
                                <img slot="error" class="errImg" width="100%" height="100%" src="/images/login/logo.png">
                            </el-image>
                        </Upload>
                        <p class="msg">点击上传头像</p>
                    </div>
                    <div class="conetnt">
                        <el-form label-width="120px">
                            <el-form-item label="用户名称：" required>{{airforce.login.username}}</el-form-item>
                            <el-form-item label="邮箱：" required>
                                <el-input type="email：" v-model="formData.email"></el-input>
                            </el-form-item>
                            <el-form-item label="修改密码：">
                               <el-switch v-model="formData.isPassword"></el-switch>
                            </el-form-item>
                            <template v-if="formData.isPassword">
                                <el-form-item label="原密码：" required>
                                    <el-input type="password" v-model="formData.passwordOrigin" show-password></el-input>
                                </el-form-item>
                                <el-form-item label="新密码：" required>
                                    <el-input type="password" v-model="formData.password" show-password></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码：" required>
                                    <el-input type="password" v-model="formData.passwordNew" show-password></el-input>
                                </el-form-item>
                            </template>
                        </el-form>
                    </div>
                </div>
                <z-alert-footer page>
                    <el-button type="primary" @click="save">保存</el-button>
                </z-alert-footer>
            </layout-filter-content>
        </layout-box>
    </div>
</template>

<script>
export default {
    name: "UserInfo",
    data(){
        return {
            formData:{},
        }
    },
    mounted() {
        this.formData = {
            email:this.airforce.login.email,
            avatar:this.airforce.login.avatar,
            passwordOrigin:null,
            password:null,
            passwordNew:null,
            isPassword:false,
        }
    },
    methods:{
        // 保存
        save(){
            if(this.$utils.is_S(this.formData.email)){return this.$message.error("请输入邮箱")}
            if(this.formData.isPassword){
                if(this.$utils.is_S(this.formData.passwordOrigin)){return this.$message.error("请输入原密码")}
                if(this.$utils.is_S(this.formData.password)){return this.$message.error("请输入新密码")}
                if(this.$utils.is_S(this.formData.passwordNew)){return this.$message.error("请再次输入密码")}
                if(this.formData.password !== this.formData.passwordNew){return this.$message.error("两次密码不一致")}
            }
            this.apis.user.auth.updateUserInfo({
                ...this.formData,
                passwordOrigin:this.formData.passwordOrigin ? this.$utils.MD5(this.formData.passwordOrigin) : "",
                password:this.formData.password ? this.$utils.MD5(this.formData.password) : "",
            }).then((res)=>{
                this.$message({type:"success",message:"保存成功"})
                this.action({
                    moduleName:"login",
                    goods:{
                        data:res,
                        ...res,
                    },
                })
            })
        },
        // 头像上传回调
        onSuccess(res){
            // 清除文件
            this.$refs.upload.$refs.upload.clearFiles();
            this.formData.avatar = res.url;
        }
    }
}
</script>

<style scoped lang="less">
.UserInfo{
    .UserInfoFrom{
        display: flex;
        align-items: center;
        width: 80%;
        margin: auto;
        .Avatar{
            width: 120px;
            margin-right:50px;
            overflow: hidden;
            .el-image{
                width: 100%;
            }
            .msg{
                text-align: center;
                font-size: 12px;
                color: #cccccc;
                margin-top: @unit15;
            }
        }
    }
}
</style>