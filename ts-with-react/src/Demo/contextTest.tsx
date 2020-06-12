import React, { Component } from 'react'

interface Props {}
interface State {}
interface IThemeProps {
  [key: string]: { color: string; background: string }
}

const themes: IThemeProps = {
  light: {
    background: '#111',
    color: '#122',
  },
}

export default class contextTest extends Component<Props, State> {
  state = {}

  render() {
    return <div></div>
  }
}
