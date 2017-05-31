import CheckIcon from 'material-ui/svg-icons/navigation/check';
import IconButton from 'material-ui/IconButton';
import React, { Component } from 'react'
import {green400} from 'material-ui/styles/colors'



class SaveButton extends Component {
  render(){
    return (
      <IconButton tooltip="保存" tooltipPosition="bottom-center"
        onClick = {this.props.saveHandler}>
        <CheckIcon color={green400}/>
      </IconButton>
    )
  }

}


export default SaveButton
