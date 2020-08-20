interface GlobalPromise <T>{
    new <T>(executor1: (resolve: (value?: T) => void, reject: (reason?: T) => void) => void): Promise<any>;
}

interface GlobalPromise <T>{
    resolve(value?:any): Promise<any>;
    reject(value?:any): Promise<any>;
    then<TResult1 = any>(onfulfilled:(value:any)=>TResult1): Promise<any>;
}

declare module "path" {
    namespace path {
        interface PlatformPath {
            resolve(...pathSegments: string[]): string;
        }
    }
    const path: path.PlatformPath;
    export = path;
}

declare module "fs" {
    namespace fs {
        interface PlatformFs{
            readdirSync(path:string):string[];
            existsSync(path:string):number;
        }
    }
    const fs:fs.PlatformFs;
    export  = fs;
}

declare const require:any;
declare const process:any;
declare const Promise:GlobalPromise<any>;
declare const __dirname:string;
declare const module:any;
declare const Buffer:any;
declare const exports:any;
declare const T:any;
declare const global:any;
