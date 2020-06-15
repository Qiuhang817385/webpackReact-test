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
