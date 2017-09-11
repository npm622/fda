import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createBrowserHistory, createMemoryHistory } from 'history';

const history = typeof window !== 'undefined' ?
  createBrowserHistory() : createMemoryHistory();

const Root = ( { store, router: Router } ) => (
  <Provider store={store}>
    <Router history={history} />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  router: PropTypes.func.isRequired
};

export default Root;
