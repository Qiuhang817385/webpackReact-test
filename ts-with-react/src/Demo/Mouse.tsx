import React, { useEffect, useState } from 'react'

const MouseTracker: React.FC = (props) => {
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

  return <div></div>
}
