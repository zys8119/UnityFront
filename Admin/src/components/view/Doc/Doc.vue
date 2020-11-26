<template>
    <div class="Doc">
        <div class="DocHeader">
            <img class="logo" src="/images/login/logo_text2.png">
            <div class="title">UnityFront后台管理系统-api平台</div>
        </div>
        <div class="DocLeft">
            <div v-for="(item, key) in apiData" :key="key" class="menusRowBox" :class="{show:item.show}">
                <div  @click="item.show = !item.show" v-if="getGroupName(item.data).length > 0" class="groupName ellipsis-1">
                    {{getGroupName(item.data)[0].groupName }}
                    <i class="el-icon-caret-bottom" v-if="item.show"></i>
                    <i class="el-icon-caret-top" v-else></i>
                </div>
                <div v-if="it.description && it.description !== 'unknown' && item.show" :class="{activity:$route.query.id === `${key}-${k2}`}" @click="goApi(`${key}-${k2}`)" class="row ellipsis-1" v-for="(it, k2) in item.data" :key="`${key}-${k2}`">{{it.description}}</div>
            </div>
        </div>
        <div class="DocRight">
            <div v-for="(item, key) in apiData" :key="key">
                <div :id="`api-${key}-${k2}`" class="row" v-for="(it, k2) in item.data" :key="`${key}-${k2}`" v-if="it.description && it.description !== 'unknown'">
                    <div class="api-content" :class="{activity:$route.query.id === `${key}-${k2}`}">
                        <h2>{{it.name}}<i class="el-icon-copy-document" @click="$utils.copyToClipboard.call(_self,copyAll(item,it))"></i></h2>
                        <p class="description">{{ it.description }}</p>
                        <el-divider>基础信息</el-divider>
                        <div class="info-row url">接口地址：<code>{{ item.url}}/{{it.name}}</code><i class="el-icon-copy-document" @click="$utils.copyToClipboard.call(_self,`${item.url}/${it.name}`)"></i></div>
                        <div class="info-row method">请求方式：<code :class="it.method?it.method.toLocaleLowerCase() : null">{{ it.method}}</code><i class="el-icon-copy-document" @click="$utils.copyToClipboard.call(_self,it.method)"></i></div>
                        <div class="info-row controller">controller：<code>{{ item.controller}}</code><i class="el-icon-copy-document" @click="$utils.copyToClipboard.call(_self,item.controller)"></i></div>
                        <el-divider>请求参数</el-divider>
                        <content-table ref="table" :pageConfig="{noPage:true}" :data="getData(item, it)" :columns="columns">
                            <template slot-scope="{column, row}">
                                <template v-if="column.prop === 'field_name'">
                                    {{row.field_name}}
                                    <i class="el-icon-copy-document" @click="$utils.copyToClipboard.call(_self,row.field_name)"></i>
                                </template>
                            </template>
                        </content-table>
                        <el-collapse accordion>
                            <el-collapse-item>
                                <template slot="title">
                                    <el-divider>JSON<i class="el-icon-caret-bottom"></i></el-divider>
                                </template>
                                <pre class="pre" v-highlightjs><code class="json">{{copyAll(item,it)}}</code></pre>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
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
            this.apiData = res.filter(e=>e.data.length > 0).map(e=>({
                ...e,
                show:true
            }));
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
        // 复制全部
        copyAll(item, it){
            let data = {
                url:`${item.url}/${it.name}`,
                method:it.method?it.method.toLocaleLowerCase() : null,
                data:{},
                params:{},
                urlQuery:{},
            }
            this.getData(item, it).forEach(e=>{
                switch (e.data_type.toLocaleLowerCase()){
                case "body":
                    data.data[e.field_name] = e.description;
                    break;
                case "query":
                    data.params[e.field_name] = e.description;
                    break;
                case "params":
                    data.urlQuery[e.field_name] = e.description;
                    break;
                }
            });
            return JSON.stringify(data,null,4);
        },
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
        },
    }
}
</script>

<style scoped lang="less">
.Doc{
    @s:300px;
    @header:50px;
    .DocHeader{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: @header;
        line-height: @header;
        background-color: @themeColor;
        color: #ffffff;
        z-index: 2;
        display: flex;
        align-items: center;
        padding: 0 @unit15;
        font-weight: bold;
        .title{
            flex: 1;
        }
        .logo{
            width: auto;
            display: inline-block;
            height: @header - 20px;
            margin-right: @unit15;
        }
    }
    .DocLeft{
        overflow-x: hidden;
        height: calc(100% - @header);
        width: @s;
        position: fixed;
        left: 0;
        top: @header;
        border-right: 1px solid #d8d8d8;
        background-color: #ffffff;
        .row{
            line-height: 50px;
            padding: 0 @unit15;
            border-bottom: 1px solid #dcdcec;
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
        .groupName{
            user-select: none;
            padding: 1px 0;
            line-height: 50px;
            text-align: center;
            cursor: pointer;
            background-color: #e5e5e5;
            border-top: 3px solid @themeColor;
            color: @themeColor;
        }
        .menusRowBox{
            &:first-child{
                .groupName{
                    border: none;
                }
            }
        }
    }
    .DocRight{
        .DocLeft;
        width:calc(100% - @s);
        left: @s;
        background-color: transparent;
        color: initial;
        .row{
            padding: @unit15;
            &:hover{
                background-color: transparent;
                color: initial;
            }
            h2{
                color: @themeColor;
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
                        &.put{
                            background-color: #d79b03;
                        }
                        &.unknown{
                            background-color: #e5e5e5;
                            color: #999999;
                        }
                        &.patch{
                            background-color: goldenrod;
                        }
                        &.delete{
                            background-color: #FF0000;
                        }
                    }
                }
                &.controller{
                    code{
                        color: #999999;
                        font-weight: initial;
                    }
                }
            }
            .api-content{
                background-color: #ffffff;
                padding: @unit15;
                border-radius: 10px;
                border:1px solid #bfbfbf;
                transition: @transition;
                &.activity{
                    border:1px solid @themeColor;;
                    box-shadow: 0 0 4px @themeColor;
                }
            }
        }
        .el-icon-copy-document{
            margin-left: @unit15;
            color: #999999;
            &:hover{
                color: @themeColor;
            }
        }
        &/deep/ .pre{
            cursor: text;
            *{
                cursor: text;
            }
        }
    }
}
</style>