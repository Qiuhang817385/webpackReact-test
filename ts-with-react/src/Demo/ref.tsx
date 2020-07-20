import React, { useState, useEffect, useRef } from 'react'
const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0)
  const likeRef = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    console.log('is running')
    document.title = `点击了${like}次数`
  }, [like])

  // 模拟componentDidUpdate
  // 模拟componentDidUpdate
  // 模拟componentDidUpdate
  // 模拟componentDidUpdate
  // 模拟componentDidUpdate
  // 模拟componentDidUpdate
  const didMountRef = useRef(false)
  useEffect(() => {
    if (didMountRef.current) {
      console.log('this is updated')
    } else {
      didMountRef.current = true
    }
  })

  const handleAlertClick = () => {
    setTimeout(() => {
      alert('you click on' + likeRef.current)
    }, 3000)
  }
  return (
    <>
      <button
        onClick={() => {
          setLike(like + 1)
          likeRef.current++
        }}
      >
        {like}👍
      </button>
      <input ref={inputRef} />
    </>
  )
}
