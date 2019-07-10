<template>
    <div class="UfBox webkit-scrollbar">
        <div class="UfBoxContent">
            <div class="UfBoxContentViews">
                <slot></slot>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "UfBox"
    }
</script>

<style scoped lang="less">
    .UfBox {
        height: 100%;
        overflow-x: hidden;
        .UfBoxContent{
            padding-bottom: 30px;
            .UfBoxContentViews{
                padding: 15px;
            }

        }
    }
</style>
