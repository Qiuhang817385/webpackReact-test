import React, { useState, useEffect } from 'react'
import axios from 'axios'

// deps第二个数据，加载时机
const useUrlLoader = (url: string, dependency: any[] = []) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get(url).then((res) => {
      setData(res.data)

      setLoading(false)
    })
  }, dependency)

  return [data, loading]
}

// 使用
// 可以控制show,来控制什么时候发送异步请求
// const [data,loadign] = useUrlLoader(url,[show])
// 更改返回类型
// const dogRes = data as IShowLoading
