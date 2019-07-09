# 目录架构
<hr>

```textmate
-| application--------------------------------应用目录
  -| conf-------------------------------------应用配置
    -| index.ts-------------------------------应用全局配置
    -| route.ts-------------------------------应用全局路由
  //示例：
  -| index------------------------------------应用模块，这只是实力，以真实模块为准
    -| conf-----------------------------------应用配置
      -| index.ts-----------------------------应用全局配置
      -| route.ts-----------------------------应用全局路由
    -| Controller-----------------------------控制器
      -| indexController----------------------index控制器
      ...
  ...
-| docs---------------------------------------文档项目
  ...
-| node_modules
  ...
-| Framework----------------------------------框架资源
  -|lodo_text.png
  -|logo.png
  -|logo.psd
  -|text.png
  -|UnityFront.png
  -|UnityFront.xmind
-| public-------------------------------------服务器资源，该目录全部对外开放
  -| img
  -| static
  ...
-| TaskQueue----------------------------------定时任务队列
  -| Task 
    -| index.ts-------------------------------暴露的任务
    -| log.ts---------------------------------日志定时任务
    ...
  -| index.ts---------------------------------暴露全部任务
-| UnityFrontUtils----------------------------项目底层
  -| config-----------------------------------配置目录
    -| index.ts-------------------------------底层配置
  -| controller-------------------------------控制器处理目录
    -| applicationController.ts---------------控制器应用处理及控制器初始化、初始化数据、控制器公共模块，可扩展server模块
    -| controller.ts--------------------------控制器路由处理
    -| main.ts--------------------------------控制器入口
  -| lib--------------------------------------公共处理模块
    -| formData.ts----------------------------对formData数据处理
  -| mysql------------------------------------数据库模块
    -| index.ts-------------------------------数据库处理
  -| server-----------------------------------服务模块
    -| app.ts---------------------------------服务应用程序入口，文件监听、获取最新数据及响应服务
    -| bodyData.ts----------------------------http请求的body数据处理
    -| fsWatch.ts-----------------------------对指定文件监听处理
    -| index.ts-------------------------------创建定时任务和服务
    -| send.ts--------------------------------对发送数据及控制器数据处理
  -| static-----------------------------------静态模块
    -| index.ts-------------------------------对静态资源的处理
  -| Template---------------------------------项目模板
    -| index.html-----------------------------应用首页模板
    -| TemplateError.html---------------------应用错误模板
  -| typeStript-------------------------------typeStript公共模块
    -| declares.ts----------------------------公共声明
    -| index.ts-------------------------------暴露全部公共模块，便于统一引入使用
    -| interfaces.ts--------------------------公共接口
    -| Types.ts-------------------------------公共类型
  -| utils------------------------------------工具模块
    -| index.ts-------------------------------公共工具，如：获取目录所有文件、替换模板url变量、渲染错误模板、注入控制器类公共的初始数据及方法、路由数组转换、时间格式转化 等工具
-| views--------------------------------------静态模板
    //示例：
    index-------------------------------------对应模块
        index---------------------------------对应控制器
            index.html------------------------对应方法的html静态模板
            index.pug-------------------------对应方法的pug静态模板
    ...
-| .gitignore---------------------------------git忽略文件配置
-| package.json-------------------------------项目配置及依赖
-| README.md----------------------------------项目描述
```

# application模块

<hr>

## - route配置

> route示例

可以配置应用的全局路由

```typescript
    export default {
        "/":"index/index/index"
    }
```

## - 模块配置

模块包含控制器， Controller相关配置如下

### - conf

> route示例

可配置当前控制器的路由，其优先级最高，将覆盖应用的全局路由，但不影响其他模块的控制器

```typescript
    export default {
        "/":"index/index/index"
    }
```

> config示例

可以配置控制器有关模板的参数自定义，如改变渲染模板等

```typescript
    export default {
        Template:{
            ///服务设置Template参数为准
        }
        //其他参数自定义
    }
```
### - Controller

> Controller示例

?> ___在使用控制器时候需要注意一下几点：<br><br>___
【1】、ControllerClassName必须与控制器的文件名一致，否则报错<br><br>
【2】、控制器的公共语法虽然暴露，但在typeScript编译控制器的时候，公共方法会报错.<br>
   那么可以继承底层applicationController控制器类，这样就能通过编译，并且有语法提示。<br>
   当然你不用typescript编译那就另当别论。<br><br>
【3】、像方法里面调用的this.$\_send();、this.Render();等就是applicationController类暴露出来的<br>
   更多公共方法及参数请参考applicationController类介绍，这里主要介绍以下参数<br>
   this.$\_send();//发送数据，一般用于写接口的时候调用，便于前后端分离的开发模式<br>
   this.Render();//渲染静态模板，一般用于传统的嵌入式开发模式

```typescript
export class ControllerClassName extends applicationController{
  constructor(){
      super();
      //....
  }
  
  index(){
      this.$_send();
  }
  
  RenderView(){
      this.Render();
  }
}
```

# docs模块

<hr>

> UnityFront框架的文档介绍

开发文档需要先安装docsify-cli脚手架,具体参考[docsify文档工具](https://docsify.js.org/#/zh-cn/quickstart)

> 全局安装docsify-cli

```bash
 npm i docsify-cli -g
```

> 初始化项目

如果想在项目的 ./docs 目录里写文档，直接通过 init 初始化项目。


```bash
  docsify init ./docs
```

> 本地预览网站

运行一个本地服务器通过 docsify serve 可以方便的预览效果，而且提供 LiveReload 功能，可以让实时的预览。默认访问 http://localhost:3000 。


```bash
  docsify serve docs
```

# Framework模块

<hr>

这是一个框架资源，跟程序无关，跟项目有关的目录

# public模块

<hr>

这是一个静态资源目录，该目录完全对外开放，可以直接访问<br>
其中映射了两个url变量
```javascript
{
    "__STATIC__":"/public/static",
    "__PUBLIC__":"/public",
}

```
更多详情查看服务配置模块

# TaskQueue模块

<hr>

这是一个管理全局定时任务队列目录，例如：定期清除过期日志

> 使用方法

在子目录Task下的index.ts中,暴露指定任务

```typescript
export { LogTask } from "./log";
```

然后创建你的任务log.ts文件,
在log.ts文件内创建基本代码

```typescript
export class LogTask {
    
    constructor(){
        
        //要执行的任务代码
        
    }
    
    //...更多任务方法
}
```

# UnityFrontUtils 项目底层

<hr>

## - 配置

### - mysqlConfig

> 数据库配置，属于 `mysqlOptions`

#### - createPool

* 类型： `object`

* 默认值： `{}`

* 作用：数据库连接池

#### - options

> 数据库连接选项，数据 `mysqlOptionsOptions` 更多配置参考[mysql工具](https://www.npmjs.com/package/mysql#connection-options)

##### - connectionLimit

* 类型： `number`

* 默认值： `10`

* 作用：每个池的最大连接数

##### - host

* 类型： `string`

* 默认值： `localhost`

* 作用：连接主机

##### - user

* 类型： `string`

* 默认值： `root`

* 作用：数据库账号

##### - password

* 类型： `string`

* 默认值： `root`

* 作用：数据库密码

##### - port

* 类型： `string|number`

* 默认值： `3306`

* 作用：端口

##### - database

* 类型： `string`

* 默认值： `dome`

* 作用：数据库名称

### - ServerConfig

> 底层服务器设置，属于 `ServerOptions`

#### - port

* 类型： `string|number`

* 默认值： `8080`

* 作用：端口

#### - fsWatch

> 需要监听的文件路径配置，属于 `ServerOptions_fsWatch`

* 类型： `Array<ServerOptions_fsWatch>`

    > ServerOptions_fsWatch
    
    * path: `string` 文件路径
    * type: `string` 文件类型 =>【directory：目录,file: 文件】

* 默认值： 
```typescript
[
    //listen UnityFrontUtils directory
    {path:path.resolve(__dirname,"../"),type:"directory"},
    //listen application directory
    {path:path.resolve(__dirname,"../../application"),type:"directory"},
]
```

* 作用：文件监听，刷新缓存

#### - RequestStatus

* 类型： `number`

* 默认值：`200`

* 作用：默认请求状态

#### - headers

* 类型： `{[key:string]: string|number }`

* 默认值：

```typescript
{
    'Content-Type': 'text/json; charset=utf-8',
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods':'GET',
    // 'Access-Control-Allow-Headers':'content-type',
    // 'Access-Control-Max-Age':0,//预请求缓存20天
}
```

* 作用：header参数

#### - Template

* 类型： `ServerOptions_Template`

    > ServerOptions_Template
    
    * viewsPath `string` 公共模板路径
    * applicationPath `string` 公共应用路径
    * TemplatePath `string` UnityFront主模板渲染路径
    * TemplateErrorPath `string` 错误模板渲染路径
    * ErrorPathSource `string` 错误来源路径
    * suffix `string` 模板后缀
    * urlVars `object` 模板Url变量

* 默认值：

```typescript
{
    viewsPath:path.resolve(__dirname,"../../views"),
    applicationPath:path.resolve(__dirname,"../../application"),
    TemplatePath:path.resolve(__dirname,"../Template"),
    TemplateErrorPath:path.resolve(__dirname,"../Template/TemplateError.html"),
    ErrorPathSource:path.resolve(__dirname,"../controller/applicationController.js"),
    suffix:".html",
    urlVars:{
        "__STATIC__":"/public/static",
        "__PUBLIC__":"/public",
    }
}
```

* 作用：header参数

#### - TimingTaskQueue

* 类型： `boolean`

* 默认值：`true`

* 作用：是否开启定时任务

### - TimingTaskQueue

> 定时任务设置,属于`TimingTaskQueueOptions`

#### - TaskQueue

* 类型： `function`

* 默认值：

```typescript
TaskQueue:()=>{
        if(Object.prototype.toString.call(TaskQueue) == '[object Array]'){
            TaskQueue.forEach((TaskItem)=>{
                try {
                    if(typeof TaskItem == "function"){
                        new TaskItem();
                    };
                }catch (e) {}
            });
        };
    },
```

* 作用：执行暴露的任务、不推荐修改此配置

#### - TaskQueueTime

* 类型： `number`

* 默认值：`500`

* 作用：定时任务周期时间

#### - LogsRetainTime

* 类型： `number`

* 默认值：`1000*60*60*24*30` 当前默认30天

* 作用：日志保留毫秒时间

#### - isClearLogTime

* 类型： `boolean`

* 默认值：`true`

* 作用：是否开启清除日志任务

#### - ClearLogAppointTime

* 类型： `function?(date?:Date)`

* 默认值：`true`

* 返回值：`number`

* 作用：是否开启指定时间内清除日志任务,返回值应为一个制定的时间戳

#### - ClearLogTimeFrame

* 类型： `number`

* 默认值：`10000` 默认允许指定时间的上下范围20000毫秒

* 作用：可允许清除日志的指定时间的上下浮动范围，这样可以确保任务的执行

## - 控制器

> 控制器模块主要用于应用层的控制器解析及控制器初始化，其中包含以下几个步骤

?> 1、【url解析】：

如果是主入口就走主入口，如果是静态资源就直接返回对应资源,最后再走其他路由处理

?> 2、【其他路由解析】:

其他路由解析包含以下几个环节

_1.根据应用路由及控制器路由重写url，以便解析自定义路由_<br>
_2.真正解析url,其中包括以下几个实现步骤_<br>
* 1）、_判断模块_<br>
* 2）、_判断控制器_<br>
* 3）、_判断控制器类_<br>
* 4）、_判断控制器类方法_<br>
* 5）、_执行控制器方法_<br>

### 值得注意的点
?> 【判断控制器类】<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
先清楚缓存在获取最新控制器<br>
【判断控制器类方法】<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
先给控制器注入控制器类公共的初始数据及方法，再扩展公共数据及方法和写入自定义配置，并扩展属性，然后再实例化控制器，最后再判断方法的存在性和正确性<br>

之所以在实例化前做数据初始化，属性及配置扩展等操作，是因为实例化后就不能写入初始化数据了，将导致每个应用控制器获取不到公共（数据、方法、配置等）参数了。

## mySql数据库操作

> 这是一个mySqlS的二次封装库，便于控制器调用sql，更多用法请参考 `SqlUtilsOptions`,mySql语法请参考[MySql语法](http://c.biancheng.net/view/2548.html)，其中包含以下方法

### query

* 类型： `function`

* 参数：

```typescript
/**
 *
 * @param sqlStr sql字符串
 * @param showSqlStr 是否输出sql字符串，默认不输出
 */
```

* 返回值：`Promise` 执行Sql或的结果

* 作用：执行Sql语句，更多请参考 `SqlUtilsOptions`

* 示例：

```sql
    mySql.query(`SELECT * FROM TABLE_NAME;`);
```

### select

* 类型： `function`

* 参数：

```typescript
/**
     *
     * @param TableFieldName 选择的字段名称
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
```

* 返回值：`上下文` 当前mySql实体类

* 作用：选择表字段，更多请参考 `SqlUtilsOptions`

* 示例：

```sql
    mySql.select("*").from("TABLE_NAME").query();
```

### from

* 类型： `function`

* 参数：

```typescript
/**
     *
     * @param TableName 表名
     * @param showSqlStr  是否输出sql字符串，默认不输出
     */
```

* 返回值：`上下文` 当前mySql实体类

* 作用：选择表，更多请参考 `SqlUtilsOptions`

* 示例：

```sql
    mySql.select("*").from("TABLE_NAME").query();
```

### where

* 类型： `function`

* 参数：

```typescript
/**
     *
     * @param WhereArr 条件数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     * @param type 类型，默认=，精准匹配
     */
```

* 返回值：`上下文` 当前mySql实体类

* 作用：执行条件，更多请参考 `SqlUtilsOptions`

* 示例：

```sql
    mySql.select("*").from("TABLE_NAME").where({
        id:1,
        aa:2,
        ...
    }).query();
```

### insert

* 类型： `function`

* 参数：

```typescript
/**
     *
     * @param TabelName 表名
     * @param ArrData 需要写入的数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     * @param insertMore 是否插入多条数据
     * @param indexMore  当前多条索引
     * @param indexMaxMore 总条数
     */
```

* 返回值：`上下文` 当前mySql实体类

* 作用：插入数据，更多请参考 `SqlUtilsOptions`

* 示例：

```sql
    //单条数据
    mySql.insert(`TABLE_NAME`,{
        id:1,
        aa:2,
        ...
    }).query();
    
    //多条数据
    mySql.insert(`TABLE_NAME`,[
      {
          id:1,
          aa:2,
          ...
      }
      ...
    ],true).query();
```

### delete

* 类型： `function`

* 参数：

```typescript
/**
 *
 * @param showSqlStr 是否输出sql字符串，默认不输出
 */
```

* 返回值：`上下文` 当前mySql实体类

* 作用：删除数据，更多请参考 `SqlUtilsOptions`

* 示例：

```sql
    mySql.delete().from("TABLE_NAME").where({
        id:1,
        aa:2,
        ...
    }).query();
```

### update

* 类型： `function`

* 参数：

```typescript
/**
 *
 * @param TabelName 表名
 * @param newData 新数据
 * @param showSqlStr  是否输出sql字符串，默认不输出
 */
```

* 返回值：`上下文` 当前mySql实体类

* 作用：更新数据，更多请参考 `SqlUtilsOptions`

* 示例：

```sql
    mySql.update("TABLE_NAME",{
        id:1,
        aa:2,
        ...
    }).query();
```

### asc

* 类型： `function`

* 参数：

```typescript
/**
     *
     * @param FieldName 需要排序的字段名
     * @param desc 倒叙或正序
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
```

* 返回值：`上下文` 当前mySql实体类

* 作用：是否倒序查询，更多请参考 `SqlUtilsOptions`

* 示例：

```sql
    mySql.select("*").from("TABLE_NAME").asc("id",true).query();
```

### limit

* 类型： `function`

* 参数：

```typescript
/**
     *
     * @param FieldName 字段名称
     * @param index 需要处理的数量
     * @param desc 倒叙或正序
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
```

* 返回值：`上下文` 当前mySql实体类

* 作用：指定数据的条数，更多请参考 `SqlUtilsOptions`

* 示例：

```sql
    mySql.select("*").from("TABLE_NAME").limit(10).query();
```

### like

* 类型： `function`

* 参数：

```typescript
/**
     *
     * @param WhereArr 模糊查询条件数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
```

* 返回值：`上下文` 当前mySql实体类

* 作用：模糊查询方法，更多请参考 `SqlUtilsOptions`,更多like请参考[通配符like的使用教程详解](https://www.jb51.net/article/139085.htm)

* 示例：

```sql
    mySql.select("*").from("TABLE_NAME").like({
      'Name%':"findName",
      '%Name%':"findName",
      ...
    }).query();
```

### join

* 类型： `function`

* 参数：

```typescript
/**
     *
     * @param data 需要链表的数据
     * @param showSqlStr 是否输出sql字符串，默认不输出
     */
```

* 返回值：`上下文` 当前mySql实体类

* 作用：链表操作，更多请参考 `SqlUtilsOptions`

```sql
    mySql.select().from('TABLE_A a').join({
              'TABLE_B b':"a.id = b.a2",
              'TABLE_c c':"b.id = c.a2",
              ...
      }).where({'a.id':23,'b.id':'c.a2'}).query();
```

## 底层服务

> 这是整个框架的主要服务构建，具体文件含义请参考目录介绍

?> 构建服务架构的主要流程如下：
  * 1、`index.ts` 通过 `TimingTaskQueue` 处理定时任务，根据 `app.ts` 及服务器配置的 `host、port` 等创建好服务
  * 2、`app.ts` 通过 `fsWatch.ts` 注册好文件监听，再通过 `send.ts` 获取最新的服务器内容及数据，并返回数据和相应请求
  * 3、 `send.ts` 通过 `bodyData.ts` 获取请求数据，在通过 `UnityFrontUtils/controller/controller` 去解析（url、模块、控制器、静态模板、静态资源）等处理
  * 4、 controller具体操作请参考【项目底层-控制器】的介绍。
  
# typeStript

<hr>

> 这是公共的typeStript依赖，包含（声明、类型、接口）等

## 接口(interface)

```typescript
import { headersType } from "./Types"

export interface mysqlOptions {
    //连接池
    createPool:object;
    //连接选项
    options:mysqlOptionsOptions
}

export interface mysqlOptionsOptions {
    connectionLimit?:number;//连接数
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
    insert(TabelName:string,ArrData:Array<any>,insertMore?:boolean,showSqlStr?:boolean,indexMore?:number,indexMaxMore?:number):SqlUtilsOptions;
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

```

## 声明(declare)

```typescript
declare const require:any;
declare const process:any;
declare const Promise:any;
declare const __dirname:any;
declare const module:any;
declare const Buffer:any;
declare const exports:any;
declare const T:any;
declare const global:any;
```

## 类型(type)

```typescript
type objectType =  {[key:string]: string|number }
export type headersType =  objectType;
```

