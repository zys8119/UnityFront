import Utils from "../utils"
export default {
    isFull(){
        this.action({
            moduleName:"isFull",
            goods:Utils.isFull()
        })
    },
    calcView(){
        let Tool_w = getComputedStyle(document.querySelector(".UnityFrontLayoutTool")).width;
        let ComponentPane_w = getComputedStyle(document.querySelector(".UnityFrontLayoutComponentPane")).width;
        let UnityFrontLayoutView = document.querySelector(".UnityFrontLayoutView");
        let borderLineWidth = 4;
        UnityFrontLayoutView.style.width = `calc(100% - ${borderLineWidth*2}px - ${Tool_w} - ${ComponentPane_w})`;
        UnityFrontLayoutView.style.left = parseInt(ComponentPane_w)+borderLineWidth+"px";
    }
}
