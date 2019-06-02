import React, { Component } from 'react'

import Menu from './head/menu'

class View extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return <div className="header">
      <Menu />
    </div>
  }
}

export default View