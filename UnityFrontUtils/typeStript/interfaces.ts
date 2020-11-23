import { headersType } from "./Types"
import { AxiosStatic } from "axios"
import {SqlModel} from "../../model/interfaces";
import Utils from "../utils";

export interface mysqlOptions {
    //连接池
    createPool:object;
    //连接选项
    options:mysqlOptionsOptions
    //是否自动创建model
    sqlModelAuto:boolean
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
    ws_port?:string|number;//webSocket 端口,如果不存在就不创建
    ws_user?:{[key:string]:any};//webSocket 用户链接池
    debug?:boolean;//是否开启调试
    CORS?:boolean;//是否允许跨域，全局CORS
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
    applicationPath?:string;//应用目录路径
    publicPath?:string;//应用公共目录路径
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

export interface webSocketApp {
    new (data:webSocketAppData):void
}

export interface webSocketAppData {
    toSocket?:any;// 链接对象
    socket?:any;// 链接对象socket
    write?(any:string):any;// 返回数据
    data?:any;// 数据
    requestData?:any;// 请求数
    headers?:any;// 请求头
}

export type getPagePageConfigType  = {
    select?:string;// 选择字段
    TableName?:string;// 表名称
    pageNo?:number;// 当前页数
    pageSize?:number;// 每页数量
    search?:any;// 模糊搜索字段
    like?:getPagePageConfigTypeLike;// 模糊搜索字段配置
}

export type getPagePageConfigTypeLike = {
    // 需要被模糊查询的字段，值为true时被查询
    [key:string]:boolean;
}

export interface SqlUtilsOptions {
    sqlFormat?(sqlArr,type:string ,join?:string):string;
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
    select?(TableFieldName?:string,showSqlStr?:boolean):SqlUtilsOptions;

    /**
     * @param condition 条件
     */
    count?(condition?:any):SqlUtilsOptions;

    /**
     * @param pageNo 页数
     * @param pageSize 每页数量
     */
    pagination?(pageNo:number,pageSize?:number):SqlUtilsOptions;

    /**
     * @param pageConfig 分页配置
     * @param concatCallBack 连接回调，上下文为SqlUtilsOptions
     * @param concatCallBackBefore 连接回调，上下文为SqlUtilsOptions
     */
    getPage?(pageConfig?:getPagePageConfigType,concatCallBack?:(this:SqlUtilsOptions,bool?:boolean)=>void,concatCallBackBefore?:(this:SqlUtilsOptions,bool?:boolean)=>void):Promise<any>;

    /**
     *
     * @param TableName 表名
     * @param showSqlStr  是否输出sql字符串，默认不输出
     */
    from?(TableName?:string,showSqlStr?:boolean):SqlUtilsOptions;
    /**
     *
     * @param WhereArr 条件数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     * @param type 类型，默认=，精准匹配
     */
    where?(WhereArr:object|string,showSqlStr?:boolean,type?:string):SqlUtilsOptions;

    /**
     * OR 语句
     * @constructor
     */
    OR?():SqlUtilsOptions;

    /**
     * AND 语句
     * @constructor
     */
    AND?():SqlUtilsOptions;

    /**
     *
     * @param WhereArr 条件数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     * @param type 类型，默认=，精准匹配
     * @param join 类型，默认AND，链接符号
     */
    concat?(WhereArr:((this:SqlUtilsOptions)=>void)|object|string,type?:string,join?:string):SqlUtilsOptions;

    /**
     * 显示sql
     */
    show?():SqlUtilsOptions;
    /**
     *
     * @param TabelName 表名
     * @param ArrData 需要写入的数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     * @param insertMore 是否插入多条数据
     * @param indexMore  当前多条索引
     * @param indexMaxMore 总条数
     */
    insert?(TabelName?:string|Array<any>|object,ArrData?:Array<any>|object,insertMore?:boolean,showSqlStr?:boolean,indexMore?:number,indexMaxMore?:number):SqlUtilsOptions;
    /**
     *
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    delete?(showSqlStr?:boolean):SqlUtilsOptions;
    /**
     *
     * @param TabelName 表名
     * @param newData 新数据
     * @param showSqlStr  是否输出sql字符串，默认不输出
     */
    update?(TabelName?:string|object|string|[],newData?:object|string|[],showSqlStr?:boolean):SqlUtilsOptions;
    /**
     *
     * @param FieldName 需要排序的字段名
     * @param desc 倒叙或正序
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    asc?(FieldName:string,desc?:boolean,showSqlStr?:boolean):SqlUtilsOptions;
    /**
     *
     * @param FieldName 字段名称
     * @param index 需要处理的数量
     * @param desc 倒叙或正序
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    limit?(FieldName:string,index:string|number,desc?:boolean,showSqlStr?:boolean):SqlUtilsOptions;
    /**
     *
     * @param WhereArr 模糊查询条件数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    like?(WhereArr:object|string,showSqlStr?:boolean):SqlUtilsOptions;
    /**
     *
     * @param data 需要链表的数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
    join?(data:object|string,showSqlStr?:boolean):SqlUtilsOptions;
}

export interface ControllerInitDataOptions {
    [key:string]:any;
    request?:any;//请求体
    response?:any;//返回体
    $_body?:any;//body数据
    $_bodySource?:any;//body数据源，返回未node的Buffer缓冲器对象
    $_rawTrailers?:[];
    $_headers?:headersType;//headers数据
    $_rawHeaders?:any;//rawHeaders数据
    $_method?:string;//请求方式
    $_url?:string;//url
    $_urlParse?:any;//格式化url数据
    $_query?:any;//query数据
    $_send?(sendData:any):any;//发送数据的方法
    $_RequestStatus?:number;// 请求状态设置
    $_RequestHeaders?:headersType;//headers头设置
    $mysql?(optionsConfig?:object,isEnd?:boolean):SqlUtilsOptions;//sql工具
    $sqlModel?:SqlModel;//sql模型
    __dir?:string;//当前控制器位置
    $_params?:any;//url Params 数据
    $methodName?:string;//当前控制器执行的方法名称
    $urlArrs?:any[];//控制器url数组
    $ControllerConfig?:any;//控制器配置
    StatusCode?:StatusCodeOptions;//公共状态码定义
    $_axios?:AxiosStatic;//axios请求工具
    $_cookies?:object|null;//cookies
    setHeaders?(Headers:headersType):void;//设置返回头
    setRequestStatus?(Status:number):void;// 设置http 状态码
    Interceptor?():Promise<any>;// 全局拦截器
    /**
     * $mysql实例化
     * @param optionsConfig 数据库配置
     * @param isEnd 执行完是否放开数据库连接
     * @constructor
     */
    DB?(optionsConfig?:mysqlOptionsOptions,isEnd?:boolean):SqlUtilsOptions;// $mysql实例化
    /**
     * 渲染模板
     * @param TemplatePath 模板路径
     * @param TemplateData 模板数据
     * @param bool 是否为主控制器渲染
     * @constructor
     */
    Render?(TemplatePath?:any,TemplateData?:object,bool?:boolean):void;// 渲染模板
    /**
     * UrlParams解析
     * @param $$url 请求路径
     * @param urlArrs url数组
     * @param paramsKeyArr UrlParams数据
     * @param isApp 是否为app配置
     * @param $moduleRouteConfig 对应配置数据
     * @param confPath 配置路径
     * @constructor
     */
    UrlParams?<T = string,TT = string[]>($$url:T,urlArrs:TT,paramsKeyArr:{[key:string]:any}, isApp:boolean, $moduleRouteConfig:any,confPath:string):{
        $$url:T;
        urlArrs:TT;
    };// UrlParams解析
    /**
     * 控制器及url解析
     * @constructor
     */
    UrlParse?(TemplatePath?:any,TemplateData?:object,bool?:boolean):void;// 控制器及url解析


    /**
     * 创建日志文件
     * @param args 日志数据
     * @param logFileName 日志文件名称
     */
    $_createLog?(args?:any,logFileName?:string):void;// 创建日志文件

    /**
     * 日志输出
     * @param args 输出的参数数据
     */
    $_log?(...argArray: any[]):void;// 日志输出

    /**
     * 写入日志
     * @param args 输出的参数数据
     * @param logPath 日志路径
     * @param oldData 旧日志数据
     */
    writeLogFile?(args,logPath:string,oldData?:string):void;// 写入日志

    /**
     * 公共函数日志回调
     * @param data 回调数据
     */
    $_public_success_log_callback?(data:$_public_success_log_callback_Data):void;// 成功返回工具

    /**
     * 成功返回工具
     * @param msg 提示信息
     * @param sendData 发送数据
     * @param code 状态码
     * @param error 是否为错误消息
     */
    $_success?(msg?:any,sendData?:any,code?:number, error?:boolean):void;// 成功返回工具

    /**
     * 错误返回工具
     * @param msg 提示信息
     * @param sendData 发送数据
     * @param code 状态码
     */
    $_error?(msg?:any,sendData?:any,code?:number):void;// 错误返回工具
    /**
     * puppeteer 爬虫
     * @param url
     * @param jsContent
     * @return Promise
     * //=============示例========================
     this.puppeteer('http://www.baidu.com',()=>new Promise((resolve, reject) => {
            ///可执行上下文
            resolve([]);
        })).then(res=>{
            this.$_success(res);
        }).catch(err=>{
            this.$_error(err);
        })
     *
     */
    $_puppeteer?(url:string,jsContent:any):Promise<any>; // 谷歌爬虫
    /**
     * 获取文件流
     * @param fileUrl {string} 文件路径
     * @param callBcak {function} 成功片段回调
     * @param callBackEnd {function} 片段接收结束回调
     * @return then 返回文件流，catch 失败回调
     */
    $_getFileContent?(fileUrl:string, callBcak?:any , callBackEnd?:any):Promise<any>; // 获取文件流
    /**
     * 文件流下载
     * @param fileUrl {string} 文件路径
     * @param filename {string} 下载的文件名称
     * @param download {boolean} 是否下载，默认true下载
     * @param callBcak {function} 成功片段回调
     * @return then 返回文件流，catch 失败回调
     */
    $_fileStreamDownload?(fileUrl:string, filename:string, download:boolean, callBcak?:any):Promise<any>; // 文件流下载
    /**
     * 加密
     * @param data 需要加密的数据
     * @param newKey 当前密钥, 默认使用全局密码
     * @return string 返回密文
     */
    $_encode?(data:any, newKey?:string):string|boolean; // 加密
    /**
     * 解密
     * @param str 需要解密的数据
     * @param newKey 当前密钥，默认使用全局密码
     * @return string 返回明文
     */
    $_decode?(str:string, newKey?:string):any; // 解密
    /**
     * 创建随机密钥
     * @param keyDataArr 剩余密钥
     * @param result 上一段密钥
     * @return result 最终密钥
     */
    $_createEncryptKey?(keyDataArr?:string[], result?:string):string; // 创建随机密钥
    /**
     * 创建随机svg验证码
     * @param options {object} 配置
     */
    $_getSvgCode?(options?:getSvgCodeOptions):Promise<string>; // 创建随机svg验证码
    /**
     * 数据转url参数
     * @param options {object} 数据
     * @param connectors {string} 连接符号 例如 '='
     * @param type {string} 分割符号 例如 '&'
     * @return {string} 例如{a:1,b:2} => "a=1&b=2"
     */
    $_getUrlQueryData?(options?:object, connectors?:string, type?:string):string; // 数据转url参数
    /**
     * 设置cookie
     * @param data {object} 需要设置的数据
     */
    $_setCookie?(data?:object):void; // 设置cookie
    /**
     * 获取FormData及上传的文件
     */
    $_getRequestFormData?():Promise<RequestFormData>; // 获取上传文件

    /**
     * Buffer分割，类似字符串的split方法
     * @param buff
     * @param splitter
     */
    //@ts-ignore
    bufferSplit?(buff:Buffer,splitter:string):Buffer[];

    /**
     * 读取目录
     * @param path
     */
    readdirSync?(path:string):Promise<any>;

    /**
     * MD5加密
     * @param str
     */
    $MD5?(str:string):string;

    /**
     * 数组转树形结构
     * @param sourceData 数据
     * @param opstions 配置
     */
    toTree?(sourceData:Array<any>, opstions?:object):Array<any>;
}

export interface RequestFormData {
    type?:string | "file" | "data"; // 文件数据
    keyName?:string; // 数据字段
    keyValue?:string; // 数据值,type = data 时生效
    fileType?:string; // 文件Content-Type,type = file 时生效
    fileName?:string; // 文件名称,type = file 时生效
    fileBuff?:string; // 文件数据,buff类型,type = file 时生效
    [keyName:string]:any;
}

export interface TemplateErrorDataOptions {
    title?:string;//错误标题
    error?:object;//错误详情
    interceptorErr?:object;//拦截器错误详情
}

export interface TimingTaskQueueOptions {
    TaskQueue?():any;//任务队列
    TaskQueueTime?:number;//定时任务周期时间
    LogsRetainTime?:number;//日志保留毫秒时间
    isClearLogTime?:boolean;//是否开启清除日志任务
    ClearLogAppointTime?:any;//是否开启指定时间内清除日志任务,返回值应为一个制定的时间戳
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

export interface UtilsOptions {
    [propName:string]:any;
    /**
     * 获取目录所有文件
     * @param fileDirPath
     * @param callback
     */
    getJsonFiles?(fileDirPath:string,callback?:Function):any[];

    /**
     * 替换模板url变量
     * @param ServerConfig 服务配置
     * @param data 模板内容
     * @param TemplateData 模板苏剧
     * @param space 数据格式化缩进数量
     */
    replaceUrlVars?(ServerConfig,data,TemplateData?:object,space?:number):any;

    /**
     * 渲染错误模板
     * @param filPath 错误模板路径
     * @param TemplateData 错误模板数据
     * @param $_send 发送方法
     * @constructor
     */
    RenderTemplateError?(filePath:string,TemplateData:TemplateErrorDataOptions):void;
    /**
     * 注入控制器类公共的初始数据及方法,this上下文为当前控制器解析实体
     * @param ControllerInitData 控制器数据
     * @param ControllerClassObj 控制器实体
     * @param $methodName 当前执行的控制器方法名称
     * @param ServerConfig 服务配置
     * @param __dir 当前执行的控制器路径
     * @param bool 是否是其他控制器渲染
     * @constructor
     */
    ControllerInitData?(ControllerInitData,ControllerClassObj,$methodName,ServerConfig,__dir,bool:boolean):void;
    /**
     * 路由数组转换
     * @param $$url 需要转换的url字符串
     */
    getUrlArrs?($$url:string):any[];
    /**
     * 时间格式转化
     * @param newDate {string | Date} 时间数据
     * @param Format {string} 时间格式 例如："YYYY-MM-DD HH:mm:ss week sc"
     */
    dateFormat?(newDate?:any,Format?:string):string;

    /**
     * 得到一个两数之间的随机整数，包括两个数在内
     */
    getRandomIntInclusive(min:number, max:number):number;

    /**
     * 获取Cookies
     * @param request
     */
    getCookies(request):object|null;
}

export interface encryptOptions {
    // 当前密钥
    key:string;
    // 加密计算
    encodeItem?(id:number):string;
    // 解密计算
    decodeItem?(str:string):number;
    // 加密
    /**
     * @param data 需要加密的数据
     */
    encode?(data:any):string;
    // 解密
    /**
     *
     * @param str 需要解密的密文
     */
    decode?(str:string):any;
    /**
     * @ws 服务
     * 解密接收数据
     * @param data
     */
    decodeWsFrame?(data:any):object
    /**
     *  @ws 服务
     * 加密接收数据
     * @param data
     */
    encodeWsFrame?(data:any):string[]
    /**
     *  @ws 服务
     * 反序列化header
     * @param str
     */
    parseHeader?(str:string):object
}

export interface ServerPublicConfigOptions {
    // 公共密钥,更换密钥可以使用控制器方法$_createEncryptKey获取随机密钥
    createEncryptKey:string|null;
}

export interface getSvgCodeOptions {
    fontSize?:number;// 字体大小，默认50
    index?:number;// 验证码长度，默认4
    background?:null|string;// 背景颜色
    color?:null|string;// 字体颜色，默认为多彩
    cb?(this:ControllerInitDataOptions,code:string):void;// 回调
    headers?(this:ControllerInitDataOptions,code:string):void;// headers返回头
}

export interface $_public_success_log_callback_Data {
    log_time:string;// 日志时间
    user_id:string;// 用户id
    user_token:string;// 用户token
    url:string;// 客户端页面地址
    api_url:string;// api接口地址
    $_method:string;// 接口请求方式
    controller:string;// 当前所属控制器
    $methodName:string;// 当前控制器方法
    data:$_public_success_log_callback_Data_data;// 当前请求携带的数据数据
    newSendData:any; // 响应数据
}

export interface $_public_success_log_callback_Data_data {
    $_body:any;// body 数据
    $_query:any;// query 数据
    $_params:any;// url变量params数据
}
