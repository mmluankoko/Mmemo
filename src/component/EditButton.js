import EditIcon from 'material-ui/svg-icons/image/edit'
import IconButton from 'material-ui/IconButton'
import React, { Component } from 'react'
import SaveIcon from 'material-ui/svg-icons/content/save'
import { white,lightWhite } from 'material-ui/styles/colors'



class EditButton extends Component {
  render() {
    if (this.props.mode === 'edit') {
      return (
        <IconButton className='no-drag' tooltip="编辑模式" tooltipPosition="bottom-left" onClick={this.props.exitHandler}><EditIcon color={white}/></IconButton>
      )
    }
    else if (this.props.mode === 'normal') {
      return (
        <IconButton className='no-drag' tooltip="编辑模式" tooltipPosition="bottom-left" onClick={this.props.editHandler}><EditIcon color={lightWhite}/></IconButton>
      )
    }
    else if (this.props.mode === 'lock') {
      return (<div></div>)
    }
  }
}


export default EditButton
