import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
} from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/Icon'
import Transition from '../Transition/Transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
  value: string
}
// 数据是string数组或者一个对象数组，默认是一个空对象
export type DataSourceType<T = {}> = T & DataSourceObject

// 继承input的所有属性
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  // 确定是同步搜索还是异步搜索
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]> //返回promise类型
  // 用户选择了那个值,这个值是查询后的回调数据,不论同步还是异步,确定下拉菜单的样式???
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props

  // 显示value值
  const [inputValue, setInputValue] = useState(value as string)
  // 显示筛选结果
  const [suggestions, setSugestions] = useState<DataSourceType[]>([])
  // 显示loading
  const [loading, setLoading] = useState(false)
  // 显示下拉菜单
  const [showDropdown, setShowDropdown] = useState(false)
  //关键字高亮？？？不是关键字高亮，是搜索结果上下箭头的高亮显示
  const [highlightIndex, setHighlightIndex] = useState(-1)
  // 是否启动异步搜索？？这个是解决一个BUG，当输入结果onSlect之后，回车或者点击完，重新会发起请求
  const triggerSearch = useRef(false)

  const componentRef = useRef<HTMLDivElement>(null)
  // 这个自定义防抖，只需要传递值？不用传递函数？？
  const debouncedValue = useDebounce(inputValue, 300)
  // 点击外部，使筛选结果消失
  // 如果当前点击的节点和目标节点使一样的，那么就巴拉巴拉，否则巴拉巴拉，时刻监听着
  useClickOutside(componentRef, () => {
    // 这个就是回调函数
    setSugestions([])
  })
  // 异步获取数据
  useEffect(() => {
    // 修复Bug
    if (debouncedValue && triggerSearch.current) {
      setSugestions([])
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then((data) => {
          setLoading(false)
          setSugestions(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSugestions(results)
        setShowDropdown(true)
        if (results.length > 0) {
          setShowDropdown(true)
        }
      }
    } else {
      setShowDropdown(false)
    }
    // 每次搜索都置为-1 不高亮显示
    setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])
  /**
   * 键盘高亮事件
   */
  const highlight = (index: number) => {
    // 边界处理
    if (index < 0) index = 0
    // 边界处理
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }
  /**
   * 键盘事件
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // 回车键
      case 13:
        // 默认是-1不存在，如果存在才调用
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      // 上下箭头，关键字高亮
      case 38:
        highlight(highlightIndex - 1)
        break
      case 40:
        highlight(highlightIndex + 1)
        break
      case 27:
        setShowDropdown(false)
        break
      default:
        break
    }
  }

  /**
   * onChange事件
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    // 触发异步回调
    triggerSearch.current = true
  }
  /**
   * 点击筛选列表单项的回调哦
   */
  const handleSelect = (item: DataSourceType) => {
    // 表单设置成input
    setInputValue(item.value)
    // 使下拉菜单消失
    setShowDropdown(false)
    // 如果有用户的回调函数的话，传递进入用户的onSelect
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }
  /**
   * 渲染模板，根据用户的需要展示不同的筛选列表
   */
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  /**
   * 显示筛选后的数据
   */
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSugestions([])
        }}
      >
        <ul className="viking-suggestion-list">
          {/* 这个逻辑有点反逻辑啊。。。，这里控制loading也是可以的 */}
          {loading && (
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {/* 关键字筛选的map展示 */}
          {suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              // 关键字高亮展示
              'is-active': index === highlightIndex,
            })
            return (
              <li
                key={index}
                className={cnames}
                // 点击选项的回调
                onClick={() => handleSelect(item)}
              >
                {/* 根据需要展示 */}
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }
  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {/* 显示列表 */}
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete
