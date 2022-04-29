<template>
    <div class="LogDetails">
        <h1>错误描述......</h1>
        <el-tabs>
            <el-tab-pane label="基本信息">
                <h2>基本信息</h2>
                <div class="info flex">
                    <div class="_row">日志id<span>{{ info.id }}</span></div>
                    <div class="_row">应用id<span>{{ info.app_id }}</span></div>
                    <div class="_row flex_row">项目版本<span>{{ info.project_version }}</span></div>
                    <div class="_row flex_row">日志类型<span>{{ info.type }}</span></div>
                    <div class="_row flex_row">上报时间<span>{{ info.creation_time }}</span></div>
                </div>
                <el-divider></el-divider>
                <h2>来源信息</h2>
                <div class="info flex">
                    <div class="_row">用户id<span>{{ info.user_id }}</span></div>
                    <div class="_row">用户标识<span>{{ info.user_tag }}</span></div>
                    <div class="_row flex_row">页面<span>{{ log_info.pageTitle }}</span></div>
                    <div class="_row">页面地址<span>{{ log_info.pageUrl }}</span></div>
                </div>
                <el-divider></el-divider>
                <h2>JS栈堆</h2>
                <div>栈堆、1</div>
                <div>
                    <pre>
                        {{log_info.stack}}
                    </pre>
                </div>
                <div>栈堆、2</div>
                <div>
                    <pre>
                        {{errorDataOrigin.stack}}
                    </pre>
                </div>
            </el-tab-pane>
            <el-tab-pane label="设备系统信息">
                <h2>设备系统信息</h2>
                <div class="info flex">
                    <div class="_row flex_row">userAgent<span>{{ log_info.system.userAgent }}</span></div>
                    <div class="_row flex_row">platform<span>{{ log_info.system.platform }}</span></div>
                    <div class="_row flex_row">onLine<span>{{ log_info.system.onLine }}</span></div>
                    <div class="_row flex_row">productSub<span>{{ log_info.system.productSub }}</span></div>
                    <div class="_row flex_row">product<span>{{ log_info.system.product }}</span></div>
                    <div class="_row flex_row">language<span>{{ log_info.system.language }}</span></div>
                    <div class="_row flex_row">appName<span>{{ log_info.system.appName }}</span></div>
                    <div class="_row flex_row">appCodeName<span>{{ log_info.system.appCodeName }}</span></div>
                    <div class="_row flex_row">appVersion<span>{{ log_info.system.appVersion }}</span></div>
                    <div class="_row flex_row">vendor<span>{{ log_info.system.vendor }}</span></div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="存储信息">
                <h2>页面存储数据</h2>
                <div class="box">
                    <el-collapse>
                        <el-collapse-item title="cookie" name="cookie">
                            <div class="dataFilter">
                                <div class="_value" v-html="log_info.cookie"></div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="sessionStorage" name="sessionStorage">
                            <div v-html="dataFilter(log_info.sessionStorage)"></div>
                        </el-collapse-item>
                        <el-collapse-item title="localStorage" name="localStorage">
                            <div v-html="dataFilter(log_info.localStorage)"></div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: "LogDetails",
    props:{
        info:{
            type:Object,
            default:()=>({})
        }
    },
    computed:{
        log_info(){
            return this.info.log_info
        },
        errorData(){
            return this.log_info.errorData
        },
        errorDataOrigin(){
            return this.log_info.errorDataOrigin
        },
        type(){
            return this.info.type
        },
    },
    methods:{
        dataFilter(val){
            return Object.keys(val).map(k=>`
                <div class="dataFilter"><span class="_label">${k}：</span><span class="_value">${val[k]}</span></div>
            `).join("")
        }
    },
    mounted() {
        console.log(this.info)
    }
}
</script>

<style scoped lang="less">
.LogDetails {
    background-color: #f4f4f5;
    padding: 15px;
    overflow-x: hidden;
    height: 95%;
    .box{
        padding: 15px;
        background-color: #ffffff;
    }
    ._row{
        color: #ad5d00;
        line-height: 40px;
        font-weight: bold;
        span{
            color: #393c52;
            margin-left: 15px;
            background-color: #ebebeb;
            padding: 5px;
            border-radius: 5px;
        }
        &.flex_row{
            width: 100%;
        }
    }
    .flex{
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
    }
    .info{
        margin-top: 15px;
    }
    /deep/.dataFilter{
        &+.dataFilter{
            margin-top: 10px;
            border-top: 1px dashed #d8d8d8;
            padding: 5px 0;
            line-height: 30px;
            ._label{
                font-weight: bold;
                background-color: #ffcfcf;
                padding: 5px;
                margin-right: 10px;
            }
            ._value{
                background-color: #d7cfff;
            }
        }
    }
}
</style>
