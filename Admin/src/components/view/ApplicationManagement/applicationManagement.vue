<template>
    <div class="applicationManagement">
        <layout-box>
            <layout-filter-content>
                <filter-content slot="filter" :config="{rightBtns:[
                    {name:'新增应用', emit:'addType'}
                ]}" @addType="addApp"></filter-content>
            </layout-filter-content>
            <content-table ref="table"
                           :columns="columns"
                           :apiPath="apis.LogNakadai.ApplicationType.list"
                           @editRow="addApp"
                           @delRow="delRow"
            >
                <div slot="table" slot-scope="{data}" class="_row">
                    <div class="_item" v-for="(item, key) in data" :key="key">
                        <div class="_item_box">
                            <div class="_top">
                                <div class="_title">
                                    {{item.name}}
                                </div>
                                <div class="_icon iconfont">&#xe63a;</div>
                            </div>
                            <div class="_statistical">
                                <div class="_statistical_item">
                                    <div class="_nb">0</div>
                                    <div class="_name">位活跃用户</div>
                                </div>
                                <div class="_statistical_item">
                                    <div class="_nb">0</div>
                                    <div class="_name">用户总数</div>
                                </div>
                                <div class="_statistical_item">
                                    <div class="_nb">0</div>
                                    <div class="_name">老用户</div>
                                </div>
                                <div class="_statistical_item">
                                    <div class="_nb">0</div>
                                    <div class="_name">新用户</div>
                                </div>
                            </div>
                            <div class="_min_time">活跃趋势</div>
                            <el-divider></el-divider>
                            <div class="_min_time jk">健康总分</div>
                            <div class="jk_box">
                                <div class="_left">100</div>
                                <div class="_content">
                                    <div>JS报错率： <span>0</span>%</div>
                                    <div>接口报错率： <span>0</span>%</div>
                                </div>
                                <div class="_content">
                                    <div>自定义异常率： <span>0</span>%</div>
                                    <div>静态资源报错率： <span>0</span>%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </content-table>
        </layout-box>
    </div>
</template>

<script>
export default {
    name: "applicationManagement",
    data(){
        return {
            columns:[
                {label:"应用类型名称", prop:"name"},
                {label: "操作", type:"operate", btns:[
                        {name:"编辑", type:"text", className:"primary", emit:'editRow'},
                        {name:"删除", type:"text", className:"delete", emit:"delRow"}
                    ]},
            ]
        }
    },
    mounted() {
        this.init()
    },
    methods:{
        init(){
            this.reset()
        },
        reset(){
            this.search()
        },
        search(){
            this.$refs.table.init();
        },
        addApp(_, row){
            this.$ZAlert.show({
                title:row ? "编辑应用":"新增应用",
                components:require("./Alert/AddApp"),
                props:{
                    row:()=>row
                },
                _event:{
                    save:()=>{
                        this.reset()
                    }
                }
            })
        },
        delRow(data, row){
            this.$utils.$$confirm("该应用类型").then(()=>{
                this.apis.LogNakadai.ApplicationType.delete({id:row.id}).then(()=>{
                    this.$message({type:"success",message:"删除成功"});
                    this.reset();
                })
            })
        }
    }
}
</script>

<style scoped lang="less">
.applicationManagement {
    ._row{
        @index:3;
        @gap:15px;
        display: flex;
        gap:@gap;
        flex-wrap: wrap;
        color: #3c3e4d;
        ._item{
            background-color: white;
            border-radius: 5px;
            box-shadow: 0 0 5px #d8d8d8;
            width: calc((100% - (@index - 1) * @gap)/@index);
            ._item_box{
                padding: 15px;
                ._top{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    ._title{
                        flex: 1;
                        font-size: 18px;
                        font-weight: bold;
                    }
                    ._icon{
                        color: #999999;
                        cursor: pointer;
                        font-size: 14px;
                        &:hover{
                            color: #1b91ff;
                        }
                    }
                }
                ._statistical{
                    display: flex;
                    margin-top: 15px;
                    margin-bottom: 15px;
                    ._statistical_item{
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        ._nb{
                            font-size: 25px;
                            font-weight: bold;
                        }
                        ._name{
                            color: #999999;
                            font-size: 12px;
                        }
                        &+._statistical_item{
                            position: relative;
                            &:before{
                                content: "";
                                position: absolute;
                                left: 0;
                                top: 0;
                                height: 100%;
                                width: 1px;
                                background-color: #d8d8d8;
                            }
                        }
                    }
                }
                ._min_time{
                    font-size: 14px;
                    font-weight: bold;
                    margin: 10px 0;
                    &.jk{
                        padding-top: 30px;
                        border-top: 2px solid #fddca3;
                    }
                }
                .jk_box{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    ._left{
                        width: 50px;
                        height: 50px;
                        color: #31cc8c;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border:2px solid #31cc8c;
                        border-radius: 100%;
                        font-weight: bold;
                        font-size: 25px;
                    }
                    ._content{
                        flex: 1;
                        font-size: 12px;
                        text-align: right;
                        color: #adaeb8;
                        span{
                            color: #585858;
                        }
                        div{
                            &+div{
                                margin-top: 15px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
