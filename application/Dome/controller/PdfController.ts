import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import {resolve} from "path"
import {readFileSync, createWriteStream, createReadStream, writeFile, writeFileSync} from "fs"
import {inflateSync,deflateSync, brotliCompressSync, createGunzip, inflateRawSync, createInflate} from "zlib"
import {set,merge} from "lodash"
export class PdfController extends applicationController {
    filePath = resolve(__dirname,"../../../public/1.pdf");
    fileBuff = readFileSync(this.filePath);
    fileBuffSplitArray = this.bufferSplit(this.fileBuff,"endobj").map((buff, index)=>{
        let buffStr = buff.toString();
        let key = (buffStr.match(/^\d*\s*\d*\sobj/img) || [])[0];
        let mark = (buffStr.match(/<<(.|\n)*>>/img) || [])[0];
        let markMap:any = {};
        let keyOld = [];
        (mark || "").split("/").forEach(it=>{
            let getKeyVal = this.getKey(it);
            if(keyOld[keyOld.length - 1]){
                markMap = merge(markMap,set({},keyOld.join(".")+"."+getKeyVal.key,getKeyVal.val))
            }else{
                if(it && it.replace(/\n/img,"") !== "<<"){
                    markMap[getKeyVal.key] = getKeyVal.val;
                }
            }
            if(it.indexOf("<<") > -1 && it.replace(/\n/img,"") !== "<<"){
                keyOld.push(getKeyVal.key)
            }
            if(it.indexOf(">>") > -1){
                keyOld.pop()
            }
        });
        let content = (buffStr.split(mark))[1];
        let stream:Buffer = null;
        try{
            stream = this.bufferSplit(buff,"stream")[1];
            stream = this.bufferSplit(stream,"end")[0];
            stream = Buffer.concat(this.bufferSplit(stream,"\n").slice(1,5))
        }catch(e){}
        const result = {
            buff,
            buffStr,
            key,
            mark,
            markMap,
            content,
            stream
        }
        return result
    });
    constructor(){
        super()
    }

    async index(){
        console.log(this.fileBuffSplitArray[10])
        console.log(<any>this.fileBuffSplitArray[10].stream.toString("ascii"))
        this.$_success();
    }

    getKey(key){
        try{
            const arr = key.replace(/\n|>>|<</img,"").split(" ")
            return {
                key:arr[0],
                val:arr.slice(1).join(" "),
            };
        }catch(e){
            return {key,val:key};
        }
    }
}