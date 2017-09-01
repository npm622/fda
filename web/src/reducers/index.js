import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';

import leagueReducer from './league';
import playerReducer from './player';

export default combineReducers( {
  league: leagueReducer,
  players: playerReducer
} );
