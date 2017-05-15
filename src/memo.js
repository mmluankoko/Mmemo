import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';


import {red500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends Component {
  constructor() {
    super()
    this.data = window.__args__
    this.state = {}
    this.state.theme = getMuiTheme({
      appBar: {
        height: 30
      },
    });
    console.log(this.state)

  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.state.theme}>
        <div>
          <AppBar title={this.data.title} showMenuIconButton={false}/>
          <Card>
            <CardText>
              {this.data.content}
            </CardText>
          </Card>
        </div>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
