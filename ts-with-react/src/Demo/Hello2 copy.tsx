import React from 'react'

interface IHelloProps {
  data?: {
    message: string
  }
}
// 传递进来的data是一个对象的时候
// const Hello: React.FC<{ data: IHelloProps }> = (props) => {
const Hello: React.FC<IHelloProps> = (props) => {
  const { data } = props
  return <>{data ? data.message : ''}</>
}
export default Hello
