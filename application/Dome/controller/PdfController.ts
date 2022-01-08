import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import {resolve} from "path"
import {readFileSync, writeFileSync} from "fs"
import {inflateSync, deflateSync, brotliDecompressSync, constants} from "zlib"
import {set,merge} from "lodash"
import {xml2json} from "xml-js"
export class PdfController extends applicationController {
    $_createEncryptKey(keyDataArr?: string[], result?: string): string {
        return super.$_createEncryptKey(keyDataArr, result);
    }
    filePath = resolve(__dirname,"../../../public/2.pdf");
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
            stream = this.bufferSplit(stream,"\n");
            stream = stream.slice(1,stream.length - 1)
            stream = stream.map((e,k,a)=>{
                if(k < a.length - 1){
                    return Buffer.concat([e,Buffer.from("\n")])
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
        // console.log(this.fileBuffSplitArray.filter(e=>e.streamDecode).map(e=>e.streamDecode))
        let info:any = {};
        try{
            const Root:any = this.fileBuffSplitArray.find(e=>e.markMap && e.markMap.Root) || {};
            info = Root.markMap;
            const InfoObj:any = this.fileBuffSplitArray.find(e=>e.key === this.getObjName(Root.markMap.Info)) || {};
            /**
             * 信息
             */
            try {
                info.Info = InfoObj.markMap;
                info.Info.CreationDate = this.getDate(InfoObj.markMap.CreationDate || "")
                info.Info.ModDate = this.getDate(InfoObj.markMap.ModDate || "")
            }catch(e){}
            const RootObj:any = this.fileBuffSplitArray.find(e=>e.key === this.getObjName(Root.markMap.Root)) || {};
            // console.log(RootObj,"====================")
            info.Root = RootObj.markMap;
            /**
             * Metadata
             */
            const Metadata:any = this.fileBuffSplitArray.find(e=>e.key === this.getObjName(RootObj.markMap.Metadata)) || {};
            try{

                if(Metadata.markMapKeys.includes("XML")){
                    info.Root.Metadata = JSON.parse(xml2json(Metadata.streamStr,{
                        compact:true,
                        trim:true,
                    }))
                }
            }catch(e){
                if(Metadata.markMapKeys.includes("FlateDecode")){
                    info.Root.Metadata = Metadata.streamDecode
                }
            }
            /**
             * Pages
             */
            try{
                const Pages:any = this.fileBuffSplitArray.find(e=>e.key === this.getObjName(RootObj.markMap.Pages)) || {};
                info.Root.Pages = Pages.markMap;
                Pages.markMap.Kids.match(/\d{1,}\s\d{1,}\s?R/img).forEach(res=>{
                    const page:any = this.fileBuffSplitArray.find(e=>e.key === this.getObjName(res)) || {};
                    if(page?.markMap?.Resources?.Font){
                        // const pageContent:any = this.fileBuffSplitArray.find(e=>e.key === this.getObjName(page.markMap.Contents)) || {};
                        const Fonts = Object.keys(page.markMap.Resources.Font).map(k=>{
                            return this.fileBuffSplitArray.find(e=>e.key === this.getObjName(page.markMap.Resources.Font[k])) || {}
                        });
                        const ToUnicode = Fonts.map((e:any)=>e.markMap.ToUnicode);
                        const ToUnicodeArr = Object.keys(ToUnicode).map(k=>{
                            return this.fileBuffSplitArray.find(e=>e.key === this.getObjName(ToUnicode[k])) || {}
                        });

                        /**
                         * 字典处理
                         */
                        const txts = ToUnicodeArr
                        .map((e:any)=>{
                            return e.streamDecode.match(/beginbfchar(.|\n)*endbfchar/)[0]
                                .replace(/beginbfchar|endbfchar/img,"")
                                .match(/\w{1,}/img).reduce((previousValue, currentValue, currentIndex, array)=>{
                                    if(currentIndex % 2 && currentValue !== "0000"){
                                        return previousValue.push(unescape(`%u${currentValue}`).toString()) && previousValue;
                                    }else{
                                        return previousValue
                                    }
                                },[])
                        })
                        // 内容
                        const pageContent:any = this.fileBuffSplitArray.find(e=>e.key === this.getObjName(page.markMap.Contents)) || {};
                        const km = txts.reduce((previousValue, currentValue, currentIndex)=>{
                            previousValue[`F${currentIndex+1}`] = currentValue
                            return previousValue;
                        },{})
                        info.content = pageContent.streamDecode.split("/").map(e=>{
                            let k = (/(?:(\w*))/.exec(e) || [])[1];
                            let v = ((e.match(/<\w{1,}>/img) || []).join("").replace(/<|>/img,"").match(/\w{4}/img) || []).map(e=>parseInt(e,16));
                            return {k,v};
                        })
                        .reduce((previousValue, currentValue, currentIndex)=>{
                            if(km[currentValue.k]){
                                currentValue.v.forEach(vv=>{
                                    if(km[currentValue.k][vv-1]){
                                        previousValue += km[currentValue.k][vv-1];
                                    }
                                })
                            }
                            return previousValue;
                        },"")
                    }
                })
            }catch(e){}
            /**
             * Pages
             */
            try{
                const PageLabels :any = this.fileBuffSplitArray.find(e=>e.key === this.getObjName(RootObj.markMap.PageLabels)) || {};
                info.Root.PageLabels  = PageLabels.markMap;
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