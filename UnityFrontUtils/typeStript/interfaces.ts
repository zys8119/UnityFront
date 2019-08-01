import { headersType } from "./Types"

export interface mysqlOptions {
    //连接池
    createPool:object;
    //连接选项
    options:mysqlOptionsOptions
}

export interface mysqlOptionsOptions {
    connectionLimit?:number;//连接数
    host?: string;//主机
    user?: string;//账号
    password?: string;//密码
    port?:string|number;//端口
    database?: string;//数据库名称
    multipleStatements?: boolean;//是否允许执行多语句，出于安全原因，默认禁用对多个语句的支持
    prefix?:string;//数据库表前缀
    [propName:string]:any;
}

export interface ServerOptions {
    host?:string|number;//主机
    port?:string|number;//端口
    fsWatch?:Array<ServerOptions_fsWatch>;//监听文件变化，如果该字段不存在就不监听
    RequestStatus:number;//默认请求状态
    headers?:headersType;//header参数
    Template?:ServerOptions_Template;//模板相关配置
    TimingTaskQueue?:boolean;//是否开启定时任务
}

export interface ServerOptions_fsWatch {
    path:string;//文件路径或目录
    type:string;//路径类型 =>【directory：目录,file: 文件】
}

export interface ServerOptions_Template {
    viewsPath?:string;//公共模板路径
    applicationPath?:string;//公共应用路径
    TemplatePath?:string;//UnityFront主模板渲染路径
    TemplateErrorPath?:string;//错误模板渲染路径
    ErrorPathSource?:string;//错误来源路径
    suffix?:string;//模板后缀
    urlVars?:object;//模板Url变量
}

export interface SendDataOptions {
    data?:any;//发送的数据
    headers?:headersType;//发送的请求头
    RequestStatus?:number;//请求的状态码
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
    select(TableFieldName?:string,showSqlStr?:boolean):SqlUtilsOptions;
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
    insert(TabelName:string,ArrData:Array<any>|Object,insertMore?:boolean,showSqlStr?:boolean,indexMore?:number,indexMaxMore?:number):SqlUtilsOptions;
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

export interface ControllerInitDataOptions {
    $_body?:any;//body数据
    $_rawTrailers?:[];
    $_headers?:headersType;//headers数据
    $_rawHeaders?:object;//rawHeaders数据
    $_method?:string;//请求方式
    $_url?:string;//url
    $_urlParse?:object;//格式化url数据
    $_query?:object;//query数据
    $_send?(sendData:any):any;//发送数据的方法
    $_RequestStatus?:number;// 请求状态设置
    $_RequestHeaders?:headersType;//headers头设置
    $mysql?(optionsConfig?:object,isEnd?:boolean):SqlUtilsOptions;//sql工具
    __dir?:string;//当前控制器位置
    $methodName?:string;//当前控制器执行的方法名称
    $urlArrs?:any[];//控制器url数组
    $ControllerConfig?:object;//控制器配置
    StatusCode?:StatusCodeOptions;//公共状态码定义
}

export interface TemplateErrorDataOptions {
    title?:string;//错误标题
    error?:object;//错误详情
}

export interface TimingTaskQueueOptions {
    TaskQueue?():any;//任务队列
    TaskQueueTime?:number;//定时任务周期时间
    LogsRetainTime?:number;//日志保留毫秒时间
    isClearLogTime?:boolean;//是否开启清除日志任务
    ClearLogAppointTime?(date?:Date):number;//是否开启指定时间内清除日志任务,返回值应为一个制定的时间戳
    ClearLogTimeFrame?:number;//可允许清除日志的指定时间的上下浮动范围，这样可以确保任务的执行
}

export interface SuccessSendDataOptions {
    code?:number;//状态码
    msg?:string;//信息
    data?:any;//数据
}

export interface StatusCodeOptions {
    [propName:string]:StatusCodeOptions_format
}

export interface StatusCodeOptions_format{
    code?:number;//状态码
    msg?:string;//状态码描述
}
