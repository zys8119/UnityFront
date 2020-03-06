<template>
    <div class="TableSince">
        <uf-table :columns="columns" :data="data"></uf-table>
    </div>
</template>

<script>
    import { UfTable } from '@/components'
    export default {
        name: "TableSince",
        title:"履职统计表格",
        components:{ UfTable },
        data(){
            return {
                columns:[
                    {name:"代表团",prop:"name"},
                    {name:"代表人数",prop:"a"},
                    {name:"履职条数",prop:"b"},
                    {name:"人均",prop:"c"},
                ],
                data:[
                    {name:"海曙",a:"45人",b:"145条",c:"3.2条"},
                    {name:"海曙",a:"45人",b:"145条",c:"3.2条"},
                    {name:"海曙",a:"45人",b:"145条",c:"3.2条"},
                ]
            }
        }
    }
</script>

<style scoped lang="less">
.TableSince{

}
</style>