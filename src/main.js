import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'

const url = 'http://localhost:3000'

class View extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      title: '',
      graph: '',
      output: '',
      log: '',
      error: '',
      graphList: [],
    }
  }
  componentWillMount () {
    this.fetch()
  }
  fetch () {
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
  changeTitle (e) {
    this.setState({
      title: e.target.value
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
      title: graph.title,
      graph: JSON.stringify(graph.graph, null, 2),
    })
  }
  saveGraph () {
    const { graph, title } = this.state
    if (!title) {
      return
    }
    let graphData
    try {
      graphData = JSON.parse(graph)
    } catch (e) {
      console.log(e)
    }
    if (!graphData) {
      return
    }
    axios.post(url+'/api/graph/add',{
      title: title,
      graph: graphData
    }).then(res=>{
      if (res.status!=200) {
        return console.log(res.status)
      }
      if (!res.data.success) {
        return console.log(res.data.message)
      }
      this.setState({
        title: '',
        graph: ''
      })
      this.fetch()
    }).catch(err=>{
      console.log(err)
    })
  }
  runTest () {
    const { graph, input } = this.state
    if (!graph || !input) {
      return this.setState({
        error: '输入和图必须设置'
      })
    }
    axios.post(url+'/api/graph/test',{
      input,
      graph
    }).then(res=>{
      if (res.status!=200) {
        return console.log(res.status)
      }
      if (!res.data.success) {
        return console.log(res.data.message)
      }
      this.setState({
        error: '',
        output: JSON.stringify(res.data.data.output),
        log: JSON.stringify(res.data.data.log)
      })
    }).catch(err=>{
      console.log(err)
    })
  }
  render () {
    const {
      input,
      title,
      graph,
      output,
      log,
      graphList,
      error,
    } = this.state
    return <div className="main">
      {
        error ? 
        <div className="error">
          {error}
        </div> : ''
      }
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
          <label>Title: </label>
          <textarea 
            style={{height:50}}
            value={title}
            onChange={this.changeTitle.bind(this)}
          />
        </p>
        <p>
          <label>Graph: </label>
          <textarea 
            style={{height:440}}
            value={graph}
            onChange={this.changeGraph.bind(this)}
          />
          <button 
            type="button"
            style={{
              marginRight: 10
            }}
            onClick={this.runTest.bind(this)}
          >
            Run Test
          </button>
          <button 
            type="button"
            onClick={this.saveGraph.bind(this)}
          >
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