import React, { Component } from 'react'
// img当成一个组件来使用
import Img7 from '../img/7.jpg';
export default class Link extends Component {
  render () {
    return (
      <div>
        Link组件
        <img src={Img7} alt="" style={{ "width": "20px", "height": "30px" }} />
        <span>这是服务器字体</span>
      </div>
    )
  }
}
