import React, { useState } from 'react'
import Button, { ButtonType, ButtonSize } from './components/Button/Button'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/subMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Transition from './components/Transition/Transition'
import Icon from './components/Icon/Icon'

library.add(fas)

function App() {
  const handleSelect = (index: any) => {
    alert(index)
  }
  const [show, setShow] = useState(false)
  return (
    <div>
      {/* <FontAwesomeIcon icon={faCoffee} spin /> */}
      <Icon icon="arrow-down" spin theme="danger" />
      <Button btnType={'primary'}>123</Button>
      <Button btnType={'primary'}>123长度</Button>
      <Button btnType={'danger'}>123长度</Button>
      <Button btnType={'link'} href="www.baidu.com">
        Link
      </Button>
      <br />
      {/* <Menu
        defaultIndex={'0'}
        onSelect={(index) => {
          handleSelect(index)
        }}
      > */}
      {/* 手动添加?..太Low了吧 */}
      {/* <Menu defaultIndex={'0'} mode={'vertical'} defaultOpenSubMenus={['3']}> */}
      <Menu defaultIndex={'0'} mode={'vertical'}>
        <MenuItem>123</MenuItem>
        <MenuItem disabled>1234</MenuItem>
        <MenuItem>1235</MenuItem>
        <SubMenu title={'test'}>
          {/* 这个是disabled,mmp,调试半天 */}
          <MenuItem disabled>1234</MenuItem>
          <MenuItem>1235</MenuItem>
        </SubMenu>
      </Menu>
      <Button
        size="sm"
        onClick={() => {
          setShow(!show)
        }}
      >
        显示
      </Button>
      <Transition in={show} timeout={300} animation="zoom-in-left">
        <p>123</p>
      </Transition>
    </div>
  )
}

export default App
