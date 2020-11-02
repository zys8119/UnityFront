export default {
    oldCalc(oldLeft,left){
        if(isNaN(left)){
            oldLeft = 0;
        }else {
            oldLeft = left;
        };
        return oldLeft;
    },
    default(dragObj, getStyle ,left,top, oldLeft,oldTop,dragObjWidth,dragObjHeight,boundary){
        //边界判断
        if(!boundary){
            if(
                dragObj.offsetLeft <= 1 && left < 0 ||
                dragObj.offsetLeft+dragObjWidth >= window.innerWidth && left > 0 ||
                dragObj.offsetTop <= 50 && top < 0
                || dragObj.offsetTop + 50 >= window.innerHeight && top > 0
            ){
                return;
            };
        }
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
    },
    ".ToolPane":function (dragObj, getStyle ,left,top,{ oldHeight }) {
        let height = oldHeight + top;
        // //边界判断
        if(height >= (window.innerHeight - 40 - 32) ||　height <= 40){
            return;
        }
        //移动当前元素
        dragObj.style.height = height + 'px';
        //移动相邻元素
        document.querySelector(".ComponentView").style.height = window.innerHeight - height - 40 + "px";
    },
    ".ComponentPane":function (dragObj, getStyle ,left,top,{ oldHeight }) {
        let height = oldHeight + top;
        // //边界判断
        if(height >= (window.innerHeight - 40 - 32) ||　height <= 40){
            return;
        }
        //移动当前元素
        dragObj.style.height = height + 'px';
        //移动相邻元素
        document.querySelector(".ProjectPane").style.height = window.innerHeight - height - 40 + "px";
    },
    ".UnityFrontViewContent":function (dragObj, getStyle ,left,top,{ oldHeight, oldLeft, oldTop }) {
        //移动当前元素
        dragObj.style.left = oldLeft + left + 'px';
        dragObj.style.top = oldTop + top + 'px';
    }
}
