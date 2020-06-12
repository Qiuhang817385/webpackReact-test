import React from 'react'
import Button, { ButtonType, ButtonSize } from './components/Button/Button'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
function App() {
  return (
    <div>
      <Button btnType={ButtonType.Default}>123</Button>
      <Button btnType={ButtonType.Primary}>123长度</Button>
      <Button btnType={ButtonType.Danger}>123长度</Button>
      <Button btnType={ButtonType.Link} href="www.baidu.com">
        Link
      </Button>
      <br />
      <Menu defaultIndex={0} mode={'vertical'}>
        <MenuItem index={0}>123</MenuItem>
        <MenuItem index={1} disabled>
          1234
        </MenuItem>
        <MenuItem index={2}>1235</MenuItem>
      </Menu>
    </div>
  )
}

export default App
