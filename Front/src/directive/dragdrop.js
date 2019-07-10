export default {
    oldCalc(oldLeft,left){
        if(isNaN(left)){
            oldLeft = 0;
        }else {
            oldLeft = left;
        };
        return oldLeft;
    },
    default(dragObj, getStyle ,left,top, oldLeft,oldTop,dragObjWidth,dragObjHeight){
        //边界判断
        if(
            dragObj.offsetLeft <= 1 && left < 0 ||
            dragObj.offsetLeft+dragObjWidth >= window.innerWidth && left > 0 ||
            dragObj.offsetTop <= 50 && top < 0
            || dragObj.offsetTop + 50 >= window.innerHeight && top > 0
        ){
            return;
        };
        let index = 1;
        if(getStyle.position == "fixed" || getStyle.position == "absolute"){
            //更改加速度
            index = 1.8;
        }
        left *= index;
        top *= index;
        //移动当前元素
        dragObj.style.left = oldLeft + left + 'px';
        dragObj.style.top = oldTop + top + 'px';
    },
    ".ZXDialogAlert .weui-dialog":function(dragObj, getStyle ,left,top, { oldLeft,oldTop },dragObjWidth,dragObjHeight){
        this.default(dragObj, getStyle ,left,top, oldLeft,oldTop,dragObjWidth,dragObjHeight);
    },
    ".UnityFrontLayoutTool":function (dragObj, getStyle ,left,top,{ oldWidth }) {
        let width = oldWidth - left;
        //边界判断
        if(width >= window.innerWidth / 3 ||　width <= 100){
            return;
        }
        //移动当前元素
        dragObj.style.width = width + 'px';
    },
    ".UnityFrontLayoutComponentPane":function (dragObj, getStyle ,left,top,{ oldWidth }) {
        let width = oldWidth + left;
        //边界判断
        if(width >= window.innerWidth / 3 ||　width <= 100){
            return;
        }
        //移动当前元素
        dragObj.style.width = width + 'px';
    }
}
