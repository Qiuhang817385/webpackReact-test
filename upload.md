![image-20200615171426153](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615171426153.png)

![image-20200615171453739](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615171453739.png)

![image-20200615171607849](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615171607849.png)

## axios

![image-20200615171841474](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615171841474.png)

xhr可以监听进度



### axios的简单使用







### mock服务

![image-20200615172158448](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615172158448.png)

![image-20200615172238809](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615172238809.png)





### 添加header

![image-20200615172441306](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615172441306.png)





## 两种方式实现文件上传

1.form的submit

2.js发送异步请求的方式



content-type其实就是encType



![image-20200615172939166](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615172939166.png)

由于文件是二进制格式,所有enctype设置成multiparty/form-data 



```js
const handleFileChange = (e:React.ChangeEvent<HTMLInputElemnt>)=>{}
```



## 定义ref类型

```js
  const fileInput = useRef<HTMLInputElement>(null)
```



## 可以/点击一个元素,触发另外一个元素的点击事件

```js
  /**
   * 点击上传文件
   */
  const handleClick = () => {
    if (fileInput.current) {
      // 这个可以啊
      fileInput.current.click()
    }
  }
```



## axios显示上传进度



```js
axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials,
    
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: 'uploading' })
            if (onProgress) {
              onProgress(percentage, file)
            }
          }
        },
      })
```



## 测试

onProgress是自己传递的

![image-20200615180517307](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615180517307.png)

![image-20200615180522679](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615180522679.png)



## 验证/转换结果的需求

beforeUpload



```js
用法实例
1.检查大小,返回的是布尔
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big')
    return false;
  }
  return true;
}
2.重命名,返回的是promise
const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', {type: file.type})
  return Promise.resolve(newFile)
}
```



## 进阶

![image-20200615233410431](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615233410431.png)

![image-20200615233453708](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615233453708.png)

![image-20200615233426139](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200615233426139.png)





## 发送post是否携带cookie

