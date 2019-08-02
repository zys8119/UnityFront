<template>
    <div class="install">
        <h1>初始化项目</h1>
        <load-more tip="数据库安装信息" :showLoading="false"></load-more>
        <div class="codeBox">
            <code>
                <h1 v-if="installList.length > 0">已安装的数据表：</h1>
                <p v-for="item in installList">{{item.name}}<span class="iconfont">&#xe648;</span></p>
                <h1 class="msg" v-if="notInstallList.length > 0">未安装的数据表：</h1>
                <p class="msg" v-for="item in notInstallList">{{item.name}}<span class="iconfont err">&#xe755;</span></p>
            </code>
        </div>
        <group :title="`数据库配置,请先确保数据库 ${airforce.install.sql.dataBaseName}的存在，以实际项目为准`">
            <x-button type="primary" @click.native="install">安装</x-button>
        </group>
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
        computed:{
            installList(){
                return this.TableNameList.filter(e=>e.install);
            },
            notInstallList(){
                return this.TableNameList.filter(e=>!e.install);
            }
        },
        methods:{
            install(){
                this.$vux.confirm.show({
                    title:"温馨提醒",
                    content:"已安装的数据库将被覆盖"
                });
                return;
                this.api().install().then(res=>(res.code == 200)?this.TableNameList = res.data:null);
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
                    &.msg{
                        color: #999999;
                    }
                }
                p{
                    padding:0 15px;
                    &.msg{
                        color: #999999;
                    }
                    .iconfont{
                        margin-left: 15px;
                        color: #0BB20C;
                        &.err{
                            color: #f74c31;
                        }
                    }
                }
            }
        }
    }
</style>
