import React, { Component } from 'react'
import { lightBlack } from 'material-ui/styles/colors'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ColorButton from './ColorButton';
import DelButton from './DelButton';
import FontButton from './FontButton';
import SaveButton from './SaveButton';


class AdvancedBar extends Component {
  render(){
    if (this.props.mode==='edit') {
      return (
        <div style={{backgroundColor:this.props.muiTheme.palette.primary1Color}}>
          <Toolbar style={{backgroundColor:lightBlack}}>
            <ToolbarGroup>
              <ColorButton getHeight={this.props.getHeight} changeColor={this.props.changeColor} />
            </ToolbarGroup>
            <ToolbarGroup>
              <FontButton />
            </ToolbarGroup>
            <ToolbarGroup>
              <SaveButton saveHandler={this.props.saveHandler}/>
            </ToolbarGroup>
            <ToolbarGroup lastChild={false}>
              <DelButton delHandler={this.props.delHandler}/>
            </ToolbarGroup>
          </Toolbar>
        </div>
      )
    } else {
      return (<div></div>)}
  }
}


export default muiThemeable()(AdvancedBar)
