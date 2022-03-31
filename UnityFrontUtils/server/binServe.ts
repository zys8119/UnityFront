import {merge} from "lodash"

const CommandConfig = {
    "-help":{
        message:"帮助",
    },
}



class binServe{
    constructor(private config) {
    }
    getArgvMaps(argv:Array<string>, keys:Array<string>){
        let tmp = [];
        return argv.reduce((a,b)=>{
            if(keys.indexOf(b) > -1){
                tmp = [b];
            }
            if(tmp[0]){
                tmp.push(b);
                a[tmp[0]] = tmp.slice(2);
            }
            return a;
        },{})
    }
    async runArgv (argvMaps:{[key:string]:Array<string>}){
        return Promise.resolve((await Promise.all(Object.keys(argvMaps).map(k=>{
            return new Promise(async resolve=>{
                if(this.config[k]){
                    resolve(this.config[k].process?.call(this, argvMaps[k]))
                }else {
                    resolve(null)
                }
            })
        }))).includes(true))
    }

    async exit(){
        return Promise.resolve(true);
    }

    async create(argv){
        return await this.runArgv(this.getArgvMaps(argv || [],Object.keys(this.config)))
    }
}

export const defineConfigs = (config: {
    [key:string]:Partial<{
        message:string;
        process:(this:binServe, args?:string[])=>any;
    }>
} | any)=>{
    for(let k in config){
        // @ts-ignore
        binServe.prototype[k] = config[k].process;
    }
    return new binServe(merge(CommandConfig, config));
}



