import React from 'react';
import {render} from 'react-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Root from './containers/Root';
import configureStore from './stores/configureStore';
import configureRouter from './routers/configureRouter';
import {loadLeagues, loadPlayers} from './actions';

const store = configureStore();
const router = configureRouter();

store.dispatch(loadLeagues());
store.dispatch(loadPlayers());

const renderApp = () => render(
  <Root store={store} router={router}/>,
   document.getElementById('root')
);

renderApp();

registerServiceWorker();
