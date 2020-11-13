<template>
    <div class="layoutHeaderMain">
        <div class="logo">
            <img src="/images/login/logo_text3.png">
        </div>
        <el-tabs class="conetntMenu">
            <el-tab-pane v-for="(item,key) in 100" :key="key">
                <div slot="label" class="conetntMenuItem">
                    {{item}}
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-dropdown>
            <span class="el-dropdown-link">
                 <el-image class="Avatar" fit="fill"></el-image>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="$utils.logout.call(_self)">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    name: "layoutHeaderMain"
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
        img{
            height: 90%;
            display: inline-block;
        }
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