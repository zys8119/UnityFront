<template>
    <div class="OpenTheProject">
        <group>
            <cell v-for="item,key in list" :key="key" :title="item.project_name" isLink>
                asdad
            </cell>
        </group>

    </div>
</template>

<script>
    import { Group, Cell } from "vux"
    export default {
        name: "OpenTheProject",
        components:{ Group, Cell },
        data(){
          return {
              list:[],
          }
        },
        props:{
            vm:{
                type:Object,
                default:Object
            }
        }
    }
</script>

<style scoped lang="less">
    .OpenTheProject {

    }
</style>
