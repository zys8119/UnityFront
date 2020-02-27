<template>
    <div class="CreateNewProjectsView">
        <x-input :value="vm.airforce.CreateNewProjectsView.project_name"
                 @on-change="vm.airforce.input($event,'project_name','CreateNewProjectsView')"
                 class="z_Input" title="视图名称" :showClear="false"></x-input>
        <x-button class="z_XButton" @click.native="CreateNewProjectsView">创建</x-button>
    </div>
</template>

<script>
    import { XInput, XButton, XTextarea } from "vux"
    export default {
        name: "CreateNewProjectsView",
        components:{ XInput, XButton, XTextarea },
        props:{
            vm:{
                type:Object,
                default:Object
            },
            scene:{
                type:Boolean,
                default:false
            },
        },
        mounted() {
            this.vm.airforce.input("",'project_name','CreateNewProjectsView');
        },
        methods:{
            CreateNewProjectsView(){
                if(this.vm.$utils.is_S(this.vm.airforce.CreateNewProjectsView.project_name)){
                    this.vm.$vux.toast.text("请输入视图名称");
                    return;
                };
                this.vm.api().view_create({
                    name:this.vm.airforce.CreateNewProjectsView.project_name
                }).then(res=>{
                    this.vm.airforce.input("",'project_name','CreateNewProjectsView');
                    console.log(111)
                    // if(!this.scene){
                    //     this.vm.$router.push({query:{project_id:res.data.project_id}});
                    // }
                    // this.vm.$ZAlert.hide();
                    // this.$emit("save")
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .CreateNewProjectsView {
    }
</style>
