import { combineReducers } from 'redux';

import leagueReducer from './league';
import playerReducer from './player';

export default combineReducers( {
  leagues: leagueReducer,
  players: playerReducer
} );
