import React, { Component } from 'react'

import TextField from 'material-ui/TextField'


class Content extends Component {
  render(){
    if (this.props.mode === 'edit') {
      return (
        <TextField
          id = 'content-edit'
          fullWidth = {true}
          hintText = '输入便签内容'
          defaultValue={this.props.content}
          multiLine={true}
          style={{fontSize:'14px'}}
          onChange={(e, v) => this.props.setState({content:v})}
        />
      )
    }
    else {
      let renderList = []
      let spaceSplit = this.state.content.split(' ')
      for (let item of spaceSplit) {
        let newlineSplit = item.split('\n')
        for (let i of newlineSplit) {
          renderList.push(<span key={getID()}>{i}</span>)
          renderList.push(<br key={getID()}/>)
        }
        renderList.pop()
        renderList.push(<span key={getID()}>&nbsp;</span>)
      }
      renderList.pop()
      return renderList
    }
  }
}

export default Content
