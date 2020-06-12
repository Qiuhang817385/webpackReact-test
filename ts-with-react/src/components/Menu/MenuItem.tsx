import React, { useContext } from 'react'
import classnames from 'classnames'
import { MenuContext } from './Menu'
export interface MenuItemProps {
  index?: number
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}
const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { className, disabled, style, children, index } = props
  /**
   * 传递过来的context
   */
  const context = useContext(MenuContext)

  const classes = classnames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.currentActiveIndex === index, //这个index哪里来的？  自己本身默认的属性
  })
  /**
   * 单项点击触发active
   */
  const handleClick = () => {
    // 在这里就可以控制disabled和active不能同时显示出来
    if (context.onClick && !disabled) {
      let cI = index ? index : 0
      context.onClick(cI)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}
MenuItem.displayName = 'MenuItem'
MenuItem.defaultProps = {}
export default MenuItem
