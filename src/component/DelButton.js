import ClearIcon from 'material-ui/svg-icons/content/clear';
import DelDialog from './DelDialog'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import React, { Component } from 'react'


class DelButton extends Component {
  constructor(){
    super()
    this.state = {}
    this.state.dialogOpen = false
    this.openDialog = this.openDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
  }

  openDialog(){
    this.setState({dialogOpen: true})
  }

  closeDialog(){
    this.setState({dialogOpen: false})
  }

  render(){
    let style = {
      position: 'fixed',
      top: '0px',
      bottom: 'auto',
      left: 'auto',
      right: '0px',
      zIndex: '2000',
      webkitAppRegion: 'no-drag'}

    if (this.props.mode === 'edit') {
      return (
        <div>
          <DelDialog dialogOpen={this.state.dialogOpen} closeDialog={this.closeDialog} delHandler={this.props.delHandler}/>
          <FloatingActionButton zDepth={0} secondary={true} style={style}
            iconStyle={{width:'16px',height:'16px'}}
            onClick = {this.openDialog}
          >
            <ClearIcon style={{height:'16px',width:'16px'}}/>
          </FloatingActionButton>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}


export default DelButton
