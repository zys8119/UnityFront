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
                this.apis.LogUp.get({id:res.id}).then((log)=>{
                    console.log(log)
                })
            })
        }
    }
}
</script>

<style scoped lang="less">
.jsError {
}
</style>
