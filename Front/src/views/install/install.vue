<template>
    <div class="install">
        <h1>asdsad</h1>
        <group title="数据库配置">
            <x-input title="数据库名称" :value="airforce.install.sql.dataBaseName"
            @on-change="airforce.input($event,'sql.dataBaseName','install')" :showClear="false"></x-input>
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
