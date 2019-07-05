import { headersType } from "./Types"
export interface mysqlOptions {
    host: string;//主机
    user: string;//账号
    password: string;//密码
    port?:string|number;//端口
    database?: string;//数据库名称
}

export interface ServerOptions {
    host?:string|number;//主机
    port?:string|number;//端口
    fsWatch?:Array<ServerOptions_fsWatch>;//监听文件变化，如果该字段不存在就不监听
    RequestStatus:number;//默认请求状态
    headers?:headersType;//header参数
}

export interface ServerOptions_fsWatch {
    path:string;//文件路径或目录
    type:string;//路径类型 =>【directory：目录,file: 文件】
}

export interface ControllerInitDataOptions {
    $_body?:any;//body数据
    $_rawTrailers:[];
    $_headers:headersType;//headers数据
    $_rawHeaders:object;//rawHeaders数据
    $_method:string;//请求方式
    $_url:string;//url
    $_urlParse:object;//格式化url数据
    $_query:object;//query数据
    $_send?(sendData:any):any;//发送数据的方法
    $_RequestStatus:number;// 请求状态设置
    $_RequestHeaders:headersType;//headers头设置
}
