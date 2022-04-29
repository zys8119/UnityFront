<template>
    <div class="jsError">
        <layout-box>
            <layout-filter-content>
                <filter-content slot="filter">
                    应用：
                    <el-select v-model="app_id" @change="change">
                        <el-option v-for="(item, key) in appList" :key="key" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </filter-content>
                <content-table
                    ref="table"
                    :columns="columns"
                    :params="params"
                    :apiPath="apis.LogUp.get"
                ></content-table>
            </layout-filter-content>
        </layout-box>
    </div>
</template>

<script>
export default {
    name: "jsError",
    data(){
        return {
            info:{},
            appList:[],
            app_id:null,
            columns:[
                {label:"用户名称", prop:"user_id"},
                {label:"用户id", prop:"user_tag"},
                {label:"日志类型", prop:"type"},
                {label:"上报时间", prop:"creation_time"},
                {label:"项目版本", prop:"project_version"},
                {label:"应用id", prop:"app_id"},
                {label:"操作", type:"operate", btns:[
                    {name:"查看日志详情", type:"text", className:"primary"},
                    {name:"删除", type:"text", className:"delete"},
                ]},
            ],
            params:{}
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
                this.init()
            })
        },
        init(){
            this.reset();
        },
        reset(){
            this.params = {
                app_id:this.app_id
            }
            this.search()
        },
        search(){
            this.$refs.table.init();
        }
    }
}
</script>

<style scoped lang="less">
.jsError {
}
</style>
