import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react'
import Menu, { MenuProps } from './Menu'
import MenuItem from './MenuItem'

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test',
}
const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical',
}

/**
 * 渲染不同属性的组件
 */
const generatorMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>123</MenuItem>
      <MenuItem index={1} disabled>
        1234
      </MenuItem>
      <MenuItem index={2}>1235</MenuItem>
    </Menu>
  )
}
// beforEach通用的元素，不用在case当中重复声明，每一个例子跑之前都会默认执行

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement

describe('test menu', () => {
  beforeEach(() => {
    // 这个可以啊
    wrapper = render(generatorMenu(testProps))
    // 测试案例越贴近使用者的方法，可以获得越多的信息
    // API通过渲染元素的内容
    menuElement = wrapper.getByTestId('test-menu')
    // wrapper.container.getElementsByClassName
    activeElement = wrapper.getByTestId('active')
    disabledElement = wrapper.getByTestId('disabled')
  })
  it('提供默认属性之后，会不会显示默认的class', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('viking-menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('点击之后是否会切换到正确的Item上面', () => {
    const thirdItem = wrapper.getByText('123')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(1)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(2)
  })
  it('传入mode=vertical的时候，是否显示正确的class', () => {
    cleanup()
    const wrapper = render(generatorMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
})
