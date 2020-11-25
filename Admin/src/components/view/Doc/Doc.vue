<template>
    <div class="Doc">
        <div class="DocLeft">
            <div v-for="(item, key) in apiData" :key="key">
                <el-divider v-if="getGroupName(item.data).length > 0">{{getGroupName(item.data)[0].groupName }}</el-divider>
                <div :class="{activity:$route.query.id === `${key}-${k2}`}" @click="goApi(`${key}-${k2}`)" class="row ellipsis-1" v-for="(it, k2) in item.data" :key="`${key}-${k2}`" v-if="it.description && it.description !== 'unknown'">{{it.description}}</div>
            </div>
        </div>
        <div class="DocRight">
            <div v-for="(item, key) in apiData" :key="key">
                <div :id="`api-${key}-${k2}`" class="row ellipsis-1" v-for="(it, k2) in item.data" :key="`${key}-${k2}`" v-if="it.description && it.description !== 'unknown'">
                    <h2>{{it.name}}</h2>
                    <p class="description">{{ it.description }}</p>
                    <el-divider>基础信息</el-divider>
                    <div class="info-row url">接口地址：<code>{{ item.url}}/{{it.name}}</code></div>
                    <div class="info-row method">请求方式：<code>{{ it.method}}</code></div>
                    <div class="info-row controller">controller：<code>{{ item.controller}}</code></div>
                    <el-divider>请求参数</el-divider>
                    <content-table ref="table" :pageConfig="{noPage:true}" :data="getData(item, it)" :columns="columns"></content-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Doc",
    data(){
        return {
            apiData:[],
            columns:[
                {label:"参数类型", prop:"data_type"},
                {label:"字段名称", prop:"field_name"},
                {label:"字段类型", prop:"type"},
                {label:"字段描述", prop:"description"},
            ]
        }
    },
    watch:{
        $route(){
            this.init();
        }
    },
    mounted() {
        this.apis.Doc.constructor.index().then(res=>{
            this.apiData = res.filter(e=>e.data.length > 0);
            this.$nextTick(()=>{
                this.$refs.table.forEach((vm, key)=>{
                    vm.init();
                    if(key === (this.$refs.table.length - 1)){
                        setTimeout(()=>{
                            this.init();
                        },500)
                    }
                });
            })
        });
    },
    methods:{
        // 获取组
        getGroupName(data){
            return data.filter(it=>it.description && it.description !== 'unknown' && it.groupName && it.groupName !== 'unknown');
        },
        // 初始化位置
        init(){
            this.$nextTick(()=>{
                if(this.$route.query.id){
                    const dom = document.getElementById(`api-${this.$route.query.id}`);
                    if(dom){
                        dom.scrollIntoView({
                            block: 'start',
                            behavior: 'smooth'
                        });
                    }
                }
            })
        },
        // 获取数据
        getData(item, it){
            let resUlt = [];
            [
                "body",
                "params",
                "query",
            ].forEach(type=>{
                this.initData(resUlt,it[type],type);
            })
            return resUlt;
        },
        // 初始化数据
        initData(resUlt, data,data_type){
            for(let k in data){
                resUlt.push({
                    data_type:data_type,
                    field_name:k,
                    type:data[k].type,
                    description:data[k].description,
                })
            }
        },
        // 跳转指定api
        goApi(key){
            this.$router.push({
                query:{
                    id:key,
                }
            });
        }
    }
}
</script>

<style scoped lang="less">
.Doc{
    @s:300px;
    .DocLeft{
        overflow-x: hidden;
        height: 100%;
        width: @s;
        position: fixed;
        left: 0;
        top: 0;
        border-right: 1px solid #d8d8d8;
        .row{
            line-height: 50px;
            padding: 0 @unit15;
            border-bottom: 1px solid #d8d8d8;
            cursor: pointer;
            &:hover{
                background-color: @themeColor;
                color: @white;
            }
            &.activity{
                background-color: @themeColor;
                color: @white;
            }
        }
    }
    .DocRight{
        .DocLeft;
        width:calc(100% - @s);
        left: @s;
        .row{
            padding: @unit15;
            &:hover{
                background-color: transparent;
                color: initial;
            }
            .description{
                position: relative;
                background-color: #e5e5e5;
                padding: 0 @unit15;
                color: #333333;
                margin-bottom: @unit15;
                &:before{
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 2px;
                    height: 100%;
                    background-color: @themeColor;
                }
            }
            .info-row{
                padding: 0 @unit15;
                position: relative;
                &:before{
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: @unit15/2;
                    height: @unit15/2;
                    border-radius: 100%;
                    background-color: @themeColor;
                }
                code{
                    background-color: #e5e5e5;
                    padding: 2px @unit15;
                    border-radius: 4px;
                    font-weight: bold;
                }
                &.method{
                    code{
                        color: #ffffff;
                        background-color:  #0AAF38;
                    }
                }
                &.controller{
                    code{
                        color: #999999;
                        font-weight: initial;
                    }
                }
            }
        }
    }
}
</style>