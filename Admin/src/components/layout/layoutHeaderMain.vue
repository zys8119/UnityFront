<template>
    <div class="layoutHeaderMain">
        <div class="logo" @click="$router.push('/')">
            <img src="/images/login/logo_text3.png">
        </div>
        <el-tabs class="conetntMenu" @tab-click="tabClick(false)" v-model="activeName">
            <el-tab-pane v-for="(item,key) in airforce.menus" :key="key" :item="item" :name="item.id">
                <div slot="label" class="conetntMenuItem">{{item.title}}</div>
            </el-tab-pane>
        </el-tabs>
        <el-dropdown>
            <span class="el-dropdown-link">
                 <span class="username" v-if="airforce.login.name">欢迎 {{airforce.login.name}}</span>
                 <el-image class="Avatar" fit="fill" :src="airforce.login.avatar">
                     <img slot="error" class="errImg" width="100%" height="100%" src="/images/login/logo.png">
                 </el-image>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="$router.push('/userInfo')">用户中心</el-dropdown-item>
                <el-dropdown-item @click.native="$utils.logout.call(_self)">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    name: "layoutHeaderMain",
    data(){
        return {
            activeName:0
        }
    },
    mounted() {
        this.initUserInfo();
        this.init();
        this.$root.$on("initUserInfo",()=>{
            // delete localStorage.removeItem("menusId");
            // delete localStorage.removeItem("menusInfo");
            this.initUserInfo()
        })
    },
    watch:{
        "airforce.menus"(){
            this.init();
        }
    },
    methods:{
        //初始化用户信息
        initUserInfo(){
            // 获取用户信息
            this.apis.user.auth.getUserInfo().then(res=>{
                if(this.airforce.isShowServerMenus){
                    this.action({moduleName:"menus", goods:null});
                    this.action({moduleName:"menus", goods:res.menus});
                }
                res.menus = [];
                this.action({
                    moduleName:"login",
                    goods:{
                        data:res,
                        ...res,
                    },
                })
                this.$nextTick(()=>{
                    this.tabClick(false, true);
                })
            });
        },
        init(){
            this.tabClick(true);
        },
        // tab 被选中时触发
        tabClick(bool, removeMenusId){
            if(bool){
                this.parsePath();
                return ;
            }
            if(!removeMenusId){
                localStorage.setItem("menusId",null);
            }
            this.go(this.airforce.menus[this.activeName] || this.airforce.menus.find(e=>e.id === this.activeName));
            this.$root.$emit("menusIdChange");
        },
        // 跳转页面
        go(data){
            this.action({
                moduleName:"menusId",
                goods:null,
            })
            if(!data){
                return this.$message.error("暂无权限");
            }
            this.$utils.setMenu.call(this,data);
        },
        // 解析Path
        parsePath(){
            let findPath = this.$utils.findPath(this.airforce.menus,{
                path:item=>{
                    return this.$route.path.indexOf(item.path) === 0;
                },
            });
            if(findPath){
                // 去重
                let path = [];
                findPath.forEach(e=>{
                    if(path.indexOf(e) === -1){
                        path.push(e);
                    }
                });
                let menusInfo = path[0];
                this.activeName = menusInfo.id;
                this.tabClick(false);
                setTimeout(()=>{
                    this.$root.$emit("nodeClick", path.pop());
                },200)
            }
        }
    }
}
</script>

<style scoped lang="less">
.layoutHeaderMain{
    display: flex;
    .logo{
        height: @layoutHeader;
        width: @layoutAside;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img{
            height: 90%;
            display: inline-block;
        }
    }
    .el-dropdown-link{
        display: flex;
        align-content: center;
        outline: medium;
        .username{
            flex: 1;
            margin-left: @unit15;
            color: @white;
            line-height: @layoutHeader;
        }
        .Avatar{
            width: @layoutHeader - 6px;
            height: @layoutHeader - 6px;
            margin-top: 3px;
            border-radius: 100%;
            overflow: hidden;
            margin-left: @unit15;
            margin-right: @unit15;
            cursor: pointer;
            background-color: @white;
        }
    }
    &/deep/ .conetntMenu{
        flex: 1;
        color: @white;
        overflow: hidden;
        .conetntMenuItem{
            //height: @layoutHeader;
            min-width: 80px;
            text-align: center;
        }
        .el-tabs__nav-wrap{
            &:after{
                content: "";
                background-color: transparent !important;
            }
        }
        .el-tabs__item{
            color: @white;
            line-height: @layoutHeader;
            height: @layoutHeader;
            user-select: none;
            &:hover{
                background: linear-gradient(to left,@layoutColor2, @themeColor, @layoutColor2);
            }
            &.is-active{
                color: @white;
                background: linear-gradient(to left,@layoutColor2, @themeColor, @layoutColor2);
            }
        }
    }
}
</style>