import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'
// 上传状态
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string
  size: number
  name: string
  // 状态
  status?: UploadFileStatus
  // 百分百
  percent?: number
  // 源文件,还有file类型
  raw?: File
  response?: any
  error?: any
}
export interface UploadProps {
  action: string
  // 展示数组
  defaultFileList?: UploadFile[]
  // 上传前的校验或者转换函数,返回promise或者Boolean
  beforeUpload?: (file: File) => boolean | Promise<File>
  // 进度
  onProgress?: (percentage: number, file: File) => void
  // 成功
  onSuccess?: (data: any, file: File) => void
  // 失败
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void
  onRemove?: (file: UploadFile) => void
  // 添加自定义header
  headers?: { [key: string]: any }
  // 添加自定义name
  name?: string
  // 添加自定义data,比如token
  data?: { [key: string]: any }
  // 添加自定义是否携带cookie
  withCredentials?: boolean
  // 添加自定义属性accept接受文件类型
  accept?: string
  // 添加自定义属性多选
  multiple?: boolean
  // 添加自定义方法拖动
  drag?: boolean
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props
  // 通过ref来使用
  const fileInput = useRef<HTMLInputElement>(null)
  // 创建文件
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  // 使用  updateFileList(_file, { percent: percentage, status: 'uploading' })
  /**
   * 这个函数是干嘛的,取到最新的file,根据单个的file索引来做状态的修改,修改单个文件的状态
   */
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          // 更新单个的状态
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  /**
   * 点击上传文件
   */
  const handleClick = () => {
    if (fileInput.current) {
      // 这个可以啊
      fileInput.current.click()
    }
  }
  /**
   * 文件上传
   */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    /**
     * 上传文件
     */
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }
  /**
   * 列表移除方法
   */
  const handleRemove = (file: UploadFile) => {
    // 删除,就是过滤出来不等于这个的元素的就可以了
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid)
    })
    // 自定义函数,怎么写还不知道
    if (onRemove) {
      onRemove(file)
    }
  }
  /**
   * 文件上传函数
   */
  const uploadFiles = (files: FileList) => {
    // FileList是一个伪数组??[Symbol.iterator](): IterableIterator<File>
    let postFiles = Array.from(files)
    postFiles.forEach((file) => {
      // 如果没有beforeUpload,直接上传文件
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        // 两种用法,返回两种值,promise或者布尔
        // 如果是promise
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile)
          })
          // 如果是布尔值
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }
  const post = (file: File) => {
    // 原生的文件类型信息是不够的,这里添加新的属性,是UploadFile类型
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      // 当前状态
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    //setFileList([_file, ...fileList])
    setFileList((prevList) => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
    // 上传文件,这个应该是一个写死的值，自定义name
    formData.append(name || 'file', file)
    // 添加自定义data,比如token键值对
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }
    axios
      .post(action, formData, {
        headers: {
          // 完成添加自定义头部
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials, //axios是否携带cookie
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0
          if (percentage < 100) {
            // 当前状态,想拿到最新的,直接拿_file就可以了叭...
            // 每次更新都会调用这个方法,简单点就是改变进度条和当前状态的
            updateFileList(_file, { percent: percentage, status: 'uploading' })
            // 这个函数是干嘛的,显示进度的函数,是自己传递的
            if (onProgress) {
              onProgress(percentage, file)
            }
          }
        },
      })
      .then((resp) => {
        // 成功状态
        updateFileList(_file, { status: 'success', response: resp.data })
        if (onSuccess) {
          onSuccess(resp.data, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
      .catch((err) => {
        // 失败状态
        updateFileList(_file, { status: 'error', error: err })
        if (onError) {
          onError(err, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
  }

  return (
    <div className="viking-upload-component">
      {/* 点击按钮 */}
      <div
        className="viking-upload-input"
        style={{ display: 'inline-block' }}
        onClick={handleClick}
      >
        {/* 是否可以拖动 */}
        {drag ? (
          <Dragger
            onFile={(files) => {
              // 传入,子组件给父组件传递files,完成整个的上传过程
              uploadFiles(files)
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        {/* 文件上传 */}
        <input
          className="viking-file-input"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>
      {/* 展示型组件 */}
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file',
}
export default Upload
