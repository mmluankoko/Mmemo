import React, { Component } from 'react'
import { red500 } from 'material-ui/styles/colors'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class DelDialog extends Component {
  render(){
    const contentStyle = {
      marginTop: -70
    }
    const overlayStyle = {
      backgroundColor : 'rgb(0,0,0,0)'
    }
    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onClick={this.props.closeDialog}
      />,
      <FlatButton
        label="删除"
        style={{color:red500}}
        onClick={this.props.delHandler}
      />,
    ]

    return (
      <Dialog
        autoDetectWindowHeight={false}
        contentStyle={contentStyle}
        overlayStyle={overlayStyle}
        zDepth={1}
        actions={actions}
        modal={false}
        open={this.props.dialogOpen}
        onRequestClose={this.props.closeDialog}
      >
        确认删除这个便签吗？ (不可恢复)
      </Dialog>
    )
  }
}


export default DelDialog
