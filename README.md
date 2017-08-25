# spacex-web-classic

经典web工程脚手架，基于webpack2+实现，可以辅助传统类型的web开发。

## 功能特性：
1. 支持HTML页面组建模块化开发
2. 支持JS语法Standard风格校验，编译报错
3. 支持ES6语法转换
4. 支持Sass样式开发
5. 支持开发热更新
6. 支持部署阶段压缩编译打包
7. 支持图片的合并编译
8. 支持JQuery+Bootstrap框架开发
9. 支持多应用接口管理配置
10. 支持接口数据模拟自定义
11. 支持基于模板的本地/远程接口数据展示

## 目录结构说明：

```
|--doc                      // 脚手架相关文档
|--src                      // 工程开发目录
    |--apis                 // 远程API接口管理目录
       |--index.js          // API接口的应用注册管理，oauth2为api归属应用信息
       |--demo.js           // demo模块的API接口管理，包含test、test2两个接口
    
    |--components           // 公共组件目录
       |--head.html         // html头部组件，具体使用参见 ./src/views/demo/page1.html
       |--header.html       // html公共部分
       
    |--images               // 图片资源
    |--libs                 // 工程用到的公共库目录
        |--bootstrap        // bootstrap库，每个页面已经默认引用
        |--jquery           // jquery库，每个页面默认引用
        
    |--tools                // 工具库, 自定义开发的工具
        |--*                // 包含模板引擎
        
    |--views                // 工程页面开源码目录
        |--demo             // demo模块页面目录
            |--page1.html   // page1功能页面html代码
            |--page1.js     // page1功能页面JS代码，和page1.html必须同时存在
            |--page1.scss   // page1功能页面scss代码，可选，包含使用import，参见page1.js
```


## 开发说明：
第一次需要运行`npm install`,如果使用yarn使用命令`yarn install` 
 
开发运行命令`npm run dev` 如果使用yarn使用命令`yarn run dev`，查看启动日志，一般使用8080端口，如果被占用会一次增加直到端口未被占用，访问url一般是http://localhost:8080  

开发页面参照`./src/views/demo`中page1功能页面。浏览器访问http://localhost:8080/demo/page1.html,当你修改任何代码都会实时失效刷新。也就是热更新

目前页面自动引入jquery+bootstrap, 所以你可以直接使用
开发支持基于handlebars的模版开发
模版代码：
```html
<div id="div_tpl">
    <script id="entry-template" type="text/x-handlebars-template">
        <div class="entry">
            <h1>{{data.title}}</h1>
            <div class="body">
                {{data.body}} ----{{data.name}}
            </div>
        </div>
    </script>
</div>
```
js代码
```javascript
var context = {title: 'My New Post', body: 'This is my first post!'}
$('#div_tpl').tpl('entry-template', context) //tpl就是模版的插件使用 $(el).tpl(tplId, data, callback)
```
支持接口管理
接口应用注册配置`./src/apis/index.js`
```javascript
const apps = {
  // oauth2应用注册配置
  ouath2: {
    name: '鉴权认证应用',
    description: '',
    baseUrl: 'http://127.0.0.1:8080/ouath2'
  }
}
```
api接口管理，接口按照模块管理，每个模块一个接口文件
```javascript
test: {
    path: '/demo.json', // api路径
    app: 'oauth2',      // api归属应用，之前组册配置的
    method: 'get',      // http请求类型 get/post/put/delete
    dataType: 'json',   // 响应数据类型 json/text
    contentType: 'application/json',  // 请求数据类型
    timeout: 2000,      // 超时时间，单位秒，不设置默认由浏览器决定
    mock: {             // 数据模拟
      enable: true,     // 是否使用模拟数据
      data: {           // 模拟数据
        name: 'demo1'
      }
    }
}
```
api接口使用
```javascript
import apis from 'apis'
import demoApi from 'apis/demo'

apis.request(demoApi.test, {}, function (data) {
  console.log(data)
})
```
开发支持基于api的模板数据展示
模版代码：
```html
<div id="div_tpl_api">
    <script id="entry-template_api" type="text/x-handlebars-template">
        <div class="entry">
           {{data.name}}
        </div>
    </script>
</div>
```
js代码
```javascript
import $ from 'jquery'
import apis from 'apis'
import demoApi from 'apis/demo'
import 'tools/template' 

$('#div_tpl_api').apiTpl('entry-template_api', demoApi.test, {}) //tpl就是模版的插件使用 $(el).apiTpl(tplId, api, params, callback)
```


enjoy ur job!



## 部署说明：
部署打包命令`npm run build`, 如果使用yarn使用命令`yarn run build`,如果没有错误，会生成`dist`目录，拷贝此目录部署到nginx或者tomcat或者集成到你其他项目


