import React, { Component } from 'react'

class View extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      graph: '',
      output: '',
      log: ''
    }
  }
  render () {
    const {
      input,
      graph,
      output,
      log
    } = this.state
    return <div className="main">
      <div className="left">
        <p>input: 
          <textarea 
            style={{height:150}} 
            value={input}
          />
        </p>
        <p>graph: 
          <textarea 
            style={{height:550}}
            value={graph}
          />
          <button type="submit">
            Run Graph
          </button>
        </p>
      </div>
      <div className="right">
        <p>output: 
          <textarea style={{height:200}} value={output} disabled={true} />
        </p>
        <p>log: 
          <textarea style={{height:500}} value={log} disabled={true} />
        </p>
      </div>
    </div>
  }
}

export default View