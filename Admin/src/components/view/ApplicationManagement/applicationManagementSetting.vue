<template>
    <div class="applicationManagementSetting">
        <layout-box>
            <layout-filter-content>
                <filter-content slot="filter">
                    应用：
                    <el-select v-model="app_id" @change="change">
                        <el-option v-for="(item, key) in appList" :key="key" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </filter-content>
                <h3>基本信息</h3>
                <el-divider></el-divider>
                <el-form>
                    <el-form-item label="应用名称">{{info.name}}</el-form-item>
                    <el-form-item label="创建时间">{{info.creation_time}}</el-form-item>
                    <el-form-item label="应用ID">{{info.id}}</el-form-item>
                </el-form>
                <el-divider></el-divider>
                <h3>应用配置</h3>
                <el-divider></el-divider>
                <el-form>
                    <el-form-item label="部署方法">
                        <div>
                            window.localStorage.LogUpUserInfo = JSON.stringify({
                                userId:null,
                                userTag:null,
                                appId:"{{info.id}}",
                                projectVersion:"v1.0.0",
                            })
                        </div>
                    </el-form-item>
                </el-form>
            </layout-filter-content>
        </layout-box>
    </div>
</template>

<script>
export default {
    name: "applicationManagementSetting",
    data(){
        return {
            info:{},
            appList:[],
            app_id:null
        }
    },
    mounted() {
        Promise.all([
            this.apis.LogNakadai.Application.list({no_page:true}),
        ]).then(([appList])=>{
            this.appList = appList;
            this.app_id = (appList[0] || {}).id
            this.change(this.$route.query.id || this.app_id)
        })
    },
    methods:{
        change(id){
            this.apis.LogNakadai.Application.get({id}).then(res=>{
                this.info = res;
                this.app_id = res.id;
            })
        }
    }
}
</script>

<style scoped lang="less">
.applicationManagementSetting {
}
</style>
