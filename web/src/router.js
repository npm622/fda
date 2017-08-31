import React from 'react';
import { Router, Route, Switch } from 'react-router';

import App from './App';
import { Home, Sandbox, NotFound } from './pages';

const Routes = ( { history } ) => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/home" component={Home} />
        <Route path="/sandbox" component={Sandbox} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default Routes;
