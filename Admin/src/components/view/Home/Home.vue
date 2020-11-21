<template>
    <div class="Home">
        <div class="row">
            <layout-box>
                <layout-filter-content>
                    <el-form>
                        <el-form-item label="用户名称：">{{airforce.login.name}}</el-form-item>
                        <el-form-item label="邮箱：">{{airforce.login.email}}</el-form-item>
                        <el-form-item label="手机：">{{airforce.login.phone | phone}}</el-form-item>
                        <el-form-item label="登陆时间：">{{airforce.login.time}}</el-form-item>
                    </el-form>
                </layout-filter-content>
            </layout-box>
            <layout-box>
                <layout-filter-content>
                    <h6>平台日志</h6>
                </layout-filter-content>
            </layout-box>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    filters:{
        phone(val){
            if(val){
                return val.slice(0,3)+"*".repeat(8)
            }
            return "暂无";
        }
    },
    mounted() {

    }
}
</script>

<style scoped lang="less">
.Home{
    .row{
        display: flex;
        .LayoutBox{
            flex: 1;
        }
    }
}
</style>