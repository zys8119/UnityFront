declare const require:any;
declare const process:process;
declare const Promise:GlobalPromise<any>;
declare const __dirname:string;
declare const module:any;
declare const Buffer:any;
declare const exports:any;
declare const T:any;
declare const global:any;

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

interface GlobalPromise <T>{
    new <T>(executor1: (resolve: (value?: T) => void, reject: (reason?: T) => void) => void): Promise<any>;
}

interface GlobalPromise <T>{
    resolve(value?:any): Promise<any>;
    reject(value?:any): Promise<any>;
    then<TResult1 = any>(onfulfilled:(value:any)=>TResult1): Promise<any>;
}

interface process{
    arch:string;
    exit(n?:number):void;
    argv:string[];
    argv0:string;
    env:{
        TERM: string;
        SHELL: string;
        USER: string;
        PATH: string;
        PWD: string;
        EDITOR: string;
        SHLVL: string;
        HOME: string;
        LOGNAME: string;
        _: string;
        [key:string]:string
    }
}
