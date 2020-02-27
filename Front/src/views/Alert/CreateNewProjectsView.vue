<template>
    <div class="CreateNewProjectsView">
        <x-input :value="vm.airforce.CreateNewProjectsView.project_name"
                 @on-change="vm.airforce.input($event,'project_name','CreateNewProjectsView')"
                 class="z_Input" title="视图名称" :showClear="false"></x-input>
        <x-input :value="vm.airforce.CreateNewProjectsView.project_id"
                 @on-change="vm.airforce.input($event,'project_id','CreateNewProjectsView')"
                 class="z_Input" title="场景iD" :showClear="false" placeholder="请输入场景id、或复制场景id"></x-input>
        <x-button class="z_XButton" @click.native="CreateNewProjectsView">创建</x-button>
    </div>
</template>

<script>
    import { XInput, XButton, XTextarea, Selector, Cell } from "vux"
    export default {
        name: "CreateNewProjectsView",
        components:{ XInput, XButton, XTextarea, Selector, Cell },
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
        data(){
            return {
                list:[],
            }
        },
        mounted() {
            this.vm.airforce.input("",'project_name','CreateNewProjectsView');
            this.vm.airforce.input("",'project_id','CreateNewProjectsView');
        },
        methods:{
            CreateNewProjectsView(){
                if(this.vm.$utils.is_S(this.vm.airforce.CreateNewProjectsView.project_name)){
                    this.vm.$vux.toast.text("请输入视图名称");
                    return;
                };
                if(this.vm.$utils.is_S(this.vm.airforce.CreateNewProjectsView.project_id)){
                    this.vm.$vux.toast.text("请输入场景id");
                    return;
                };
                this.vm.api().view_viewCreate(this.vm.airforce.CreateNewProjectsView).then(res=>{
                    if(res.code === 200){
                        this.vm.airforce.input("",'project_name','CreateNewProjectsView');
                        this.vm.airforce.input("",'project_id','CreateNewProjectsView');
                        if(this.vm.$route.path !== "/viewManagement"){
                            this.vm.$router.push("/viewManagement");
                        };
                        this.vm.$ZAlert.hide();
                        this.$emit("save");
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .CreateNewProjectsView {
        .z_select{
            margin-bottom: 300px;
        }
    }
</style>
