<template>
    <div class="install">
        <h1>初始化项目</h1>
        <group :title="`数据库配置,请先确保数据库 ${airforce.install.sql.dataBaseName}的存在，以实际项目为准`">
            <x-button type="primary" @click.native="install">安装</x-button>
        </group>
        <load-more tip="数据库安装信息" :showLoading="false"></load-more>
        <div class="codeBox">
            <code>
                <h1>已安装的数据表：</h1>
                <p v-for="item in TableNameList">{{item.table_name}}</p>
            </code>
        </div>

    </div>
</template>

<script>
    import { Group, XInput, XButton, LoadMore } from "vux"
    export default {
        name: "install",
        components:{ Group, XInput, XButton, LoadMore },
        data(){
          return {
              TableNameList:[]
          }
        },
        methods:{
            install(){
                this.api().install();
            }
        },
        mounted(){
            this.api().queryTableNameList().then(res=>(res.code == 200)?this.TableNameList = res.data:null);
        }
    }
</script>

<style scoped lang="less">
    .install {
        background-color: #FFFFFF;
        width: 80%;
        margin:30px auto;
        padding: 15px;
        .codeBox{
            background-color: #eeeeee;
            border:1px solid #d8d8d8;
            border-radius: 5px;
            padding: 15px;
            code{
                h1{
                    color: #E59313;
                }
                p{
                    padding:0 15px;
                }
            }
        }
    }
</style>
