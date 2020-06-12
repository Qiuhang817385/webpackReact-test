import React, { createContext, useState } from 'react'
import classnames from 'classnames'

type SelectCallback = (selectedIndex: number) => void

interface IMenuContext {
  currentActiveIndex: number
  onClick?: SelectCallback
}

type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
  defaultIndex?: number
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: SelectCallback
}
// 创建context,这个感觉没有用到啊？？？
export const MenuContext = createContext<IMenuContext>({
  currentActiveIndex: 0,
})

const Menu: React.FC<MenuProps> = (props) => {
  const { children, className, defaultIndex, mode, onSelect, style } = props
  // 指示当前的active是哪一个
  const [currentActive, setCurrentActive] = useState(defaultIndex)
  /**
   * 切换active
   */
  const handleClick = (index: number) => {
    setCurrentActive(index)
    // 用户传递过来的方法属性，用户自定义的
    if (onSelect) {
      onSelect(index)
    }
  }

  const classes = classnames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
  })
  const passedContext: IMenuContext = {
    currentActiveIndex: currentActive ? currentActive : 0,
    onClick: handleClick,
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      // 想要拿到displayName，需要做类型断言
      // const childElement = child as React.FunctionComponentElement;
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
}
export default Menu
