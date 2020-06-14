import React, { useContext, useState, FunctionComponentElement } from 'react'
import classnames from 'classnames'
import { MenuContext } from './Menu'
import { MenuItemProps } from './MenuItem'
import Icon from './../Icon/Icon'
import { CSSTransition } from 'react-transition-group'
import Transition from './../Transition/Transition'
export interface SubMenuProps {
  index?: string
  title?: string
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = ({
  children,
  className,
  index,
  title,
}) => {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  // 数组包不包括index,这是干嘛,如果包括,说明有孩子,如果不包括,说明没有
  const isOpend =
    index && context.mode === 'vertical'
      ? openedSubMenus.includes(index)
      : false
  // const [menuOpen, setMenuOpen] = useState(false)
  // 上面的花里胡哨的,缺点就是需要自己手动控制,优点就是可控制
  const [menuOpen, setMenuOpen] = useState(true)

  const classes = classnames('menu-item submenu-item', className, {
    'is-active': context.currentActiveIndex === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  })
  let timer: any
  /**
   * 鼠标划入展开,利用传递过来的context.mode进行判断,如果是横向,有鼠标划入功能,纵向没有
   */
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 100)
  }

  /**
   * 点击展开二级菜单
   */
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }
  /**
   * 利用传递过来的context.mode进行判断,如果是横向,有鼠标划入功能,纵向没有
   */
  const clickEvents =
    context.mode === 'vertical' ? { onClick: handleClick } : {}
  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
          },
        }
      : {}
  /**
   * 渲染二级组件
   */
  const renderChildren = () => {
    const sumMenuClasses = classnames('viking-submenu', {
      'menu-opened': menuOpen,
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >
      if (childElement.type.displayName === 'MenuItem') {
        // console.log('${index}-${i}', index, i)
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        })
      } else {
        console.error(
          'Warring,Menu has a child witch is not a MenuItem component'
        )
      }
    })
    return (
      // <CSSTransition
      //   in={menuOpen}
      //   timeout={300}
      //   classNames="zoom-in-top"
      //   appear
      //   unmountOnExit
      // >
      //   <ul className={sumMenuClasses}>{childrenComponent}</ul>
      // </CSSTransition>
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={sumMenuClasses}>{childrenComponent}</ul>
      </Transition>
    )
  }
  /**
   * render
   */
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  )
}
SubMenu.displayName = 'SubMenu'
export default SubMenu
