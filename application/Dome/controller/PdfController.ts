import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import {resolve} from "path"
import {readFileSync,createWriteStream,createReadStream} from "fs"
import {inflateSync,deflateSync} from "zlib"
import {set,merge} from "lodash"
export class PdfController extends applicationController {
    filePath = resolve(__dirname,"../../../public/1.pdf");
    fileBuff = readFileSync(this.filePath);
    fileBuffSplitArray = this.bufferSplit(this.fileBuff,"endobj").map((buff, index)=>{
        let buffStr = buff.toString();
        let key = (buffStr.match(/^\d*\s*\d*\sobj/img) || [])[0];
        let mark = (buffStr.match(/<<(.|\n)*>>/img) || [])[0];
        let markMap = {};
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
        if(key === "7 0 obj"){
            // console.log(111,inflateSync(Buffer.from(deflateSync("张云山").toString("hex"),'hex') ).toString())
            let c= this.bufferSplit(buff,"stream")[1];
            c = this.bufferSplit(c,"end")[0];
            console.log(JSON.stringify(c.toString()))
            c = Buffer.concat(this.bufferSplit(c,"\n").slice(1,5));
            console.log(inflateSync(c))
            console.log(createReadStream(inflateSync(c)).pipe(createWriteStream(resolve(__dirname,"./aa.txt"))))
        }
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
        // console.log(this.fileBuffSplitArray)
        this.$_success(this.filePath);
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