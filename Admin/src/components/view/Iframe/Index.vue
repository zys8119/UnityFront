<template>
    <div class="Index">
        <iframe :src="$route.query.url" :class="{
            show:showAside,
            hide:!showAside,
        }"></iframe>
    </div>
</template>

<script>
export default {
    name: "Index",
    computed:{
        showAside(){
            return this.airforce.menusInfo && this.airforce.menusInfo.children && this.airforce.menusInfo.children.length > 0
        }
    },
    mounted() {
        if(this.$route.query.open === "true"){
            window.open(this.$route.query.url);
            this.$router.back();
        }
    }
}
</script>

<style scoped lang="less">
.Index{
    iframe{
        border: none;
        position: fixed;
        transition: @transition;
        left: 0;
        bottom:0;
        width: 100%;
        height: calc(100% - @layoutHeader - @layoutTabs);
        &.show{
            width: calc(100% - @layoutAside);
            left: @layoutAside;
        }
        &.hide{
            width: 100%;
        }
    }
}
</style>