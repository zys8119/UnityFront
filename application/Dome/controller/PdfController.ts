import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import {resolve} from "path"
import {readFileSync, writeFileSync} from "fs"
import {inflateSync, deflateSync} from "zlib"
import {set,merge} from "lodash"
import {xml2json} from "xml-js"
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
        let markMapKeys = Object.keys(markMap || {});
        let isXML = markMapKeys.includes("XML");
        let content = (buffStr.split(mark))[1];
        let stream:any = null;
        try{
            stream = this.bufferSplit(buff,"stream")[1]
            if(isXML){
                stream = this.bufferSplit(stream,"\n");
                stream = stream.slice(1,stream.length - 1)
                stream = stream.map((e,k,a)=>{
                    if(k < a.length - 1){
                        return Buffer.concat([e,Buffer.from("\n")])
                    }else{
                        return e;
                    }
                });
            }else{
                stream = this.bufferSplit(stream,"\r\n");
                stream = stream.slice(1,stream.length - 1)
                stream = stream.map((e,k,a)=>{
                    if(k < a.length - 1){
                        return Buffer.concat([e,Buffer.from("\r\n")])
                    }else{
                        return e;
                    }
                });
            }
            stream = Buffer.concat(stream);
        }catch(e){}
        let streamStr = null;
        try{
            streamStr = stream.toString()
        }catch(e){}
        let streamDecode = null;

        try{
            if(markMapKeys.includes("DCTDecode")){
                streamDecode = deflateSync(stream).toString()
            }else if(markMapKeys.includes("FlateDecode")){
                streamDecode = inflateSync(stream).toString()
            }
        }catch(e){}
        const result = {
            // 缓冲器
            buff,
            // 缓存字符串
            buffStr,
            // 对象标识符
            key,
            // 标识符内容
            mark,
            // 标识map映射
            markMap,
            // keyName集合
            markMapKeys,
            // 内容
            content,
            // 流
            stream,
            // 流字符
            streamStr,
            // 流解码内容
            streamDecode,
        }
        return result
    });

    constructor(){
        super()
    }

    async index(){
        this.$_success(await this.parse());
    }

    /**
     * 解析pdf
     */
    async parse(){
        return {
            info:await this.getInfo()
        }
    }

    /**
     * 获取信息
     */
    async getInfo(){
        let info:any = {};
        try{
            const Root:any = this.fileBuffSplitArray.find(e=>e.markMap && e.markMap.Root) || {};
            const RootObj:any = this.fileBuffSplitArray.find(e=>e.key === this.getObjName(Root.markMap.Root)) || {};
            info.Root = RootObj.markMap;
            try{
                const Metadata:any = this.fileBuffSplitArray.find(e=>e.key === this.getObjName(RootObj.markMap.Metadata)) || {};
                if(Metadata.markMapKeys.includes("XML")){
                    info.Root.Metadata = JSON.parse(xml2json(Metadata.streamStr,{
                        compact:true,
                        trim:true,
                    }))
                }
            }catch(e){}
            try{
                const Pages:any = this.fileBuffSplitArray.find(e=>e.key === this.getObjName(RootObj.markMap.Pages)) || {};
                info.Pages = Pages.markMap;
            }catch(e){}
        }catch(e){}

        return info;
    }

    /**
     * 获取对象名称
     * @param name
     */
    getObjName(name){
        return name.replace(/R/img,"obj");
    }
    /**
     * 获取时间
     * @param str
     */
    getDate(str){
        return /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/.exec(str).slice(1).map((e,k)=>{
            switch(k){
                case 0:
                    return `${e}年` ;
                case 1:
                    return `${e}月` ;
                case 2:
                    return `${e}日` ;
                case 4:
                    return `${e}时` ;
                case 5:
                    return `${e}分` ;
                case 6:
                    return `${e}秒` ;
            }
        }).join("")
    }

    /**
     * 获取key
     * @param key
     */
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