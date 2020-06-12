import React from 'react'

interface IHelloProps {
  message?: string
}

const Hello: React.FC<IHelloProps> = (props) => {
  return <>{props.message}</>
}
export default Hello
