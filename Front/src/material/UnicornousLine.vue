<template>
    <div class="UnicornousLine">
        <horny-line :config="config" :index="1"></horny-line>
    </div>
</template>

<script>
    import HornyLine from "./HornyLine"
    export default {
        name: "UnicornousLine",
        components:{ HornyLine },
        props:{
            config:{type:Object,default:Object},
        },
        mounted() {
            console.log(this.config)
        }
    }
</script>

<style scoped lang="less">
.UnicornousLine{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>