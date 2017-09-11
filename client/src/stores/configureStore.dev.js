import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const configureStore = preLoadedState => {
  const store = createStore(
    rootReducer,
    preLoadedState,
    compose(
      applyMiddleware(thunk, api, createLogger()),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
