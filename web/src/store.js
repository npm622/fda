import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export default ( initialState ) => {
  console.log( 'inside store.js ... init state: ' + JSON.stringify( initialState ) );
  return createStore(
    rootReducer,
    applyMiddleware( thunk )
  );
}
