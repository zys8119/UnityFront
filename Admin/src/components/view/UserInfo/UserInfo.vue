<template>
    <div class="UserInfo">
        <layout-box>
            <layout-filter-content>
                <div class="UserInfoFrom">
                    <div class="Avatar">
                        <Upload :show-file-list="true">
                            <el-image fit="fill" :src="formData.avatar">
                                <img slot="error" class="errImg" width="100%" height="100%" src="/images/login/logo.png">
                            </el-image>
                        </Upload>
                        <p class="msg">点击上传头像</p>
                    </div>
                    <div class="conetnt">
                        <el-form label-width="120px">
                            <el-form-item label="用户名称：" required>{{airforce.login.username}}</el-form-item>
                            <el-form-item label="邮箱：" required>
                                <el-input type="email：" :value="formData.email"></el-input>
                            </el-form-item>
                            <el-form-item label="修改密码：">
                               <el-switch v-model="isPassword"></el-switch>
                            </el-form-item>
                            <template v-if="isPassword">
                                <el-form-item label="原密码：" required>
                                    <el-input type="password" :value="formData.passwordOrigin" show-password></el-input>
                                </el-form-item>
                                <el-form-item label="密码：" required>
                                    <el-input type="password" :value="formData.password" show-password></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码：" required>
                                    <el-input type="password" :value="formData.passwordNew" show-password></el-input>
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
            isPassword:false,
            formData:{},
        }
    },
    mounted() {
        this.formData = {
            email:this.airforce.login.email,
            avatar:this.airforce.login.avatar,
        }
    },
    methods:{
        // 保存
        save(){

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