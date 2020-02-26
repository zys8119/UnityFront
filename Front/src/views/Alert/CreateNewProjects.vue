<template>
    <div class="CreateNewProjects">
        <x-input :value="vm.airforce.CreateNewProjects.project_name"
                 @on-change="vm.airforce.input($event,'project_name','CreateNewProjects')"
                 class="z_Input" title="项目名称" :showClear="false"></x-input>
        <x-button class="z_XButton" @click.native="CreateNewProjects">创建</x-button>
    </div>
</template>

<script>
    import { XInput, XButton, XTextarea } from "vux"
    export default {
        name: "CreateNewProjects",
        components:{ XInput, XButton, XTextarea },
        props:{
            vm:{
                type:Object,
                default:Object
            }
        },
        methods:{
            CreateNewProjects(){
                if(this.vm.$utils.is_S(this.vm.airforce.CreateNewProjects.project_name)){
                    this.vm.$vux.toast.text("请输入项目名称");
                    return;
                };
                this.vm.api().view_create({
                    name:this.vm.airforce.CreateNewProjects.project_name
                }).then(res=>{
                    this.vm.airforce.input("",'project_name','CreateNewProjects');
                    this.vm.$router.push({query:{project_id:res.data.project_id}});
                    this.vm.$ZAlert.hide();
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .CreateNewProjects {
    }
</style>
