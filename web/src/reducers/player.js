import * as actions from '../actions/types';
import initialState from './initial-state';

export default ( state = initialState.players, payload ) => {
  const {type, players} = payload;
  switch ( type ) {
    case actions.FETCH_ALL_PLAYERS_SUCCESS:
      return players;
    default:
      return state;
  }
}
