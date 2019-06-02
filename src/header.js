import React, { Component } from 'react'

import Menu from './head/menu'

class View extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return <div className="header">
      <div className="logo">
        <span>Graph</span> Test Dashboard
      </div>
      {/* <Menu /> */}
    </div>
  }
}

export default View