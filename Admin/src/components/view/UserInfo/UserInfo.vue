<template>
    <div class="UserInfo">
        <layout-box>
            <layout-filter-content>
                <div class="UserInfoFrom">
                    <div class="Avatar">
                        <Upload :show-file-list="false" @on-success="onSuccess" :limit="1" ref="upload">
                            <el-image fit="fill" :src="formData.avatar" class="el-image">
                                <img slot="error" class="errImg" width="100%" height="100%" :src="formData.avatar ? formData.avatar : '/images/login/logo.png'">
                            </el-image>
                        </Upload>
                        <p class="msg">点击上传头像</p>
                    </div>
                    <div class="conetnt">
                        <el-form label-width="120px">
                            <el-form-item label="账号名称：" required v-if="$route.query.type !== 'add'">{{formData.username}}</el-form-item>
                            <el-form-item label="用户名称：" required v-if="$route.query.type !== 'add'">
                                <el-input v-model="formData.name"></el-input>
                            </el-form-item>
                            <template v-else>
                                <el-form-item label="账号名称：" required>
                                    <el-input v-model="formData.username"></el-input>
                                </el-form-item>
                                <el-form-item label="用户名称：" required>
                                    <el-input v-model="formData.name"></el-input>
                                </el-form-item>
                            </template>
                            <el-form-item label="邮箱：" required>
                                <el-input type="email：" v-model="formData.email"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码：" required>
                                <el-input v-model="formData.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="修改密码：" v-if="$route.query.type !== 'add'">
                               <el-switch v-model="formData.isPassword"></el-switch>
                            </el-form-item>
                            <template v-if="formData.isPassword">
                                <el-form-item label="原密码：" required v-if="$route.query.type !== 'add'">
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
                    <el-button v-if="$route.query.id" @click="$router.back()">返回</el-button>
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
    watch:{
        "airforce.login"(){
            this.init();
        }
    },
    mounted() {
        this.init();
    },
    methods:{
        // 初始化
        init(){
            switch (this.$route.query.type){
            case "edit":
                // 修改用户信息
                if(this.$route.query.id){
                    this.apis.user.auth.getUserInfo({
                        id:this.$route.query.id
                    }).then(res=>{
                        this.formData = {
                            ...res,
                            passwordOrigin:null,
                            password:null,
                            passwordNew:null,
                            isPassword:false,
                        }
                    })
                    return ;
                }
                break;
            case "add":
                // 添加用户信息
                this.formData = {
                    username:null,
                    email:null,
                    avatar:null,
                    phone:null,
                    name:null,
                    passwordOrigin:null,
                    password:null,
                    passwordNew:null,
                    isPassword:true,
                }
                break;
            default:
                // 修改当前账号信息
                this.formData = {
                    username:this.airforce.login.username,
                    email:this.airforce.login.email,
                    avatar:this.airforce.login.avatar,
                    phone:this.airforce.login.phone,
                    name:this.airforce.login.name,
                    passwordOrigin:null,
                    password:null,
                    passwordNew:null,
                    isPassword:false,
                }
                break;
            }
        },
        // 保存
        save(){
            if(this.$route.query.type === "add"){
                if(this.$utils.is_S(this.formData.username)){return this.$message.error("请输入账号名称")}
            }
            if(this.$utils.is_S(this.formData.name)){return this.$message.error("请输入用户名称")}
            if(this.$utils.is_S(this.formData.email)){return this.$message.error("请输入邮箱")}
            if(this.$utils.is_S(this.formData.phone)){return this.$message.error("请输入手机号码")}
            if(this.$utils.isPhone(this.formData.phone)){return this.$message.error("手机号码格式错误")}
            if(this.formData.isPassword && this.$route.query.type !== "add"){
                if(this.$utils.is_S(this.formData.passwordOrigin)){return this.$message.error("请输入原密码")}
                if(this.$utils.is_S(this.formData.password)){return this.$message.error("请输入新密码")}
                if(this.$utils.is_S(this.formData.passwordNew)){return this.$message.error("请再次输入密码")}
                if(this.formData.password !== this.formData.passwordNew){return this.$message.error("两次密码不一致")}
            }
            let Api = this.apis.user.auth.updateUserInfo;
            if(this.$route.query.type === "add"){
                if(this.$utils.is_S(this.formData.password)){return this.$message.error("请输入新密码")}
                if(this.$utils.is_S(this.formData.passwordNew)){return this.$message.error("请再次输入密码")}
                if(this.formData.password !== this.formData.passwordNew){return this.$message.error("两次密码不一致")}
                Api = this.apis.user.auth.register;
            }
            Api({
                ...this.formData,
                passwordOrigin:this.formData.passwordOrigin ? this.$utils.MD5(this.formData.passwordOrigin) : "",
                passwordNew:this.formData.passwordNew ? this.$utils.MD5(this.formData.passwordNew) : "",
                password:this.formData.password ? this.$utils.MD5(this.formData.password) : "",
                type:this.$route.query.type,
            }).then((res)=>{
                this.$message({type:"success",message:"保存成功"})
                this.action({
                    moduleName:"login",
                    goods:{
                        data:res,
                        ...res,
                    },
                })
                if(this.$route.query.id || this.$route.query.type === "add"){
                    this.$router.back();
                }
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