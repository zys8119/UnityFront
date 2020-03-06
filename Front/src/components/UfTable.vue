<template>
    <div class="UfTable webkit-scrollbar">
        <x-table class="x-table" :content-bordered="false" :cell-bordered="false">
            <thead>
            <tr>
                <th width="50px" v-if="point"v><span class="point"></span></th>
                <th v-for="th in columns">
                    <slot name="thead">
                        {{th.name}}
                    </slot>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,key) in data">
                <td width="50px" v-if="point"><span class="point"></span></td>
                <td  v-for="th in columns">
                    <slot :row="item" :column="th" :prop="th.prop" :index="key">{{item[th.prop]}}</slot>
                </td>
            </tr>
            </tbody>
        </x-table>
    </div>
</template>

<script>
    import { XTable } from 'vux'
    export default {
        name: "UfTable",
        components:{ XTable },
        props:{
            columns:Array,
            data:Array,
            point:{type:Boolean,default:true},
        }
    }
</script>

<style scoped lang="less">
    .UfTable{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        .x-table{
            max-height: 50px;
            overflow-x: hidden;
            color: rgba(255, 255, 255, 1);
            &:after{
                border: none;
            }
            &/deep/ th{
                font-size: 16px;
                &:before{
                    border: none;
                }
                .point{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width:10px;
                    height:10px;
                    transform: translate(-50%,-50%);
                    border-radius: 100%;
                    background:rgba(126,73,238,1);
                }
            }
            &/deep/  td{
                font-size: 14px;
                &:before{
                    border: none;
                }
                .point{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width:10px;
                    height:10px;
                    transform: translate(-50%,-50%);
                    border-radius: 100%;
                    background:rgba(126,73,238,1);
                }
            }
        }
    }
</style>