<template>
    <div class="aa" :a="aa" @click="bb">
            asdasdasd
        <el-button>asdasd</el-button>
    </div>
</template>

<script>
export default {
    name: "aa",
    data(){
        return {
            aa:11
        };
    },
    methods:{
        bb(a = 1){

        }
    }
}
</script>

<style scoped lang="less">
.aa{
}
</style>