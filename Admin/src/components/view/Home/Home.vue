<template>
    <div class="Home">
        <div class="row">
            <layout-box>
                <layout-filter-content>
                    <el-form class="row-el-form">
                        <el-form-item label="用户名称："><span class="ellipsis-1">{{airforce.login.name}}</span></el-form-item>
                        <el-form-item label="邮箱："><span class="ellipsis-1">{{airforce.login.email || '暂无'}}</span></el-form-item>
                        <el-form-item label="手机："><span class="ellipsis-1">{{airforce.login.phone | phone}}</span></el-form-item>
                        <el-form-item label="登陆时间："><span class="ellipsis-1">{{airforce.login.login_time_str}}</span></el-form-item>
                    </el-form>
                </layout-filter-content>
            </layout-box>
            <layout-box>
                <layout-filter-content>
                    <h6>平台登录日志</h6>
                    <el-divider></el-divider>
                    <div class="logBox">
                        <div class="log_item" v-for="(item,key) in logList" :key="key">{{item.log_info.name}}-{{item.log_info.time}}-登录平台</div>
                    </div>
                </layout-filter-content>
            </layout-box>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    data(){
        return {
            logList:[],
        }
    },
    filters:{
        phone(val){
            if(val){
                return val.slice(0,3)+"*".repeat(8)
            }
            return "暂无";
        }
    },
    mounted() {
        this.apis.user.auth.getLoginLog({
            pageNo:1
        }).then(res=>{
            this.logList = res.list;
        })
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
        .logBox{
            max-height: 235px;
            overflow-x: hidden;
            .log_item{
                font-size: 14px;
                color: #333333;
                line-height: 40px;
                &+.log_item{
                    border-top: 1px solid #d8d8d8;
                }
            }
        }
        .row-el-form{
            padding: 26px 0;
        }
    }
}
</style>