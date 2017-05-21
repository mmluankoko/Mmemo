import React, { Component } from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import * as colors from 'material-ui/styles/colors'






class AdvancedBar extends Component {
  constructor(){
    super()
    this.state = {colorOpen:false}
    this.closeColor = this.closeColor.bind(this)
  }

  closeColor(){
    this.setState({colorOpen:false})
  }

  render(){
    const c =[ colors.red500,colors.pink500,colors.purple500,colors.deepPurple500,
             colors.indigo500,colors.blue500,colors.lightBlue500,colors.cyan500,
             colors.teal500,colors.green500,colors.lightGreen500,colors.lime500,
             colors.yellow500,colors.amber500,colors.orange500,colors.deepOrange500,
             colors.brown500,colors.blueGrey500,colors.grey500 ]
    let items = []
    for (let color of c) {
      items.push(<MenuItem key={getID()} primaryText="████" style={{color:color}} onClick={(e)=>{this.props.changeColor(color);this.closeColor();}}/>)
    }
    if (this.props.mode==='edit' && this.props.advancedMode) {
      return (
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <RaisedButton label="更改颜色" primary={true} onTouchTap={(e) => {
              this.setState({colorOpen: true,anchorEl: e.currentTarget})
            }}/>
            <Popover
              open={this.state.colorOpen}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.closeColor}
              animation={PopoverAnimationVertical}
            >
              <Menu desktop={true} maxHeight={this.props.getHeight() - 100} width={88} autoWidth={false}>
                {items}
              </Menu>
            </Popover>
          </ToolbarGroup>
        </Toolbar>
      )
    } else {
      return (<div></div>)}
  }
}

export default AdvancedBar
