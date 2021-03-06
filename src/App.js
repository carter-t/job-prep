import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {connect} from 'react-redux';
import {getUser} from './ducks/reducer.js';

import Landing from './components/Landing/Landing.js';
import Navigation from './components/Navigation/Navigation.js';
import DashBoard from './components/DashBoard/DashBoard.js';

import Companies from './components/Companies/Companies.js';
import AllContacts from './components/AllContacts/AllContacts.js';
import Contacts from './components/Contacts/Contacts.js';
import JobResources from './components/JobResources/JobResources.js';
import Profile from './components/Profile/Profile';

import './App.css';

export class Wrapper extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="RoutesContainer">
          <Switch>
            <Route exact path="/" component={ DashBoard } />
            <Route path="/companies" component={ Companies } />
            <Route path="/allcontacts/" component={ AllContacts } />
            <Route path="/contacts/:id" component={ Contacts } />
            <Route path="/profile" component={ Profile } />
            <Route path="/resources" component={ JobResources } />
          </Switch>
        </div>
      </div>
    )
  }
}

class App extends Component {

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const checkStatus = () => {
      if(!this.props.user) {
        return (
          <Landing />
        )
      }
      else {
        return (
          <Router>
            <div>
              <Route path="/" component={ Wrapper } />
              <Route path="/landing" component={ Landing } />
            </div>
          </Router>
        )
      }
    }

    return (
      <div>
        {checkStatus()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {getUser})(App);