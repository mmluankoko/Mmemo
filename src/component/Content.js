import React, { Component } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable';
import TextField from 'material-ui/TextField'

import {Card, CardText} from 'material-ui/Card'
import ReactDOM from 'react-dom'

class T extends Component {
  componentDidMount(){
    let x = ReactDOM.findDOMNode(this)
    console.log('t',x);
    x.addEventListener('transitionend', ()=>console.log('trans'))
    x.addEventListener('animationstart', ()=>console.log('trans'))

  }
  render(){
    return (
      <TextField
        id = 'content-edit'
        fullWidth = {true}
        hintText = '输入便签内容'
        defaultValue={this.props.content}
        multiLine={true}
        style={{fontSize:'14px'}}
        onChange={(e, v) => this.props.x({content:v})}
      />
    )
  }
}

class Content extends Component {
  getContent(){
    if (this.props.mode === 'edit') {
      return (
        <T
          content={this.props.content}
          x={this.props.setS}
        />
      )
    }
    else {
      let renderList = []
      let spaceSplit = this.props.content.split(' ')
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
  componentDidMount(){
    let x = ReactDOM.findDOMNode(this)
    console.log('c',x);
    // x.addEventListener('transitionstart', ()=>console.log('t'))
  }
  render(){
    return (
      <div style={{backgroundColor: this.props.muiTheme.palette.primary1Color}}>
        <Card rounded={false} zDepth={0} style={{background: 'linear-gradient(120deg, rgba(255,255,255,0.2), rgba(255,255,255,0.3))'}}>
          <CardText>
            {this.getContent()}
          </CardText>
        </Card>
      </div>
    )
  }
}


export default muiThemeable()(Content);
