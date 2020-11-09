module.exports = {
    pages:{
        index: {
            title:"UnityFront后台管理系统",
            entry: 'src/main.js',
        }
    },
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('less').oneOfs.store;
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: './src/assets/less/constant.less',
                })
                .end()
        })
    },
}