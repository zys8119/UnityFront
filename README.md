# UnityFront

这是一个基于node开发的服务框架，纯前端可视化项目，支持pug前端模板引

# 依赖项

> node 当前依赖【v11.12.0】，其他暂未自测

# 简单教程

## 目录说明

> 以下目录，新手建议只前期只需要关注Admin、application、conf、public、UnityFrontUtils->config 等项目即可

```
Admin  后台管理界面vue2.0项目
application 后端应用
    |_ AuthorityManagement
    |_ conf 模块配置，系统暂用，不建议生成该模块
    |_ route 模块配置，系统暂用，不建议生成该模块
    |_ Doc
    |_ Dome 项目模块目录
        |_ conf 控制器配置，系统暂用，不建议生成该模块
        |_ route 控制器配置，系统暂用，不建议生成该模块
        |_ controller 项目控制器目录
            |_ ****Controller.ts  控制器
    |_ Upload
    |_ User
    // ... 更多模块
conf 项目全局配置
    |_ PublicController.ts 拦截器及全局公共方法注入
    |_ StatusCode.ts 全局状态码设置
    |_ Whitelist.ts 相关白名单配置
Framework 项目附件，可忽略
model 数据库数据模型
node_modules 项目依赖
public 项目公共开放目录，无拦截，资源直接访问，路径以 ‘/public/***/**’ 访问
README 项目描述
TaskQueue 项目任务处理，任务队列，默认开启日志服务
UnityFrontUtils 后端项目底层，按需了解或二次开发
    |_ config 项目底层配置
views 控制器Reader渲染视图目录，结构同后端应用
webSocket webSocket目录
.gitignore git忽略配置
package.json
README.md
tsconfig.json ts编译配置
yarn.lock
```

# [更多教程](https://zys8119.github.io/UnityFront/#/ServiceModule)

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

# 参考文档

[MySql语法](http://c.biancheng.net/view/2548.html)

[mysql工具](https://www.npmjs.com/package/mysql#connection-options)

[pug模板语言](https://pugjs.org/api/getting-started.html)

[docsify文档工具](https://docsify.js.org/#/zh-cn/quickstart)

## 端口占用查看

```bash
    netstat -ano | findstr 81
    
    tasklist|findstr 82
```

## 技术支持

<a href="https://www.jetbrains.com/?from=UnityFront"><img width="120" src="./README/jetbrains/jetbrains.png"></a>
<a href="https://nodejs.org/?from=UnityFront"><img width="120" src="https://nodejs.org/static/images/logo.svg"></a>