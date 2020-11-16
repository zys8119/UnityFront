<template>
    <div class="MenuTypeManagement">
        <layout-box>
            <layout-filter-content>
                <filter-content slot="filter"></filter-content>
                <content-table></content-table>
            </layout-filter-content>
        </layout-box>
    </div>
</template>

<script>
export default {
    name: "MenuTypeManagement",
}
</script>

<style scoped lang="less">
.MenuTypeManagement{
}
</style>