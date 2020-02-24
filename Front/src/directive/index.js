import dragdropUtils from "./dragdrop"
export default {
    dragdrop: {
        inserted: function (el,onmousedown,onmouseup) {
            setTimeout(()=>{
                let dragdropClassName = el.getAttribute("dragdrop");
                //获取目标元素
                let dragObj = document.querySelector(dragdropClassName) || el;
                //算出鼠标相对元素的位置
                let disX,disY,oldLeft,oldTop,oldWidth,oldHeight;
                //鼠标按下的事件
                el.onmousedown = (e)=>{
                    try {onmousedown()}catch (e) {};
                    disX = e.clientX;
                    disY = e.clientY;
                    let getStyle = getComputedStyle(dragObj);
                    if(!getStyle.position || getStyle.position.length == 0){
                        dragObj.style.position = "relative";
                    };
                    oldLeft = dragdropUtils.oldCalc(oldLeft,parseInt(getStyle.left));
                    oldTop = dragdropUtils.oldCalc(oldTop,parseInt(getStyle.top));
                    oldWidth = dragdropUtils.oldCalc(oldWidth,parseInt(getStyle.width));
                    oldHeight = dragdropUtils.oldCalc(oldHeight,parseInt(getStyle.height));
                    //鼠标按下并移动的事件
                    window.onmousemove =  (e)=>{
                        if(!disX || !disY){
                            return;
                        }
                        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                        let left = e.clientX - disX;
                        let top = e.clientY - disY;
                        let dragObjWidth = parseInt(getStyle.width);
                        if(isNaN(dragObjWidth)){
                            dragObjWidth = 0;
                        }
                        let dragObjHeight = parseInt(getStyle.height);
                        if(isNaN(dragObjHeight)){
                            dragObjHeight = 0;
                        };
                        dragdropUtils[(dragdropClassName || "default")](dragObj,getStyle,left,top,{
                            oldLeft,oldTop,
                            oldWidth,oldHeight,
                        },dragObjWidth,dragObjHeight);
                    };
                    e.preventDefault();
                    e.stopPropagation();
                };

                window.onmouseup = (e) => {
                    try {onmouseup()}catch (e) {};
                    disX = null;
                    disY = null;
                    window.onmousemove = null;
                };
            });
        }
    }
}
