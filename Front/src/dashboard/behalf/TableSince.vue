<template>
    <div class="TableSince">
        <uf-table :columns="columns" :data="data">
            <template slot-scope="{prop,row,index}">
                <template v-if="prop === 'd'">
                    <span>{{row[prop]}}</span>
                    <span class="iconfont up" v-if="row.type === 1">&#xe62f;</span>
                    <span class="iconfont down"  v-if="row.type === 2">&#xe630;</span>
                </template>
                <template v-else-if="prop === 'index'">
                    <span>{{index+1}}</span>
                </template>
                <template v-else>
                    {{row[prop]}}
                </template>
            </template>
        </uf-table>
    </div>
</template>

<script>
    import { UfTable } from '@/components'
    export default {
        name: "TableSince",
        title:"议案建议统计",
        components:{ UfTable },
        data(){
            return {
                columns:[
                    {name:"排名",prop:"index"},
                    {name:"代表团",prop:"name"},
                    {name:"议案",prop:"b"},
                    {name:"建议",prop:"c"},
                    {name:"同比去年",prop:"d"},
                    {name:"反馈率",prop:"c"},
                    {name:"最多跑一次满意率",prop:"c"},
                ],
                data:[
                    {name:"海曙",a:"16",b:"8",c:"100%",d:"30%",type:1},
                    {name:"海曙",a:"16",b:"8",c:"100%",d:"30%",type:2},
                ]
            }
        }
    }
</script>

<style scoped lang="less">
.TableSince{
    span{
        &.iconfont{
            &.up{
                color: rgba(253, 51, 51, 1);
            }
            &.down{
                color: rgba(9, 175, 57, 1);
            }
        }
    }
}
</style>