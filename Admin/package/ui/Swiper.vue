<script>
import Swiper from "swiper/js/swiper.js";
export default {
    name: "Swiper",
    props:{
        config:{type:Object,default:Object}
    },
    render(c) {
        return c("div",{
            class:"swiper-containe"
        },[
            c("div",{class:"swiper-wrapper"},this.$slots.default?this.$slots.default.map(e=>c("div",{class:"swiper-slide"},[e])):null),
            this.currentConfig.pagination && this.currentConfig.pagination.el ? c("div",{class:"swiper-pagination"}): null,
            this.currentConfig.navigation && this.currentConfig.navigation.prevEl ? c("div",{class:"swiper-button-prev"}) : null,
            this.currentConfig.navigation && this.currentConfig.navigation.nextEl ? c("div",{class:"swiper-button-next"}) : null,
            this.currentConfig.swiperScrollbar? c("div",{class:"swiper-scrollbar"}) : null,
        ])
    },
    data(){
        return {
            Swiper:null,
            initConfig:{
                // loop: true, // 循环模式选项

                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                },

                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
        }
    },
    watch:{
        config(){
            this.init();
        }
    },
    computed:{
        currentConfig(){
            return this.$utils.lodash.merge(this.initConfig,this.config)
        }
    },
    updated() {
        this.init();
    },
    mounted() {
        this.init();
    },
    methods:{
        // 初始化
        init(){
            this.$nextTick(()=>{
                this.Swiper = new Swiper('.swiper-containe',this.currentConfig);
            });
        }
    }
}
</script>

<style scoped lang="less">
@import "~swiper/css/swiper.min.css";
.swiper-containe{
    overflow: hidden;
    position: relative;
    min-height: 300px;
}
</style>