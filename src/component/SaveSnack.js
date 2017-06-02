import React, { Component } from 'react'
import { white,lightBlack } from 'material-ui/styles/colors'
import Snackbar from 'material-ui/Snackbar';


class SaveSnack extends Component {
  render() {
    return (
      <Snackbar
          open={this.props.open}
          message="便签已保存"
          autoHideDuration={1500}
          onRequestClose={this.props.closeSaveSnack}
          style={{width:160,height:30}}
          bodyStyle={{height:30,lineHeight:'30px',backgroundColor:lightBlack}}
          contentStyle={{textAlign:'center'}}
        />
    )
  }
}


export default SaveSnack
