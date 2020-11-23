
declare const require:any;
declare const process:process;
declare const Promise:GlobalPromise<any>;
declare const __dirname:string;
declare const module:any;
declare const Buffer:Buffer | any;
declare const exports:any;
declare const T:any;
declare const global:any;

declare module "crypto" {
    namespace crypto {
        interface PlatformCrypto {
            createHash(algorithm:string | object):crypto_createHash_Hash
        }
    }
    const crypto: crypto.PlatformCrypto;
    export = crypto;
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
            existsSync(path:string):boolean;
            readFileSync(path:string,options?:object):any;
            readFileSync(option?:object):any;
            writeFile(file?:string, data?:any, callback?:()=>void|any):any;
            writeFileSync(file?:string, data?:any, options?:any):any;
            mkdir(path?:string, options?:fs_mkdir_options, callback ?:()=>void):any;
            mkdirSync(path?:string, options?:fs_mkdir_options, callback ?:()=>void):any;
            statSync(path?:string):statInterface;
        }
        interface statInterface {
            isFile?():boolean;
            isDirectory?():boolean;
        }
    }
    const fs:fs.PlatformFs;
    export  = fs;
}

declare module "child_process" {
    namespace child_process {
        interface PlatformFs{
            exec(command :string,options ?:object, callback ?:()=>void):any;
            execSync(command :string,options ?:child_process_options, callback ?:()=>void):any;
        }
    }
    const fs:child_process.PlatformFs;
    export  = fs;
}

type Buffer = {
    from?(data:Array<any>| ArrayBuffer | Buffer | object | string):Buffer;
    concat?(data:Array<Buffer>):Buffer;
    length?:number;
}

interface crypto_createHash_Hash{
    update(data:string | Buffer);
    copy(data:string | object);
    digest(data:string);
}

interface fs_mkdir_options {
    recursive?:boolean;
    mode?:string | BigInteger;
}

interface child_process_options {
    cwd?:string; // 子进程的当前工作目录。
    input?:string | ArrayBuffer | MimeTypeArray | DataView; // 该值会作为 stdin 传给衍生的进程。提供此值会覆盖 stdio[0]。
    stdio?:string | Array<any>; // 子进程的 stdio 配置。除非指定了 stdio，否则 stderr 默认会被输出到父进程的 stderr。默认值: 'pipe'。
    env?:object; // 环境变量的键值对。默认值: process.env。
    uid?:number; // 设置进程的用户标识，参见 setuid(2)。
    gid?:number; // 设置进程的群组标识，参见 setgid(2)。
    timeout?:number; // 允许进程运行的最长时间，以毫秒为单位。默认值: undefined。
    killSignal?:string | BigInteger; // 当衍生的进程被杀死时使用的信号值。默认值: 'SIGTERM'。
    maxBuffer?:number; // stdout 或 stderr 上允许的最大数据量（以字节为单位）。 如果超过限制，则子进程会被终止。 参见 maxBuffer 和 Unicode 的注意事项。 默认值: 1024 * 1024。
    encoding?:string; // 用于所有 stdio 输入和输出的字符编码。默认值: 'buffer'。
    windowsHide?:boolean; // 隐藏子进程的控制台窗口（在 Windows 系统上通常会创建）。默认值: false。
    shell?:boolean | string; // 如果为 true，则在 shell 中运行 command。 在 Unix 上使用 '/bin/sh'，在 Windows 上使用 process.env.ComSpec。 可以将不同的 shell 指定为字符串。 参见 shell 的要求和默认的 Windows shell。 默认值: false（没有 shell）
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
    },
    stderr:any;
    platform:string;
}
