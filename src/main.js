import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'

const url = 'http://localhost:3000'

class View extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      graph: '',
      output: '',
      log: '',
      graphList: [],
    }
  }
  componentWillMount () {
    axios.get(url+'/api/graph/list').then(res=>{
      if (res.status!=200) {
        return console.log(res.status)
      }
      if (!res.data.success) {
        return console.log(res.data.message)
      }
      this.setState({
        graphList: res.data.data
      })
    }).catch(err=>{
      console.log(err)
    })
  }
  changeInput (e) {
    this.setState({
      input: e.target.value
    })
  }
  changeGraph (e) {
    this.setState({
      graph: e.target.value
    })
  }
  selectGraph (index) {
    let graph = this.state.graphList[index]
    this.setState({
      graph: JSON.stringify(graph.graph, null, 2)
    })
  }
  render () {
    const {
      input,
      graph,
      output,
      log,
      graphList,
    } = this.state
    return <div className="main">
      <div className="left">
        <div className="graphList">
          <label>
            Graph List:
          </label>
          {
            _.map(graphList, (graph, index)=>{
              return <div
                key={index}
                className="graphListItem"
                onClick={()=>{
                  this.selectGraph(index)
                }}
              >
                {graph.title}
              </div>
            })
          }
        </div>
      </div>
      <div className="body">
        <p>
          <label>Input: </label>
          <textarea 
            style={{height:150}} 
            value={input}
            onChange={this.changeInput.bind(this)}
          />
        </p>
        <p>
          <label>Graph: </label>
          <textarea 
            style={{height:550}}
            value={graph}
            onChange={this.changeGraph.bind(this)}
          />
          <button 
            type="button"
            style={{
              marginRight: 10
            }}
          >
            Run Test
          </button>
          <button type="button">
            Save Graph
          </button>
        </p>
      </div>
      <div className="right">
        <p>
          <label>Output:</label> 
          <textarea style={{height:200}} value={output} disabled={true} />
        </p>
        <p>
          <label>Log:</label> 
          <textarea style={{height:500}} value={log} disabled={true} />
        </p>
      </div>
    </div>
  }
}

export default View