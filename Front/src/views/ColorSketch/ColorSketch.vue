<template>
    <div class="ColorSketch">
        <div class="ColorSketchBox">
            <color-sketch-select :value="value" @input="change" :preset-colors="colors" ref="Sketch"></color-sketch-select>
        </div>
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
            colors:{
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
        .ColorSketchBox{
            width: 100%;
        }
    }
</style>
