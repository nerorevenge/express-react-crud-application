/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {muiTheme} from './shittystuff.js';

export class Bar extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
         <AppBar showMenuIconButton={false} />
      </MuiThemeProvider>
    );}

};
