import React, { Component } from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import * as colors from 'material-ui/styles/colors'
import muiThemeable from 'material-ui/styles/muiThemeable';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ColorButton from './ColorButton';
import DelButton from './DelButton';
import SaveButton from './SaveButton';
import FontButton from './FontButton';


class AdvancedBar extends Component {
  constructor(){
    super()

  }


  render(){
    if (this.props.mode==='edit' && this.props.advancedMode) {
      return (
        <div style={{backgroundColor:this.props.muiTheme.palette.primary1Color}}>
          <Toolbar style={{backgroundColor:colors.lightBlack}}>
            <ToolbarGroup>
              <ColorButton getHeight={this.props.getHeight} changeColor={this.props.changeColor} />
            </ToolbarGroup>
            <ToolbarGroup>
              <FontButton />
            </ToolbarGroup>
            <ToolbarGroup>
              <SaveButton saveHandler={this.props.saveHandler}/>
            </ToolbarGroup>
            <ToolbarGroup lastChild={true}>
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
