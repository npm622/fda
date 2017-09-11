import React from 'react'
import { Router, Route, Switch } from 'react-router';

import App from '../containers/App';
import NotFound from '../containers/NotFound';
import DevTools from '../containers/DevTools';

const configureRouter = () => ( { history } ) => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route component={NotFound} />
      </Switch>
      <DevTools />
    </div>
  </Router>
);

export default configureRouter;
