## 相关文档

-   moment(日期时间计算) - [文档](http://momentjs.cn/)
-   odometer(数字动画) - [源码](https://github.com/HubSpot/odometer) -
    [文档](http://github.hubspot.com/odometer/)
-   better-scroll(自定义滚动条) -
    [源码](https://ustbhuangyi.github.io/better-scroll/#/examples/zh) -
    [文档](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans)
-   vue-data-tables(data-tables) -
    [源码](https://github.com/njleonzhang/vue-data-tables) -
    [文档](https://njleonzhang.github.io/vue-data-tables/)
-   vue-cookies(cookies) - [文档](https://www.npmjs.com/package/vue-cookies)
-   code-editor(代码编辑器) -
    [源码](https://github.com/surmon-china/vue-codemirror) -
    [文档](http://codemirror.net/doc/manual.html)
-   quill-editor(富文本编辑) -
    [源码](https://github.com/surmon-china/vue-quill-editor) -
    [文档](https://quilljs.com/docs/quickstart/)
-   draggable(拖拽) - [源码&文档](https://github.com/SortableJS/Vue.Draggable)
-   storage - [源码&文档](https://github.com/ustbhuangyi/storage)
-   vue-router - [文档](https://router.vuejs.org/zh-cn/)
-   sass - [文档](https://www.sass.hk/docs/)
-   lodash - [文档](https://lodash.com/docs/4.17.10)
-   常用 css3 动画 - [文档](https://daneden.github.io/animate.css/)
-   淘宝 npm 镜像 - [教程](https://npm.taobao.org/)
-   图标 - [中文文档](http://fontawesome.dashgame.com) -
    [英文文档](https://fortawesome.com)
-   组件库(Element) -
    [文档](http://element-cn.eleme.io/#/zh-CN/component/quickstart)
-   ES6 - [教程](http://es6.ruanyifeng.com/)
-   vue - [教程](https://cn.vuejs.org/v2/guide/) -
    [文档](https://cn.vuejs.org/v2/api/)
-   vuex - [教程及文档](https://vuex.vuejs.org/zh-cn/)
-   axios - [集成后的文档](https://axios.nuxtjs.org/)
-   不支持低版本 node,可安装 node 多版本管理工具 -
    [windows 通过 nvm 管理多个 node 版本](https://github.com/coreybutler/nvm-windows) -
    [mac 通过 n 管理多个 node 版本](https://www.npmjs.com/package/n)
-   nuxt(vue 的 ssr 框架) - [中文文档](https://zh.nuxtjs.org/guide) -
    [英文文档(最新版文档)](https://nuxtjs.org/guide)
-   mock(模拟数据) - [文档](https://github.com/nuysoft/Mock/wiki) -
    [示例](http://mockjs.com/examples.html)
-   vue-i18n(国际化) - [文档](http://kazupon.github.io/vue-i18n/) -
    [源码地址](https://github.com/kazupon/vue-i18n)
-   vue-echarts(图表) -
    [文档](https://github.com/ecomfe/vue-echarts/blob/master/README.zh_CN.md) -
    [ehcarts 文档](http://echarts.baidu.com/)

## 项目构建

-   安装最新稳定版 node（当前使用的 8.10.0）
    `bash # windows $ nvm install 8.10.0 $ nvm use 8.10.0 # mac $ n use 8.10.0 $ n`

-   安装依赖 `bash $ npm install`

-   开发时的热加载服务开启([运行地址](http://localhost:5211))
    `bash $ npm run dev`

-   构建生产版本 `bash $ npm run build`

-   生产版本的服务开启 `bash $ npm start`

-   生成静态文件项目 `bash $ npm run generate`

## 目录结构

-   \_old_hrssc `老系统` - \_auto `老系统前端工程化相关`
-   .nuxt `编译及打包生成的代码`
-   assets `未编译的静态资源如 LESS、SASS 或 JavaScript。` - image - scss -
    pages `页面级样式` - var `变量` - vendor `第三方公共样式` - animate `动画` -
    element `element UI框架` - font `font-awesome字体样式` - normalize
    `浏览器特异性重置` - element_reset.scss `element UI框架样式覆写` -
    element_var.scss `element样式变量` - vendor.scss `第三方入口样式` -
    base.scss `通用入口样式`
-   components `应用的 Vue.js 组件`
-   layouts `应用的布局组件`
-   locales `多语言`
-   middleware `中间件`
-   auth `权限控制`
-   mock `模拟数据`
-   pages `路由及页面`
-   plugins `需要在根vue.js应用实例化之前运行的js插件` - axios.js `ajax` -
    code-editor.js `代码编辑器` - context-menu.js `右键菜单` - cookies.js
    `cookies插件` - echarts.js `图表` - element-ui.js `UI框架` - i18n.js
    `多语言` - lodash.js `数据操作处理` - polyfill.js `高级js补丁` -
    rich-editor.js `富文本编辑` - storage.js `storage插件`
-   server `服务端` - apiRoutes.js `mock目录解析` - index.js `入口程序`
-   static `静态文件` - fonts `字体文件和` - img `图片` - style `样式`
-   store `vuex状态树`
-   util `相关工具型js`
-   nuxt.config.js `nuxt.js的个性化配置文件`
-   package.json `应用的依赖关系和对外暴露的脚本接口`
