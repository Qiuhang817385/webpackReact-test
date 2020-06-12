import React from 'react'
import { render } from '@testing-library/react'
import Button from './Button'
// test('renders learn react link', () => {
//   const { queryByText } = render(<Button>learn react</Button>)

//   // const Element = queryByText(/learn react/i)
//   const Element = queryByText('learn react')

//   expect(Element).toBeTruthy()
//   expect(Element).toBeInTheDocument()
// })

// describe进行分类,第一个用例,
describe('test Button component', () => {
  it('应该渲染一个正确的按钮组件', () => {
    const { getByText } = render(<Button>learn react</Button>)
    const Element = getByText('learn react')
    expect(Element).toBeInTheDocument()
    expect(Element.tagName).toEqual('BUTTON')
    expect(Element).toHaveClass('btn btn-default')
  })
  it('根据不同的props,显示不同的组件', () => {})
  it('btnType=Link的时候,并且href被提供的时候', () => {})
  it('测试disabled属性', () => {})
})
