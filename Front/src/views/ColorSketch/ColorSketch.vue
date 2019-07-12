<template>
    <div class="ColorSketch">
        <color-sketch-select :value="value" @input="change" :presetColors="presetColors"></color-sketch-select>
    </div>
</template>

<script>
    //颜色选择器
    import { Sketch as colorSketchSelect } from 'vue-color'
    export default {
        name: "colorSketch",
        components:{ colorSketchSelect },
        data(){
            return {
                value:"#000000"
            }
        },
        props:{
            color:{
                type:String | Object,
                default:null
            },
            presetColors:{
                type:Array,
                default:Array
            }
        },
        mounted() {
            this.value = this.color;
        },
        watch:{
            color(newValue){
                this.value = newValue;
            }
        },
        methods:{
            change(val){
                this.value = val;
                this.$emit("change",val);
            }
        }
    }
</script>

<style scoped lang="less">
    .ColorSketch {

    }
</style>
