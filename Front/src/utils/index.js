export default {
    /**
     * 退出全屏
     */
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    },
    /**
     * 进入全屏
     */
    fullScreen() {
        var element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    },
    /**
     * 判断是否全屏
     * @returns {boolean}
     */
    isFull() {
        return !!(document.webkitIsFullScreen || document.mozFullScreen ||
            document.msFullscreenElement || document.fullscreenElement
        );
    },
    /**
     * 鼠标滚轮
     */
    windowAddMouseWheel(resolve) {
        var scrollFunc = function (e) {
            e = e || window.event;
            if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
                if (e.wheelDelta > 0) { //当滑轮向上滚动时
                    resolve("top",e);
                }
                if (e.wheelDelta < 0) { //当滑轮向下滚动时
                    resolve("down",e);
                }
            } else if (e.detail) {  //Firefox滑轮事件
                if (e.detail > 0) { //当滑轮向上滚动时
                    resolve("top",e);
                }
                if (e.detail < 0) { //当滑轮向下滚动时
                    resolve("down",e);
                }
            }
        };
        //给页面绑定滑轮滚动事件
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
        }
        //滚动滑轮触发scrollFunc方法
        window.onmousewheel = document.onmousewheel = scrollFunc;
    },
    /**
     * 项目打开记录执行
     * @constructor vm
     * @param item 项目对象
     *
     */
    ProjectList(item){
        console.log(item)
    }
}
