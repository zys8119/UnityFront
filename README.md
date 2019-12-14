# UnityFront

这是一个基于node开发的服务框架，纯前端可视化项目，支持pug前端模板引

# 依赖项

> node 当前依赖【v11.12.0】，其他暂未自测

# 查看文档教程

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


# 技巧

【puppeteer 之爬虫】

> 安装依赖 `npm i puppeteer`

```typescript
const puppeteer = require('puppeteer');
puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('http://www.weather.com.cn/weather1d/101210401.shtml');
  const resultHandle = await page.evaluateHandle(
    js=>js,
    await new Promise((resolve, reject) => {
    ///todo 可执行的js
    })
  );
  const result = await resultHandle.jsonValue();
  await browser.close();
  this.$_success(result);
}).catch(err=>{
  this.$_error(err.message)
});
```
