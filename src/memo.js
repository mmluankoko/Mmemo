import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';

import { white,red500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class EditButton extends Component {
  getItem(){
    console.log(this.props);
    if (this.props.editMode) {
      return (
        <MenuItem primaryText="完成" onClick={() => {
          console.log('done clicked')
          this.props.doneHandler()
        }}/>
      )
    } else {
      return (
        <MenuItem primaryText="编辑" onClick={() => {
          console.log('edit clicked')
          this.props.editHandler()
        }}/>
      )
    }

  }
  render() {
    return (
      <IconMenu
        style={{webkitAppRegion: 'no-drag'}}
        desktop = {true}
        iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        {this.getItem()}
        <MenuItem style={{color:red500}} primaryText="删除" onClick={() => {
          console.log('del clicked')
          this.props.delHandler()
        }}/>
      </IconMenu>
    )
  }
}


class App extends Component {
  constructor() {
    super()
    let data = window.__args__
    this.state = {}
    this.state.id = data.id
    this.state.title = data.title
    this.state.content = data.content
    this.state.editMode = data.editMode
    this.state.locked = data.locked
    this.state.theme = getMuiTheme({
      appBar: {
        height: 46
      },
      svgIcon: {
        color: white
      }
    });
    console.log(this.state)
    this.win = remote.getCurrentWindow()
    this.winWidth = this.win.getSize()[0]
    this.doneHandler = this.doneHandler.bind(this)
    this.editHandler = this.editHandler.bind(this)
    this.delHandler = this.delHandler.bind(this)
  }

  doneHandler(){
    this.setState({editMode: false})
    setTimeout(() => {
      this.setWinHeight(ReactDOM.findDOMNode(this).clientHeight+16)
    }, 500);
    document.title = this.state.title + ' - Mmemo'
    if (this.tID) clearInterval(this.tID)
    let d = {}
    d.id = this.state.id
    d.title = this.state.title
    d.content = this.state.content
    d.locked = this.state.locked
    d.editMode = false
    ipc.send('set-memo', d)
  }

  editHandler(){
    this.setWinHeight(400)
    this.setState({editMode: true})
    this.tID = setInterval(() => {
      this.setWinHeight(ReactDOM.findDOMNode(this).clientHeight+16)
    }, 100)
  }

  delHandler(){
    console.log('del');
    ipc.send('del-memo', this.state.id)
  }

  setWinHeight(h){
    if (h < 110) {
      h = 110
    }
    this.win.setSize(this.winWidth,h)
  }

  getTitle(){
    if (this.state.editMode) {
      return (
        <TextField
          id = 'title-edit'
          style={{webkitAppRegion: 'no-drag'}}
          inputStyle={{color:white}}
          underlineFocusStyle={{borderBottomColor:white}}
          defaultValue={this.state.title}
          onChange={(e, v) => this.setState({title:v})}
        />
      )
    }
    else {
      return this.state.title
    }
  }

  getContent(){
    if (this.state.editMode) {
      return (
        <TextField
          id = 'content-edit'
          defaultValue={this.state.content}
          multiLine={true}
          onChange={(e, v) => this.setState({content:v})}
        />
      )
    }
    else {
      return this.state.content
    }
  }

  getEditButton(){
    return(
      <EditButton doneHandler={this.doneHandler}
                  editHandler={this.editHandler}
                  delHandler ={this.delHandler}
                  editMode={this.state.editMode}
                  />
    )
  }

  componentDidMount(){
    document.title = this.state.title + ' - Mmemo';
    setTimeout(() => {
      this.setWinHeight(ReactDOM.findDOMNode(this).clientHeight+16)
    }, 500);
    ipc.on('lock', () => {
      console.log('lock');
      this.setState({locked:true})
      this.doneHandler()
    })
    ipc.on('unlock', () => {
      console.log('un');
      this.setState({locked:false})
    })
  }

  render() {
    console.log(this.state.theme);
    return (
      <MuiThemeProvider muiTheme={this.state.theme}>
        <div>
          <AppBar title={this.getTitle()}
                  showMenuIconButton={false}
                  style={{webkitUserSelect: 'none', webkitAppRegion: 'drag'}}
                  titleStyle={{fontSize:'20px'}}
                  iconElementRight={this.state.locked ? undefined: this.getEditButton()}/>
          <Card>
            <CardText>
              {this.getContent()}
            </CardText>
          </Card>
        </div>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
