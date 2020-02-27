<template>
    <div class="UnityFrontPreview">
        sdfsdfs
    </div>
</template>

<script>
    export default {
        name: "UnityFrontPreview",
        data(){
            return {
                view:{},
                project:{},
            }
        },
        mounted() {
            this.init();
        },
        methods:{
            init(){
                this.api().view_getView({
                    id:this.$route.params.id
                }).then(res=>{
                    this.view = res.data;
                    this.api().view_get_project({
                        project_id:res.data.project_id,
                    }).then(resp=>{
                        this.project = resp;
                    });
                });
            }
        }
    }
</script>

<style scoped lang="less">

</style>