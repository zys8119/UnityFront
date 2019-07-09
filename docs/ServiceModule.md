# 目录架构

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

## route配置

> route示例

可以配置应用的全局路由

```typescript
    export default {
        "/":"index/index/index"
    }
```

## 模块配置

模块包含控制器， Controller相关配置如下

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

> Controller示例

在使用控制器时候需要注意一下几点：<br>
1、ControllerClassName必须与控制器的文件名一致，否则报错<br>
2、控制器的公共语法虽然暴露，但在typeScript编译控制器的时候，公共方法会报错.<br>
   那么可以继承底层applicationController控制器类，这样就能通过编译，并且有语法提示。<br>
   当然你不用typescript编译那就另当别论。<br>
3、像方法里面调用的this.$_send();、this.Render();等就是applicationController类暴露出来的<br>
   更多公共方法及参数请参考applicationController类介绍，这里主要介绍以下参数<br>
   this.$_send();//发送数据，一般用于写接口的时候调用，便于前后端分离的开发模式<br>
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

> UnityFront框架的文档介绍

开发文档需要先安装docsify-cli脚手架,具体参考[docsify文档工具](https://docsify.js.org/#/zh-cn/quickstart)

> 全局安装docsify-cli

```blade
 npm i docsify-cli -g
```

> 初始化项目

如果想在项目的 ./docs 目录里写文档，直接通过 init 初始化项目。


```blade
  docsify init ./docs
```

> 本地预览网站

运行一个本地服务器通过 docsify serve 可以方便的预览效果，而且提供 LiveReload 功能，可以让实时的预览。默认访问 http://localhost:3000 。


```blade
  docsify serve doc
```

# Framework模块

这是一个框架资源，跟程序无关，跟项目有关的目录

# public模块

这是一个静态资源目录，该目录完全对外开放，可以直接访问<br>
其中映射了两个url变量
```text
"__STATIC__":"/public/static",
"__PUBLIC__":"/public",
```
更多详情查看服务配置模块

# TaskQueue模块

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

## 配置

### mysqlConfig

> 数据库配置，属于 `mysqlOptions`

#### createPool

* 类型： `object`

* 默认值： `{}`

* 作用：数据库连接池

#### options

> 数据库连接选项，数据 `mysqlOptionsOptions` 更多配置参考[mysql工具](https://www.npmjs.com/package/mysql#connection-options)

##### connectionLimit

* 类型： `number`

* 默认值： `10`

* 作用：每个池的最大连接数

##### host

* 类型： `string`

* 默认值： `localhost`

* 作用：连接主机

##### user

* 类型： `string`

* 默认值： `root`

* 作用：数据库账号

##### password

* 类型： `string`

* 默认值： `root`

* 作用：数据库密码

##### port

* 类型： `string|number`

* 默认值： `3306`

* 作用：端口

##### database

* 类型： `string`

* 默认值： `dome`

* 作用：数据库名称

### ServerConfig

> 底层服务器设置，属于 `ServerOptions`

#### port

* 类型： `string|number`

* 默认值： `8080`

* 作用：端口

#### fsWatch

> 需要监听的文件路径配置，属于 `ServerOptions_fsWatch`

* 类型： `Array<ServerOptions_fsWatch>`

    > ServerOptions_fsWatch
    
    * path: `string`
    * type: `string`

* 默认值： 
```
[
    //listen UnityFrontUtils directory
    {path:path.resolve(__dirname,"../"),type:"directory"},
    //listen application directory
    {path:path.resolve(__dirname,"../../application"),type:"directory"},
]
```

* 作用：文件监听，刷新缓存

#### RequestStatus

* 类型： `number`

* 默认值：`200`

* 作用：默认请求状态

