import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import { white,cyan300 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'


import AdvancedBar from './component/AdvancedBar'
import baseTheme   from './component/baseTheme'
import Content     from './component/Content'
import DelButton   from './component/DelButton'
import TitleBar    from './component/TitleBar'
import SaveSnack   from './component/SaveSnack'

class App extends Component {
  constructor() {
    super()
    let data = window.__args__
    this.state = {}
    this.state.id = data.id
    this.state.title = data.title
    this.state.content = data.content
    this.state.mode = data.mode
    this.state.pinned = data.pinned
    this.state.advancedMode = data.advancedMode
    this.state.rows = data.rows ? data.rows : 1
    this.themeColor = data.themeColor ? data.themeColor : cyan300
    this.state.theme = getMuiTheme(baseTheme(this.themeColor))
    this.state.SaveSnackOpen = false
    this.win = remote.getCurrentWindow()
    this.winWidth = this.win.getSize()[0]
    this.rowCheckTimer = 0
    this.saveHandler = this.saveHandler.bind(this)
    this.editHandler = this.editHandler.bind(this)
    this.delHandler = this.delHandler.bind(this)
    this.pinHandler = this.pinHandler.bind(this)
    this.changeColor = this.changeColor.bind(this)
    this.getHeight = this.getHeight.bind(this)
    this.getTitle = this.getTitle.bind(this)
    this.getContent = this.getContent.bind(this)
    this.setState = this.setState.bind(this)
    this.exitHandler = this.exitHandler.bind(this)
    this.closeSaveSnack = this.closeSaveSnack.bind(this)
    this.textOnChangeHandler = this.textOnChangeHandler.bind(this)
    this.updateRows=this.updateRows.bind(this)
    this.setRowCheck=this.setRowCheck.bind(this)
  }

  updateWinSize(){
    let a = document.getElementById('app')
    this.win.setContentSize(this.winWidth,a.clientHeight)
    console.log(a.clientWidth,a.clientHeight);
  }

  getHeight(){
    return document.getElementById('app').clientHeight+35
  }

  saveHandler(){
    document.title = this.state.title + ' - Mmemo'
    let d = {}
    d.id = this.state.id
    d.title = this.state.title
    d.content = this.state.content
    d.mode = this.state.mode === 'lock' ? 'lock' : 'normal'
    d.pinned = this.state.pinned
    d.themeColor = this.themeColor
    ipc.send('set-memo', d)
    this.setState({SaveSnackOpen:true})
  }
  exitHandler(){
    this.saveHandler()
    this.setState({mode: 'normal'})
  }

  editHandler(){
    // this.setWinHeight(400)
    this.setState({mode: 'edit'})
    // this.tID = setInterval(() => {
    //   this.setWinHeight(this.getHeight())
    // }, 100)
  }

  delHandler(){
    ipc.send('del-memo', this.state.id)
  }

  pinHandler(){
    let nowPinned = this.state.pinned
    if (nowPinned) {
      this.setState({pinned:false})
      ipc.send('unpin-memo', this.state.id)
    } else {
      this.setState({pinned:true})
      ipc.send('pin-memo', this.state.id)
    }
  }

  textOnChangeHandler(e, v){
    let x=document.getElementById('content-edit')
    // console.log(parseInt(x.style.height.replace('px','')));
    // console.log(x);
    this.setState({content:v})
  }

  changeColor(c){
    this.themeColor = c
    let t = getMuiTheme(baseTheme(this.themeColor))
    this.setState({theme:t})
  }

  setWinHeight(h){
    if (h < 120) {
      h = 120
    }
    this.win.setSize(this.winWidth,h)
  }

  closeSaveSnack(){
    this.setState({SaveSnackOpen:false})
  }

  getContent(){
      if (this.state.mode === 'edit') {
        return (
          <TextField
            id = 'content-edit'
            fullWidth = {true}
            defaultValue={this.state.content}
            multiLine={true}
            style={{fontSize:'14px',transition:null}}
            onChange={(e, v) => this.setState({content:v})}
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
        return (
          <div style={{minHeight:80}}>
            {renderList}
          </div>
        )
      }
    }

  getTitle(){
    if (this.state.mode === 'edit') {
      return (
        <TextField
          id = 'title-edit'
          hintText = '输入标题'
          fullWidth = {false}
          className = 'no-drag'
          inputStyle={{color:white}}
          defaultValue={this.state.title}
          onChange={(e, v) => this.setState({title:v})}
        />
      )
    }
    else {
      return this.state.title
    }
  }

  updateRows(){
    let x=document.getElementById('content-edit')
    let h=parseInt(x.style.height.replace('px',''))
    this.setState({rows:h/24})
  }
  setRowCheck(){
    console.log(this.rowCheckTimer);
    // this.rowCheckTimer = setInterval(this.updateRows,500)
  }

  componentDidMount(){
    document.title = this.state.title + ' - Mmemo'
    // setTimeout(() => {
    //   this.setWinHeight(this.getHeight())
    // }, 200)
    this.updateWinSize()
    ipc.on('lock', () => {
      if (this.state.mode === 'edit')
        this.saveHandler()
      this.setState({mode: 'lock'})
    })
    ipc.on('unlock', () => {
      if (this.state.mode === 'lock') {
        this.setState({mode: 'normal'})
        // this.setWinHeight(this.getHeight())
      }
    })
    new ResizeSensor(ReactDOM.findDOMNode(this), () => {
      // if (this.state.mode==='edit') {
        // this.updateRows()
      // }
      // this.updateWinSize()
      // this.setState({rows:1})
      // console.log();
      // setTimeout(()=>this.updateWinSize(),1000)
    //   // console.log('myelement has been resized');
      this.updateWinSize()
    });
    window.onbeforeunload = (e) => {

      e.returnValue = false
    }
  }

  render() {
    console.log(this.state);
    return (
      <MuiThemeProvider muiTheme={this.state.theme}>
        <div>
          <TitleBar getTitle={this.getTitle} getHeight={this.getHeight} mode={this.state.mode} pinned={this.state.pinned}
                    editHandler={this.editHandler} exitHandler={this.exitHandler} pinHandler={this.pinHandler}/>
          <AdvancedBar mode={this.state.mode} advancedMode={this.state.advancedMode} changeColor={this.changeColor} getHeight={this.getHeight} delHandler={this.delHandler} saveHandler={this.saveHandler}/>
          <Content getContent={this.getContent}/>
          <SaveSnack open={this.state.SaveSnackOpen} closeSaveSnack={this.closeSaveSnack} />
        </div>
      </MuiThemeProvider>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'))
