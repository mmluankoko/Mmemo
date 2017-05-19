import ClearIcon from 'material-ui/svg-icons/content/clear';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import React, { Component } from 'react'


class DelButton extends Component {
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
        <FloatingActionButton zDepth={0} secondary={true} style={style}
          iconStyle={{width:'16px',height:'16px'}}
          onClick = {this.props.delHandler}
        >
          <ClearIcon style={{height:'16px',width:'16px'}}/>
        </FloatingActionButton>
      )
    } else {
      return (<div></div>)
    }
  }
}


export default DelButton
