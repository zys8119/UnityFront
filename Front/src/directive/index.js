export default {
    dragdrop: {
        inserted: function (el) {
            //获取目标元素
            let dragObj = el.querySelector(".weui-dialog") || el;
             //算出鼠标相对元素的位置
            let disX,disY,oldLeft,oldTop;

            //鼠标按下的事件
            dragObj.onmousedown = (e)=>{
                disX = e.clientX;
                disY = e.clientY;
                let getStyle = getComputedStyle(dragObj);
                if(!getStyle.position || getStyle.position.length == 0){
                    dragObj.style.position = "relative";
                };
                if(isNaN(parseInt(getStyle.left))){
                    oldLeft = 0;
                }else {
                    oldLeft = parseInt(getStyle.left);
                };
                if(isNaN(parseInt(getStyle.top))){
                    oldTop = 0;
                }else {
                    oldTop = parseInt(getStyle.top);
                };


                //鼠标按下并移动的事件
                window.onmousemove =  (e)=>{
                    if(!disX || !disY){
                        return;
                    }

                    //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;
                    //边界判断
                    let dragObjWidth = parseInt(getStyle.width);
                    if(isNaN(dragObjWidth)){
                        dragObjWidth = 0;
                    }
                    let dragObjHeight = parseInt(getStyle.height);
                    if(isNaN(dragObjHeight)){
                        dragObjHeight = 0;
                    }
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
                };
            };

            window.onmouseup = () => {
                disX = null;
                disY = null;
                window.onmousemove = null;
            }

        }
    }
}
