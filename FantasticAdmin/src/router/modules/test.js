import Layout from '@/layout'

export default {
    path: '/test',
    component: Layout,
    redirect: '/test/page',
    name: 'test',
    meta: {
        title: '测试菜单',
        icon: 'sidebar-menu'
    },
    children: [
        {
            path: 'page',
            name: 'test_page',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/multilevel_menu_example/page'),
            meta: {
                title: '测试页面'
            }
        }
    ]
}
