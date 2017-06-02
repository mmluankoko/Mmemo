import React, { Component } from 'react'
import FontIcon from 'material-ui/svg-icons/content/text-format';
import IconButton from 'material-ui/IconButton';


class FontButton extends Component {
  render(){
    return (
      <IconButton tooltip="字体" tooltipPosition="bottom-center"
        >
        <FontIcon />
      </IconButton>
    )
  }
}


export default FontButton
