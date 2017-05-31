import EditIcon from 'material-ui/svg-icons/image/edit'
import IconButton from 'material-ui/IconButton'
import React, { Component } from 'react'
import SaveIcon from 'material-ui/svg-icons/content/save'
import { white,lightBlack } from 'material-ui/styles/colors'
import Snackbar from 'material-ui/Snackbar';



class SaveSnack extends Component {
  render() {
    return (
      <Snackbar
          open={this.props.open}
          message="便签已保存"
          autoHideDuration={2000}
          onRequestClose={this.props.closeSaveSnack}
          style={{width:160,height:30}}
          bodyStyle={{height:30,lineHeight:'30px',backgroundColor:lightBlack}}
          contentStyle={{textAlign:'center'}}
        />
    )
  }
}


export default SaveSnack
