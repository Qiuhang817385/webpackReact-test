![image-20200615134623499](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615134623499.png)



## omit,移除或者忽略接口当中的值

![image-20200615135229154](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615135229154.png)



## 自定义组件的value的代码提示

![image-20200615140105139](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615140105139.png)

```js
 // 如果没有定义这个e,那么onChage的代码提示就没有value属性
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
```





## 把筛选的权利交给用户

1.同步

2.异步

3.查看是否包含某个字段

4.查看对象的某个属性是否包含某个字段

5.对中文的输入做特定的筛选

```js
 fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>
     筛选权利交给用户
```



### demo1

同步查询是否包含字符串

![image-20200615141442992](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615141442992.png)



### demo2

异步

![image-20200615141519374](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615141519374.png)

需要加promise,防抖





![image-20200615142049318](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615142049318.png)

需求,自定义选项

2.键盘事件 esc退出

3.防抖

4.点击外部收起下拉菜单





## 如果出现这个错误，说明需要忽略omit，但是如果不i清楚的状态下，可以点击进去看一看原有的属性

![image-20200615142539590](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615142539590.png)



```js

/**
   * onChange事件
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }
  
  onChange事件
  
```



筛选事件

![image-20200615143509691](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615143509691.png)





## 自定义模板

![image-20200615152439675](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615152439675.png)



展示复杂信息

![image-20200615152928134](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615152928134.png)

![image-20200615152912600](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615152912600.png)





## 返回promise类型

```js
fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>//返回promise类型
```



## 官方接口

![image-20200615153445762](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615153445762.png)





## 异步请求代码

![image-20200615153754512](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615153754512.png)

![image-20200615153803567](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615153803567.png)



## 对loading做处理

![image-20200615154032538](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615154032538.png)





## lodash里面有写好的解决方案

![image-20200615154230922](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615154230922.png)



## 节流的另一种实现方式,之后函数的参数使用值就行了

```js
import { useState, useEffect } from 'react'

function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  // 这个可以啊，利用了第二个参数的特性，这个节流函数利用的是value值的改变，而不是传递进去整个函数，
  // 节流的另一种实现形式，利用参数，但是如果函数不涉及到参数的时候，那么只能使用原始的方法了
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}

export default useDebounce

```



## 解决Bug，当用户输入完，点击select事件之后，默认会改变inputvalue事件，这个时候又会重新调用一次API

解决办法，加一个限制

handleSelect设置成false，不再请求

handelchange设置成true，请求

在useEffect当中准备异步调用一个数据的时候加一个判断

triggerSearch.current

```js
// 异步获取数据
  useEffect(() => {
    // 修复Bug
    if (debouncedValue && triggerSearch.current) {
```





## 点击外部，消失，这个需求挺常见

