import * as actions from '../actions';
import merge from 'lodash/merge';
import {combineReducers} from 'redux';

const db = (state = {
  leagues: {},
  players: {}
}, action) => {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities);
  }

  return state;
};

const err = (state = null, action) => {
  const {type, error} = action;

  if (type === actions.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return error;
  }

  return state;
};

const rootReducer = combineReducers({db, err});

export default rootReducer;
