<template>
    <div class="print" @click="print">
        <slot></slot>
    </div>
</template>

<script>
    import Vue from "vue";
    export default {
        name: "print",
        props:{
            beforePrint:{type:Function, default:()=>{}},
            afterPrint:{type:Function, default:()=>{}},
        },
        data(){
            return {
                vm:null,
            }
        },
        methods:{
            print(){
                if(this.beforePrint(this)){return;}
                if(!this.$slots.content){this.$message.error("打印内容不能为空");return;}
                this.render();
                this.done();
            },
            done(){
                setTimeout(()=>{
                    window.print();
                    this.vm.$el.parentNode.removeChild(this.vm.$el);
                },500);
                this.afterPrint();
            },
            render(){
                let el = document.createElement("div");
                document.body.appendChild(el);
                this.vm = new Vue({
                    el:el,
                    render:()=>this.$slots.content
                }).$mount(el);
                this.$emit("print",this.vm,this.done);
            }
        }
    }
</script>


<style lang="less">
    @media print {
        #app,.el-popover{
            display: none !important;
        }
        .DutyRelease_popover_print{
            display: block;
            .qrCode{
                width: 129px;
                height: 129px;
                margin-bottom: @unit15;
            }
        }
    }
</style>