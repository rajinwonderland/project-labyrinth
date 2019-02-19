import React, { Component } from 'react';
import Collections from './components/Collections';
import Grid from './components/Grid';
import Book from './components/Book';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, Drawer, List, ListItem } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import styled from 'tachyons-components';
import './App.css';

const Header = styled('h1')`lh-copy f3 fw2`;

const archiveTheme = getMuiTheme({
  fontFamily: 'Lato',
  palette: {
    primary1Color: '#1295ce',
    primary2Color: '#156685'
  }
});

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/archives' });
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

class App extends Component {
  state = {
    drawerOpen: false
  };
  handleOpen = () => {
    this.setState({ drawerOpen: true });
  };
  handleClose = () => {
    this.setState({ drawerOpen: false });
  };
  render() {
    return (
      <MuiThemeProvider muiTheme={archiveTheme}>
        <ApolloProvider client={client}>
          <Router>
            <div>
              <Drawer
                docked={false}
                open={this.state.drawerOpen}
                containerStyle={{ top: 64 }}
                onRequestChange={this.handleClose}
              >
                <List>
                  <ListItem primaryText="Books" containerElement={<Link to="/books" />} onClick={this.handleClose} />
                  <ListItem primaryText="Collections" containerElement={<Link to="/" />} onClick={this.handleClose} />
                  <ListItem primaryText="Home" containerElement={<Link to="/books" />} onClick={this.handleClose} />
                </List>
              </Drawer>
              <AppBar title={<Header>Novvum Labyrinth</Header>} onLeftIconButtonClick={this.handleOpen} />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Collections} />
                  <Route exact path="/books" component={Grid} />
                  <Route path="/book" component={Book} />
                </Switch>
              </div>
            </div>
          </Router>
        </ApolloProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
