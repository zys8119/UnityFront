export default {
    'node':function () {

    },
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
        try {
            let _this = window.__vm__;
            let draggable_data = JSON.parse(dragObj.getAttribute("draggable_data"));
            let UnityFrontView = _.cloneDeep(_this.airforce.UnityFrontView);
            UnityFrontView.left = draggable_data.left + left;
            UnityFrontView.top = draggable_data.top + top;
            _this.action({moduleName:"UnityFrontView", goods:UnityFrontView});
        }catch (e) {}
    },
    "draggable_data":function (dragObj, getStyle ,left,top) {
        //移动当前元素
        try {
            let _this = window.__vm__;
            let draggable_data = JSON.parse(dragObj.getAttribute("draggable_data"));
            let component = _.cloneDeep(_this.airforce.UnityFrontView.component);
            let Obj = component[draggable_data.key];
            Obj.left = draggable_data.left + left;
            Obj.top = draggable_data.top + top;
            _this.action({moduleName:"UnityFrontView", goods:{component:null}});
            _this.action({moduleName:"UnityFrontView", goods:{component}});
        }catch (e) {}
    },
    "draggable_data_operate":function (dragObj, getStyle ,left,top) {
        //移动当前元素
        //*
        try {
            let _this = window.__vm__;
            let draggable_data = JSON.parse(dragObj.getAttribute("draggable_data"));
            let component = _.cloneDeep(_this.airforce.UnityFrontView.component);
            let Obj = component[draggable_data.key];
            switch (draggable_data.type) {
                case "top_left":
                    Obj.width = (draggable_data.width - parseInt(left));
                    Obj.height = (draggable_data.height - parseInt(top));
                    Obj.left = (draggable_data.left + parseInt(left));
                    Obj.top = (draggable_data.top + parseInt(top));
                    break;
                case "top_right":
                    Obj.width = (draggable_data.width + parseInt(left));
                    Obj.height = (draggable_data.height - parseInt(top));
                    Obj.top = (draggable_data.top + parseInt(top));
                    break;
                case "bottom_left":
                    Obj.width = (draggable_data.width - parseInt(left));
                    Obj.height = (draggable_data.height + parseInt(top));
                    Obj.left = (draggable_data.left + parseInt(left));
                    break;
                case "bottom_right":
                    Obj.width = (draggable_data.width + parseInt(left));
                    Obj.height = (draggable_data.height + parseInt(top));
                    break;
                case "center_left":
                    Obj.width = (draggable_data.width - parseInt(left));
                    Obj.left = (draggable_data.left + parseInt(left));
                    break;
                case "center_right":
                    Obj.width = (draggable_data.width + parseInt(left));
                    break;
                case "center_top":
                    Obj.height = (draggable_data.height - parseInt(top));
                    Obj.top = (draggable_data.top + parseInt(top));
                    break;
                case "center_bottom":
                    Obj.height = (draggable_data.height + parseInt(top));
                    break;
            }
            _this.action({moduleName:"UnityFrontView", goods:{component:null}});
            _this.action({moduleName:"UnityFrontView", goods:{component}});
        }catch (e) {

        }
        //*/

    },
}
