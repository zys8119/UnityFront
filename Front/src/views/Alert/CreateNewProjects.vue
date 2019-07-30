<template>
    <div class="CreateNewProjects">
        <x-input :value="vm.airforce.CreateNewProjects.project_name"
                 @on-change="vm.airforce.input($event,'project_name','CreateNewProjects')"
                 class="z_Input" title="项目名称" :showClear="false"></x-input>
        <x-textarea :value="vm.airforce.CreateNewProjects.rmarks"
                    @on-change="vm.airforce.input($event,'rmarks','CreateNewProjects')"
                    title="项目描述" class="z_textarea palr"></x-textarea>
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
                }
                this.vm.api().CreateNewProjects().then(res=>{
                    if(res.code == 200){
                        this.vm.action({
                            moduleName: "CreateNewProjects",
                            goods:{
                                project_name:null,
                                rmarks:null,
                            }
                        });
                    }
                    console.log(res);
                }).catch(err=>{
                    this.vm.$vux.toast.text(err);
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .CreateNewProjects {
    }
</style>
