import React, { createContext, useState } from 'react'
import classnames from 'classnames'
import { MenuItemProps } from './MenuItem'

type SelectCallback = (selectedIndex: string) => void

interface IMenuContext {
  currentActiveIndex: string
  onClick?: SelectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
  defaultIndex?: string
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: SelectCallback
  defaultOpenSubMenus?: string[]
}
// 创建context,这个感觉没有用到啊？？？
export const MenuContext = createContext<IMenuContext>({
  currentActiveIndex: '0',
})

const Menu: React.FC<MenuProps> = (props) => {
  const {
    children,
    className,
    defaultIndex,
    mode,
    onSelect,
    style,
    defaultOpenSubMenus,
  } = props
  // 指示当前的active是哪一个
  const [currentActive, setCurrentActive] = useState(defaultIndex)
  /**
   * 切换active
   */
  const handleClick = (index: string) => {
    setCurrentActive(index)
    // 用户传递过来的方法属性，用户自定义的
    if (onSelect) {
      onSelect(index)
    }
  }

  const classes = classnames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const passedContext: IMenuContext = {
    currentActiveIndex: currentActive ? currentActive : '0',
    onClick: handleClick,
    mode,
    defaultOpenSubMenus,
  }
  // 对子类型进行判断.
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      // 想要拿到displayName，需要做类型断言
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >
      // 现在可以有代码提示,拿到里面的type了
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // return child
        return React.cloneElement(childElement, {
          index: index.toString(),
        })
      } else {
        console.error(
          'Warring,Menu has a child witch is not a MenuItem component'
        )
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}
export default Menu
