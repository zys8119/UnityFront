<script>
export default {
    name: "book-item",
    props:['vnode'],
    render() {
        try {
            return this.vnode.children;
        }catch (e) {
            return  null;
        }
    }
}
</script>

<style scoped lang="less">
.bookItem{
}
</style>