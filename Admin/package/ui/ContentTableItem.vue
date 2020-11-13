<script>
export default {
    name: "ContentTableItem",
    props:{
        item:{type:Object,default:Object}
    },
    render(c){
        if(this.item.columns){
            return c('el-table-column',{
                props:{
                    ...this.item
                }
            },this.item.columns.map((e,key)=>{
                let v = this.$scopedSlots.default({
                    item:e,
                });
                v[0].key = key;
                return v;
            }))
        }
        return this.$scopedSlots.default({
            item:this.item
        })
    }
}
</script>

<style scoped lang="less">
.ContentTableItem{
}
</style>