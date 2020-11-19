<template>
    <div class="BoundRole">
        <TransferBoxNew :options="options"></TransferBoxNew>
        <z-alert-footer>
            <el-button type="primary">保存</el-button>
        </z-alert-footer>
    </div>
</template>

<script>
export default {
    name: "BoundRole",
    props:{
        row:{type:Object,default:Object},
    },
    data(){
        return {
            options:[],
        }
    },
    mounted() {

    }
}
</script>

<style scoped lang="less">
.BoundRole{
}
</style>