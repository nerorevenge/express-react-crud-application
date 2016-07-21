import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import get from 'axios';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import {muiTheme} from './shittystuff.js';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 10,
  },
};

const serverAddress = 'http://localhost:4500/'

export class MyTable extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {showCheckboxes: false,
                  data:[]};
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount(){
    get(serverAddress)
        .then(results => this.setState({data: results.data}))
  }

  handleSelect(id){
    this.setState({showid:(id+1)});
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
        <Table onRowSelection={this.handleSelect}>
          <TableHeader adjustForCheckbox={this.state.showCheckboxes}
           displaySelectAll={this.state.showCheckboxes} >
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Rank</TableHeaderColumn>
              <TableHeaderColumn>Update or Delete</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={this.state.showCheckboxes}>
          {this.state.data.map( row =>
            <TableRow key={row.id}>
              <TableRowColumn><input key={row.id} type="text" value={row.name} /></TableRowColumn>
              <TableRowColumn>{row.rank}</TableRowColumn>
              <TableRowColumn>
                <FontIcon>home</FontIcon>
                <FontIcon>home</FontIcon>
                <FontIcon>home</FontIcon>
              </TableRowColumn>
            </TableRow>
          )}
          </TableBody>
        </Table>
        </div>
      </MuiThemeProvider>
    );
  }
};
