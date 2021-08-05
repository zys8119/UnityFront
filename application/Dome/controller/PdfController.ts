import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import {resolve} from "path"
import {readFileSync} from "fs"
export class PdfController extends applicationController {
    filePath = resolve(__dirname,"../../../public/a.pdf");
    fileBuff = readFileSync(this.filePath);
    fileBuffSplitArray = this.bufferSplit(this.fileBuff,"endobj").map((buff, index)=>{
        let buffStr = buff.toString();
        let key = (buffStr.match(/^\d*\s*\d*\sobj/img) || [])[0];
        let mark = (buffStr.match(/<<.*>>/img) || [])[0];
        let markMap = {};
        let keyOld = [];
        (mark || "").split("/").forEach(it=>{
            if(it.indexOf("<<")){
                keyOld.push(it)
            }
            if(it.indexOf(">>")){
                keyOld.pop()
            }
            if(keyOld[key.length - 1]){

            }else{
                markMap[it] = true;
            }
        });
        let content = (buffStr.split(mark))[1];
        return {
            buff,
            buffStr,
            key,
            mark,
            markMap,
            content
        }
    });
    constructor(){
        super()
    }

    index(){
        console.log(this.fileBuffSplitArray[this.fileBuffSplitArray.length - 2])
        this.$_success(this.filePath);
    }
}