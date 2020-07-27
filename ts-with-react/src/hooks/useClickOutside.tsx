import { RefObject, useEffect } from 'react'

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // 如果当前ref不存在，或者是组件内部的元素，也就是，ref是爸爸，包含当前点击的元素，那么表示是在内部呢
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return
      }

      handler(event)
    }
    document.addEventListener('click', listener)
    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
}

export default useClickOutside

// shouldComponentUpdate
