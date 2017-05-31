import { white,lightWhite } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import PublishIcon from 'material-ui/svg-icons/editor/publish'
import React, { Component } from 'react'



class PinButton extends Component {
  render(){
    return (
      <IconButton
        tooltip="置顶"
        tooltipPosition="bottom-right"
        onClick={this.props.pinHandler}
        className='no-drag'>
        <PublishIcon color={this.props.pinned ? white : lightWhite}/>
      </IconButton>
    )
  }
}


export default PinButton
