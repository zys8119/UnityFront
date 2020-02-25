import Utils from "../utils"
export default {
    isFull(){
        if(this.$route.path == "/"){
            this.action({
                moduleName:"isFull",
                goods:Utils.isFull()
            })
        }
    },
    calcView(){
        let Tool_El = document.querySelector(".UnityFrontLayoutTool");
        let ComponentPane_w = getComputedStyle(document.querySelector(".UnityFrontLayoutComponentPane")).width;
        let UnityFrontLayoutView = document.querySelector(".UnityFrontLayoutView");
        let borderLineWidth = 4;
        if(Tool_El){
            let Tool_w = getComputedStyle(Tool_El).width;
            UnityFrontLayoutView.style.width = `calc(100% - ${borderLineWidth*2}px - ${Tool_w} - ${ComponentPane_w})`;
        }else {
            UnityFrontLayoutView.style.width = `calc(100% - ${borderLineWidth}px - ${ComponentPane_w})`;
        }
        UnityFrontLayoutView.style.left = parseInt(ComponentPane_w)+borderLineWidth+"px";
    },
    component(){
        // let component = _.cloneDeep(this.airforce.UnityFrontView.component);
        // this.action({moduleName:"UnityFrontView", goods:{component:null}});
        // this.action({moduleName:"UnityFrontView", goods:{component:component.map(e=>{
        //     return {
        //         ...e,
        //         left:parseInt(e.el.style.left),
        //         top:parseInt(e.el.style.left),
        //         width:e.el.offsetWidth,
        //         height:e.el.offsetHeight,
        //     }
        // })}});
    }
}
