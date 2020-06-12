![image-20200609210251129](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200609210251129.png)



![image-20200609210332632](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200609210332632.png)



## 知识点

![image-20200609210611614](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200609210611614.png)





## npx

下载包到一个临时目录然后删除

![image-20200610195022781](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200610195022781.png)



比如mocha，依赖在package，json当中，没有全局安装



怎么调用mocha命令

1.npm run test  --》mocha命令

2.进入到node_modules/.bin/mocha 目录 --version

3.**使用npx直接运行** npx mocha --version 

npm会把当前下载的所有的包，下面的bin目录加入环境变量

这也是process.env的来历





## 解决的痛点

![image-20200610205617092](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200610205617092.png)

![image-20200610205711355](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200610205711355.png)



## 副作用

网络请求，dom操作，订阅数据来源



## effect的执行顺序

![image-20200610211744839](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200610211744839.png)

```js
 // 执行时机，当前effect执行之前，和上一个effect之间
```



## hoc

![image-20200610222016382](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200610222016382.png)



## useRef

修改ref 不会引发render函数



## 写组件库注意点

1.代码结构

JS+样式文件

2.样式解决方案

3.组件需求分析和编码

4.组件测试用例分析和编码

5.代码打包输出和发布

6.CICD，文档生成

## 样式解决方案

全局变量，依赖，可重用性，扩展性

第一个就是行内

<img src="C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200611185417749.png" alt="image-20200611185417749" style="zoom:50%;" />

css-in-js，增加了成本和复杂性

style-component

![image-20200611185308397](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200611185308397.png)



## 色系

中性色板一般是黑白灰，可以提升阅读体验

![image-20200611185930008](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200611185930008.png)

品牌色，产品第一印象，2个颜色，primary+second

功能色，明确的信息和状态，出错，成功，失败

### bootstrap

![image-20200611190151889](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200611190151889.png)

### 当前项目

![image-20200611190213401](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200611190213401.png)

## 样式变量

![image-20200611212214308](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200611212214308.png)

```js

// darken 内置函数，字体变暗
$link-hover-color: darken($link-color, 15%) !default;
                          
```



```js
normalize.css
1.保护浏览器默认样式
2.为大部分html元素提供一般化样式
3.修复浏览器自身bug，保持浏览器一致性
4.优化css可用性
5.文档比较详尽
```



normalize.css



## 在scss当中，下划线开头的是partials,告诉scss不要编译到css文件，但是导入的时候还是OK的

![image-20200611214304736](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200611214304736.png)

这样的文件只能被导入，不能进行编译