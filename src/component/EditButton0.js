import React, { Component } from 'react'
import { white,red500 } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'


class EditButton extends Component {
  getItem(){
    console.log(this.props)
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
        iconButtonElement={<IconButton tooltip="菜单" tooltipPosition="bottom-left"><MoreVertIcon/></IconButton>}
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


export default EditButton
