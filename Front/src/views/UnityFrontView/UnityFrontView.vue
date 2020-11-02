<template>
    <div class="UnityFrontView">
        <unity-front-layout-title title="场景视图"></unity-front-layout-title>
        <div class="UnityFrontViewContent" ref="UnityFrontViewContent" v-dragdrop dragdrop=".UnityFrontViewContent">
            sdfsd
        </div>
    </div>
</template>

<script>
    import UnityFrontLayoutTitle from "@/components/layout/UnityFrontLayoutTitle"
    export default {
        name: "UnityFrontView",
        components:{ UnityFrontLayoutTitle },
        data(){
            return {
                bool:true,
            }
        },
        mounted() {
            this.$utils.windowAddMouseWheel((type,e)=>{
                if(e.target == this.$refs.UnityFrontViewContent){
                    let index = new Number(this.$refs.UnityFrontViewContent.style.transform.replace(/[^0-9.]/img,""));
                    if(index == 0){
                        index = 1;
                    };
                    if(type == "top"){
                        //最大
                        if(index >= 4){
                            return;
                        }
                        index += 0.02;
                    }else if(type == "down"){
                        //最小
                        if(index <= 0.1){
                            return;
                        }
                        index -= 0.02;
                    };
                    this.$refs.UnityFrontViewContent.style.transform = `scale(${index})`;
                }
            })
        }
    }
</script>

<style scoped lang="less">
    .UnityFrontView {
        &/deep/ .UnityFrontLayoutTitle{
            .UnityFrontLayoutTitleBox{
                z-index: 2;
            }
        }
        .UnityFrontViewContent{
            position: absolute;
            left: 0;
            top:0;
            top: ~"calc(32px)";
            width: 100%;
            height: 100%;
            height: ~"calc(100% - 32px)";
            background-color: #E59313;
        }
    }
</style>
