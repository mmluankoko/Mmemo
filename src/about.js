import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { Card, CardActions, CardText } from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import baseTheme from './component/baseTheme'


class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(baseTheme())}>
          <Card zDepth={0}>
            <CardText style={{textAlign:'center'}}><strong>Mmemo</strong> is powered by</CardText>
            <div class='container electron' onClick={() => opn('https://electron.atom.io/')}>
              <img class='logo' src='../asset/electron-logo.svg'/>
            </div>
            <div class='container react' onClick={() => opn('https://facebook.github.io/react/')}>
              <img class='logo' src='../asset/react-logo.svg'/>
              <div class='logo-text'>React</div>
            </div>
            <div class='container material-ui' onClick={() => opn('http://www.material-ui.com/#/')}>
              <img class='logo' src='../asset/material-ui-logo.svg'/>
              <div class='logo-text'>Material-UI</div>
            </div>
            <CardText style={{textAlign:'center'}}>&copy; 2017 mmluankoko.</CardText>
            <CardActions style={{textAlign:'center'}}>
              <RaisedButton className='no-drag' label="关闭"
                          onClick={() => remote.getCurrentWindow().close()}/>
            </CardActions>
          </Card>
      </MuiThemeProvider>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'))
