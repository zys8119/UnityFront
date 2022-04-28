import applicationController from "../../controller/applicationController"
import { ServerConfig } from "../../config"
import { readFileSync, writeFileSync } from "fs"
import { resolve } from "path"
const applicationPath = ServerConfig.Template.applicationPath;

class getFileApi {
    apiObjs:any = [];
    constructor() {
        // 获取api文件目录
        const dirs = applicationController.prototype.readdirSync(applicationPath);
        // 初始化
        this.init(dirs);
        // 返回
        return this.apiObjs;
    }

    /**
     * 递归初始化文件
     * @param dirs 目录文件
     */
    init(dirs){
        dirs.forEach((file:any)=>{
            this.getFileContent(file);
            if(!file.is_file){
                this.init(file.children);
            }
        })
    }

    /**
     * 获取文件
     * @param file 单个文件对象信息
     */
    getFileContent(file){
        try {
            if(/(.|\n)*Controller.ts$/.test(file.name)){
                const fileContent = readFileSync(file.path,"utf8");
                let apiInfoArr = fileContent.match(/^\s{4}\/\*\*(\n|\s|.)*?\*\//img);
                if(apiInfoArr){
                    apiInfoArr = apiInfoArr.map(item=>{
                        let infoStrArr = item.match(/@(.)*/img);
                        return infoStrArr ? this.getApiInfo(infoStrArr) : null;
                    }).filter(e=>e);
                    let controller = file.relative_url+file.name;
                    let {children, ...fileInfo} = file;
                    this.apiObjs.push({
                        ...fileInfo,
                        controller,
                        url:controller.replace(/^\.|\/controller|Controller.ts$/img,""),
                        data:apiInfoArr
                    });
                }
            }
        }catch (e) {}
    }

    /**
     * 获取api文件序列化信息
     * @param infoArr 基础信息
     */
    getApiInfo(infoArr:Array<string>){
        let _unknown = "unknown";
        let info:any = {
            name:_unknown,
            method:_unknown,
            description:_unknown,
            groupName:_unknown,
            body: {},
            params: {},
            query: {},
            route: {},
        };
        infoArr.forEach(item=>{
            [
                {name:"name", type:1},
                {name:"method", type:1},
                {name:"description", type:1},
                {name:"groupName", type:1},
                {name:"body", type:2},
                {name:"params", type:2},
                {name:"query", type:2},
                {name:"route", type:2},
            ].forEach(it=>{
                this.initApiInfoData(it.name, item, info, _unknown, it.type);
            })

        })
        return info;
    }


    /**
     * 初始化api数据
     * @param name
     * @param item
     * @param info
     * @param _unknown
     */
    initApiInfoData(name:string,item:string,info:any, _unknown:string, type:number){
        try {
            if(type === 1 && new RegExp(`^@`+name).test(item)){info[name] = item.replace(new RegExp(`^@`+name+"\\s*"),""); return;}
            if(new RegExp(`^@`+name).test(item)){
                let body = item.replace(new RegExp(`^@`+name+"\\s*"),"");
                let bodyArrInfo = body.split(/\s{1,}/);
                if(bodyArrInfo && bodyArrInfo.length > 0){
                    if(bodyArrInfo[0]){
                        let body = info[name][bodyArrInfo[0]] = {
                            type:_unknown,
                            description:_unknown,
                        }
                        let typeIndex = (<any>bodyArrInfo).findIndex(e=>/^\{(.|\n)*\}$/.test(e));
                        if(typeIndex > -1){
                            body.type = bodyArrInfo[typeIndex];
                            body.description = bodyArrInfo[typeIndex+1] || _unknown;
                        }else {
                            body.description = bodyArrInfo[1] || _unknown;
                        }
                    }
                }
            }
        }catch (e){}
    }
}
writeFileSync(resolve(__dirname,"./config.json"),JSON.stringify(new getFileApi(), null, 4))
