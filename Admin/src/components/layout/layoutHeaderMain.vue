<template>
    <div class="layoutHeaderMain">
        <div class="logo">
            <img src="/images/login/logo_text.png">
        </div>
        <el-tabs class="conetntMenu">
            <el-tab-pane v-for="(item,key) in 100" :key="key">
                <div slot="label" class="conetntMenuItem">
                    {{item}}
                </div>
            </el-tab-pane>
        </el-tabs>
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
                background-color: tint(@themeColorBg,50%);
            }
            &.is-active{
                color: @white;
                background-color: @themeColor;
            }
        }
    }
}
</style>