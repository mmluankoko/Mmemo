import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { Card, CardActions, CardText } from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import LockCloseIcon from 'material-ui/svg-icons/action/lock-outline';
import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import ShowAllIcon from 'material-ui/svg-icons/action/view-module';
import MoveIcon from 'material-ui/svg-icons/action/open-with';
import NewIcon from 'material-ui/svg-icons/content/add';
import { black,darkBlack,white,darkWhite } from 'material-ui/styles/colors'
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';


import baseTheme from './component/baseTheme'


class App extends Component {
  constructor(){
    super()
    // let locked = window.__args__.locked
    // this.setState({locked:window.__args__.locked})
  }
  newMemo(){
    ipc.send('new-memo')
  }
  showMemos(){
    ipc.send('show-memos')
  }
  unlockMemos(){
    alert('not implemented')
  }
  lockMemos(){
    alert('not implemented')
  }
  componentDidMount(){
    window.onbeforeunload = (e) => {
      e.returnValue = false
    }
  }
  render() {
    let darkTheme=false
    let backgroundColor = darkTheme ? darkBlack : darkWhite
    let iconColor = darkTheme ? white : black
    let iconStyle = {width:22,height:22}
    let style = {minWidth:32,height:28,lineHeight:'28px',marginTop:-3}
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(baseTheme())}>
      <div style={{backgroundColor:backgroundColor}}>
        <FlatButton title="移动工具栏" style={style} className='drag' icon={<MoveIcon color={iconColor}/>}/>
        <FlatButton title="新建便笺" onClick={this.newMemo} style={style} icon={<NewIcon color={iconColor}/>}/>
        <FlatButton title="显示便笺" onClick={this.showMemos} style={style} icon={<ShowAllIcon color={iconColor}/>}/>
        <FlatButton title="解锁便笺" onClick={this.unlockMemos} style={style} icon={<LockOpenIcon color={iconColor}/>}/>
        <FlatButton title="锁定便笺" onClick={this.lockMemos} style={style} icon={<LockCloseIcon color={iconColor}/>}/>
      </div>
      </MuiThemeProvider>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'))
