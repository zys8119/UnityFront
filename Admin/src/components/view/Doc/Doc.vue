<template>
    <div class="Doc">
        <div class="DocLeft">
            <div v-for="(item, key) in apiData" :key="key">
                <div class="row ellipsis-1" v-for="(it, k2) in item.data" :key="`${key-k2}`" v-if="it.description">
                    {{it.description}}
                </div>
            </div>
        </div>
        <div class="DocRight">
            <div v-for="i in 100" :key="i">{{i}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Doc",
    data(){
        return {
            apiData:[],
        }
    },
    mounted() {
        this.apis.Doc.constructor.index().then(res=>{
            this.apiData = res.filter(e=>e.data.length > 0);
        })
    }
}
</script>

<style scoped lang="less">
.Doc{
    .DocLeft{
        overflow-x: hidden;
        height: 100%;
        width: 300px;
        position: fixed;
        left: 0;
        top: 0;
        .row{
            line-height: 50px;
        }
    }
    .DocRight{
        overflow-x: hidden;
        height: 100%;
        width: 300px;
        position: fixed;
        left: 0;
        top: 0;
    }
}
</style>