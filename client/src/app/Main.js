/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import get from 'axios';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 10,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

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

export class MyTable extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {showCheckboxes: false,
                  data:[]};
  }

  componentDidMount(){
    get('http://localhost:4500/')
        .then(results => {console.log(results);this.setState({data: results.data})})
  }

  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
        <Table>
          <TableHeader adjustForCheckbox={this.state.showCheckboxes}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Rank</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={this.state.showCheckboxes}>
          {this.state.data.map( row =>
            <TableRow>
              <TableRowColumn>{row.name}</TableRowColumn>
              <TableRowColumn>{row.rank}</TableRowColumn>
            </TableRow>
          )}
          </TableBody>
        </Table>
        </div>
      </MuiThemeProvider>
    );
  }
};
