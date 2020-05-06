<template>
    <div class="app">
        {{a}}
        <div>asdasdasd</div>
        <div>asdasdasd</div>
        <div>{{bb}}</div>
    </div>
</template>

<script>
export default {
    name: "app",
    data(){
        return {
            a:1111111111111111111,
            bb:"----------"
        }
    },
    mounted() {
        this.aa(()=>{
            console.log(566645454545)
        })
    },
    methods:{
        aa(bb){
            bb();
        }
    }
}
</script>

<style scoped>
.app{
    color: #0078ff;
}
</style>