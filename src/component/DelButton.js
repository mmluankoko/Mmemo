import React, { Component } from 'react'
import { red400 } from 'material-ui/styles/colors'
import DelIcon from 'material-ui/svg-icons/action/delete-forever';
import IconButton from 'material-ui/IconButton';
import DelDialog from './DelDialog'


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
    return (
      <div>
        <DelDialog dialogOpen={this.state.dialogOpen} closeDialog={this.closeDialog} delHandler={this.props.delHandler}/>
        <IconButton tooltip="删除" tooltipPosition="bottom-left"
          onClick = {this.openDialog}>
          <DelIcon color={red400}/>
        </IconButton>
      </div>
    )
  }
}


export default DelButton
