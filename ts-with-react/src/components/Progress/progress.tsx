import React, { FC } from 'react'
import { ThemeProps } from '../Icon/Icon'
export interface ProgressProps {
  // 百分几
  percent: number
  // bar整体的高度
  strokeHeight?: number
  // 是否显示文本
  showText?: boolean
  // 自定义style
  styles?: React.CSSProperties
  // 主题
  theme?: ThemeProps
}
// 进度条组件
const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props
  return (
    <div className="viking-progress-bar" style={styles}>
      {/* outer外边框 */}
      <div
        className="viking-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        {/* inner */}
        <div
          className={`viking-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  // 默认15px
  strokeHeight: 15,
  showText: true,
  theme: 'primary',
}
export default Progress
