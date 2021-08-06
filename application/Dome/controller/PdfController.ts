import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import {resolve} from "path"
import {readFileSync, writeFileSync} from "fs"
import {inflateSync, deflateSync} from "zlib"
import {set,merge} from "lodash"
export class PdfController extends applicationController {
    filePath = resolve(__dirname,"../../../public/a.pdf");
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
        let stream:any = null;
        try{
            stream = this.bufferSplit(buff,"stream")[1]
            stream = this.bufferSplit(stream,"\r\n")
            stream = stream.slice(1,stream.length - 1)
            stream = stream.map((e,k,a)=>{
                if(k < a.length - 1){
                    return Buffer.concat([e,Buffer.from("\r\n")])
                }else{
                    return e;
                }
            });
            stream = Buffer.concat(stream);
        }catch(e){}
        let streamStr = null;
        try{
            streamStr = stream.toString()
        }catch(e){}
        let streamDecode = null;
        let markMapKeys = Object.keys(markMap || {});
        try{
            if(markMapKeys.includes("DCTDecode")){
                streamDecode = deflateSync(stream).toString()
            }else if(markMapKeys.includes("FlateDecode")){
                streamDecode = inflateSync(stream).toString()
            }
        }catch(e){}
        const result = {
            buff,
            buffStr,
            key,
            mark,
            markMap,
            content,
            stream,
            streamStr,
            streamDecode,
        }
        return result
    });
    constructor(){
        super()
    }

    async index(){
        this.$_success(await new Promise(resolve1 => {
            this.fileBuffSplitArray.forEach((obj,k)=>{
                let stream = obj.stream;
                if(stream){
                    writeFileSync(resolve(__dirname,"a_"+k+".jpg"),stream)
                }
            });
            resolve1()
        }));
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