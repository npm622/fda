import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory, createMemoryHistory } from 'history';

import Router from './router';
import Store from './store';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = Store();

const history = typeof window !== 'undefined' ?
  createBrowserHistory() : createMemoryHistory();

const renderApp = () =>
  render(
    <Provider store={store}>
      <Router history={history} />
    </Provider>,
    document.getElementById('app') );

renderApp();

registerServiceWorker();
