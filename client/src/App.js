// App.js

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './components/create.component';
import Edit from './components/edit.component';
import SearchId from './components/search.component';
import SearchPhone from './components/searchphone.component';
import Index from './components/index.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">MThree</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
				<li className="nav-item">
                  <Link to={'/edit/:id'} className="nav-link">Edit</Link>
                </li>
				<li className="nav-item">
                  <Link to={'/search/id/'} className="nav-link">Search By Id</Link>
                </li>
				<li className="nav-item">
                  <Link to={'/search/phone/'} className="nav-link">Search By Phone Number</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link">Index</Link>
                </li>
              </ul>
            </div>
          </nav> <br/>
          <h2>Customer API</h2> <br/>
          <Switch>
              <Route path='/create' component={ Create } />
              <Route path='/edit' component={ Edit } />
			  <Route path='/search/id' component={ SearchId } />
			  <Route path='/search/phone' component={ SearchPhone } />
              <Route path='/index' component={ Index } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;