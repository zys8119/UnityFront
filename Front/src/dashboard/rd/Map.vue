<template>
    <div class="Map" id="allmap"></div>
</template>

<script>
    export default {
        title:"地图-地球",
        name: "Map",
        data(){
            return {
                ak:"IBZ2es6q8DfMTDwUxlYae1l9l34NFUsE"
            }
        },
        mounted() {
            let baiduMap = document.getElementById("baiduMap")
            if(baiduMap){
                baiduMap.remove();
            }
            let baiduMapCss = document.getElementById("baiduMapCss")
            if(baiduMapCss){
                baiduMapCss.remove();
            }
            let css = document.createElement("link");
            css.href = `http://api.map.baidu.com/res/webgl/10/bmap.css`;
            css.id = "baiduMapCss";
            css.rel = "stylesheet";
            css.type = "text/css";
            document.head.append(css);
            let js = document.createElement("script");
            js.src = `http://api.map.baidu.com/getscript?type=webgl&v=1.0&ak=${this.ak}&services=&t=11111111`;
            js.id = "baiduMap";
            js.type = "text/javascript";
            js.onload = this.onload;
            document.head.append(js);
        },
        methods:{
            onload(){
                setTimeout(()=>{
                    var map = new BMapGL.Map("allmap");    // 创建Map实例
                    map.centerAndZoom(new BMapGL.Point(118.5, 27.5), 5);  // 初始化地图,设置中心点坐标和地图级别
                    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                    map.setMapType(BMAP_EARTH_MAP);
                    let time = setInterval(()=>{
                        let canvas = document.getElementsByTagName("canvas")
                        if(canvas.length == 2){
                            clearInterval(time);
                            try {
                                canvas[1].remove()
                            }catch (e) {

                            }
                            let cxt = canvas[0].getContext('2d');
                            console.log(canvas[0],cxt)
                        }
                    })
                })

            }
        }
    }
</script>

<style scoped lang="less">
#allmap{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: none !important;
    &/deep/ canvas{
        background: transparent !important;
    }
    &/deep/ .BMap_cpyCtrl{
       display: none;
    }
    &/deep/ .anchorBL{
       display: none;
    }
}
</style>