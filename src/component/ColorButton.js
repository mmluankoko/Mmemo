import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import * as colors from 'material-ui/styles/colors'
import muiThemeable from 'material-ui/styles/muiThemeable';
import ColorIcon from 'material-ui/svg-icons/image/color-lens';


class ColorButton extends Component {
  constructor(){
    super()
    this.state = {colorOpen:false}
    this.closeColor = this.closeColor.bind(this)
  }

  closeColor(){
    this.setState({colorOpen:false})
  }

  render(){
    const c =[ colors.red300,colors.pink300,colors.purple300,colors.deepPurple300,
             colors.indigo300,colors.blue300,colors.lightBlue300,colors.cyan300,
             colors.teal300,colors.green300,colors.lightGreen300,colors.lime300,
             colors.yellow300,colors.amber300,colors.orange300,colors.deepOrange300,
             colors.brown300,colors.blueGrey300,colors.grey300 ]
    let items = []
    for (let color of c) {
      items.push(<MenuItem key={getID()} primaryText="████" style={{color:color}} onClick={(e)=>{this.props.changeColor(color);this.closeColor();}}/>)
    }

    return (
      <div>
        <IconButton tooltip="主题" tooltipPosition="bottom-right"
          onClick={(e) => {this.setState({colorOpen: true,anchorEl: e.currentTarget})}}>
          <ColorIcon />
        </IconButton>
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
      </div>
    )
  }
}

export default muiThemeable()(ColorButton)
