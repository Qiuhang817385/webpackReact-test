import React, { useEffect, useState } from 'react'

// : React.FC--->自定义hook的话，就不能加这个了，因为默认要返回一个单标签

const useMouseTracker = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 })

  const updateMouse = (e: MouseEvent) => {
    setPositions({ x: e.clientX, y: e.clientY })
  }
  useEffect(() => {
    console.log('add effect')
    // MouseEvent
    document.addEventListener('click', updateMouse)
    // 执行时机，当前effect执行之前，和上一个effect之间
    return () => {
      console.log('remove effect')
      document.removeEventListener('click', updateMouse)
    }
  }, [positions.x, positions.y])

  console.log('render')

  return positions
}

export default useMouseTracker

// 使用const aaa = useMouse~~
