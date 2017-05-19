import { white, cyan300 } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import PublishIcon from 'material-ui/svg-icons/editor/publish'
import React, { Component } from 'react'


class PinButton extends Component {
  render(){
    return (
      <IconButton
        tooltip="置顶"
        tooltipPosition="bottom-right"
        onClick={this.props.pinHandler}>
        <PublishIcon color={this.props.pinned ? white :  cyan300}/>
      </IconButton>
    )
  }
}


export default PinButton
