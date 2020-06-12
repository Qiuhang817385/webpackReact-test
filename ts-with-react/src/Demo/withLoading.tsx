// 显示和隐藏loading
import React from 'react'
import axios from 'axios'
interface ILoaderState {
  data: any
  isLoading: boolean
}
interface ILoaderProps {
  data: any
}

// 传递进来的组件当然可以是一个函数形的组件

const withLoader = <P extends ILoaderState>(
  // ???
  WrappedComponent: React.ComponentType<P>,
  url: string
) => {
  return class LoaderComponent extends React.Component<
    // ???
    Partial<ILoaderProps>,
    ILoaderState
  > {
    constructor(props: any) {
      super(props)
      this.state = {
        data: null,
        isLoading: false,
      }
    }

    componentDidMount() {
      this.setState({ isLoading: true })
      axios.get(url).then((result: any) => {
        this.setState({
          data: result.data,
          isLoading: false,
        })
      })
    }
    render = () => {
      const { data, isLoading } = this.state
      return (
        <>
          {isLoading || !data ? (
            <p>data is loading</p>
          ) : (
            <WrappedComponent {...(this.props as P)} data={data} />
          )}
        </>
      )
    }
  }
}

// 使用
interface IShowResult {
  message: string
  status: string
}
// 传递一个对象是几个意思？？
const DogShow: React.FC<{ data: IShowResult }> = ({ data }) => {
  return (
    <>
      <h2>{data.status}</h2>
      <img src={data.message} alt="1" />
    </>
  )
}
