<template>
    <div class="UfColor">
        <p class="msg">{{title}}</p>
        <div class="color" :style="{backgroundColor:color}" @click="showColorSelect"></div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem } from "vux"
    export default {
        name: "UfColor",
        components:{ Flexbox, FlexboxItem },
        data(){
            return {
                show:false,
                colors:[
                    '#D0021B', '#F5A623', '#F8E71C', '#8B572A',
                    '#7ED321', '#417505', '#BD10E0', '#9013FE',
                    '#0078ff', '#4A90E2', '#50E3C2', '#B8E986',
                    '#292929', '#000000', '#4A4A4A', '#9B9B9B',
                    '#b4b4b4', '#FFFFFF', 'rgba(0,0,0,0)'
                ]
            }
        },
        props:{
            title:{
                type:String,
                default:null
            },
            value:{
                type:String | Object,
                default:null
            },
        },
        methods:{
            showColorSelect(){
                let color = this.value;
                try {
                    if(typeof this.value == 'object'  && this.value.rgba){
                        color = ()=>this.value;
                    }
                }catch (e) {}
                this.$ZAlert.show({
                    title:`【${this.title}】颜色选择`,
                    width:"220px",
                    components: "ColorSketch/ColorSketch",
                    props:{
                        color,
                        colors:()=>this.colors,
                    },
                    _event:{
                        change:val=>{
                            this.$emit("input",val);
                            this.$emit("on-change",val);
                        }
                    }
                })
            }
        },
        computed:{
            color(){
                try {
                    let rgba = this.value.rgba;
                    if(rgba){
                        return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
                    }
                }catch (e) {}
                if(typeof this.value == "string"){
                    return this.value;
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .UfColor {
        @index:30px;
        line-height: @index;
        .msg{
            float: left;
        }
        .color{
            width: @index;
            height: @index;
            float: left;
            margin-left: 15px;
            cursor: pointer;
            box-shadow: inset 0 0 3px #000000;
            position: relative;
        }
    }
</style>
