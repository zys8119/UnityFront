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
    $mysql?():SqlUtilsOptions;//sql工具
}

export interface SqlUtilsOptions {
    /**
     *
     * @param sqlStr sql字符串
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    query?(sqlStr?:string,showSqlStr?:boolean):Promise<any>;
    /**
     *
     * @param TableFieldName 选择的字段名称
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    select(TableFieldName:string,showSqlStr?:boolean):SqlUtilsOptions;
    /**
     *
     * @param TableName 表名
     * @param showSqlStr  是否输出sql字符串，默认不输出
     */
    from(TableName:string,showSqlStr?:boolean):SqlUtilsOptions;
    /**
     *
     * @param WhereArr 条件数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     * @param type 类型，默认=，精准匹配
     */
    where(WhereArr:object|string,showSqlStr?:boolean,type?:string):SqlUtilsOptions;
    /**
     *
     * @param TabelName 表名
     * @param ArrData 需要写入的数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     * @param insertMore 是否插入多条数据
     * @param indexMore  当前多条索引
     * @param indexMaxMore 总条数
     */
    insert(TabelName:string,ArrData:Array<any>,showSqlStr?:boolean,insertMore?:boolean,indexMore?:number,indexMaxMore?:number):SqlUtilsOptions;
    /**
     *
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    delete(showSqlStr?:boolean):SqlUtilsOptions;
    /**
     *
     * @param TabelName 表名
     * @param newData 新数据
     * @param showSqlStr  是否输出sql字符串，默认不输出
     */
    update(TabelName:string,newData?:object|string|[],showSqlStr?:boolean):SqlUtilsOptions;
    /**
     *
     * @param FieldName 需要排序的字段名
     * @param desc 倒叙或正序
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    asc(FieldName:string,desc?:boolean,showSqlStr?:boolean):SqlUtilsOptions;
    /**
     *
     * @param FieldName 字段名称
     * @param index 需要处理的数量
     * @param desc 倒叙或正序
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    limit(FieldName:string,index:string|number,desc?:boolean,showSqlStr?:boolean):SqlUtilsOptions;
    /**
     *
     * @param WhereArr 模糊查询条件数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    like(WhereArr:object|string,showSqlStr?:boolean):SqlUtilsOptions;
    /**
     *
     * @param data 需要链表的数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    join(data:object|string,showSqlStr?:boolean):SqlUtilsOptions;
}
