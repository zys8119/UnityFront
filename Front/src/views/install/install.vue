<template>
    <div class="install">
        <h1>初始化项目</h1>
        <group :title="`数据库配置,请先确保数据库 ${airforce.install.sql.dataBaseName}的存在，以实际项目为准`">
            <x-button type="primary" @click.native="install">安装</x-button>
        </group>
    </div>
</template>

<script>
    import { Group, XInput, XButton } from "vux"
    export default {
        name: "install",
        components:{ Group, XInput, XButton },
        methods:{
            install(){
                this.api().install();
            }
        }
    }
</script>

<style scoped lang="less">
    .install {
        background-color: #FFFFFF;
        width: 80%;
        margin:30px auto;
        padding: 15px;
    }
</style>
