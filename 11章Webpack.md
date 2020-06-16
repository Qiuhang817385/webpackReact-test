模块化历史

模块对外暴露属性和方法

1.全局变量+命名空间

2.commonjs amd,  amd和common在浏览器没办法使用

3.es6



现在的模块就是一组复杂逻辑了



1.的缺点,视频11-1

![image-20200616004511421](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616004511421.png)



## 选择JS模块格式

现在通用的是commonjs或者es6 modules

必须使用打包编译文件来使用



UMD可以在浏览器端之间使用,不需要webpack,React也支持UMD引入cdn

缺点:不支持按需导入

tree shaking 摇树



![image-20200616094803561](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616094803561.png)



![image-20200616094604729](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616094604729.png)

ES优点





![image-20200616095203597](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616095203597.png)

## package.json的main和module字段,规定了入口文件



![image-20200616095327717](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616095327717.png)

也支持

![image-20200616095341388](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616095341388.png)





## antd的做法

![image-20200616095434565](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616095434565.png)





## 进阶

1.改成不从最底层导出,从index导出

这样导入的时候写法

```js
原来
export {default as Button } from './components/Button/button'
现在
export {default as Button } from './components/Button'
```

2.变成对象的形式-->Menu

![image-20200616095855202](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616095855202.png)

![image-20200616095906041](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616095906041.png)

```js
import { FC } from 'react'
import Menu, { MenuProps } from './menu'
import SubMenu, { SubMenuProps } from './subMenu'
import MenuItem, { MenuItemProps } from './menuItem'

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>,
  SubMenu: FC<SubMenuProps>
}
const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu
```

TS配置

![image-20200616100042750](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616100042750.png)



## TS编译配置

```js
{
  "compilerOptions": {
      //输出目录
    "outDir": "dist",
        //es6 modules模式
    "module": "esnext",
        //指定符合的目标es的版本
        //babel可以使用未来js特性
    "target": "es5",
        //三方库都可以获取类型定义,有代码提示和类型检测,为每个js文件生成对应d.ts文件
    "declaration": true,
        //编译出来的文件可以使用react.createElement方法来代替js方法
    "jsx": "react",
        //把绝对路径的解析方式改成node的方式
    "moduleResolution":"Node",
        //默认false,只支持imp * as React from 'react'的方式
        //不支持imp React from 'react'
    "allowSyntheticDefaultImports": true,
  },
      //要编译的文件
  "include": [
    "src"
  ],
      //不能编译的文件,两个*代表任意长度
  "exclude": [
    "src/**/*.test.tsx",
    "src/**/*.stories.tsx",
    "src/setupTests.ts",
  ]
}
```



## //babel可以使用未来js特性

最后编译代码成es5会自动加上polifill,支持最新特性





## 把TS编译成es6modules的文件

![image-20200616100804744](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616100804744.png)





## ts的绝对路径寻找方式和正常的不一样,先找到最根部,再找本文件

![image-20200616100953038](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616100953038.png)





## element引入样式文件,还需要安装东西

![image-20200616101430189](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616101430189.png)





## 使用node-sass

![image-20200616101522058](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616101522058.png)

![image-20200616101627444](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616101627444.png)需要自己手动删除之前的build文件



## 跨平台的删除插件

![image-20200616101729752](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616101729752.png)

![image-20200616101754942](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616101754942.png)

实现了自动删除





## 怎么本地项目A 软连接本地项目B

1.项目B先连接到全局 npm link

2.A连接全局连接B 

![image-20200616102627582](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616102627582.png)



项目B

![image-20200616102932115](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616102932115.png)

配置好入口文件

项目A

在package.json添加一个假的依赖

就是项目B软连接的名字



## 出现react版本的冲突

![image-20200616103318244](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200616103318244.png)



### 使用npm软连接的时候,项目A和项目B都有react的版本,那么就需要在项目B当中的把本身的react版本连接到项目A的版本

这样有问题吧感觉  如果A和B一定要不同版本呢



再publish的时候,彻底解决这个问题



