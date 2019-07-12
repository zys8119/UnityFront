<template>
    <div class="UfColor">
        <flexbox>
            <flexbox-item><p class="msg">asd</p></flexbox-item>
            <flexbox-item><div class="color">asd</div></flexbox-item>
        </flexbox>
        <!--<color-sketch v-model="color" :presetColors="[]"></color-sketch>-->
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem } from "vux"
    export default {
        name: "UfColor",
        components:{ Flexbox, FlexboxItem },
        data(){
            return {
                color:'#f00',
            }
        }
    }
</script>

<style scoped lang="less">
    .UfColor {
        .color{
            width: 30px;
            height: 30px;
        }
    }
</style>
