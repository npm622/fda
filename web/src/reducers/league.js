import * as actions from '../actions/types';
import initialState from './initial-state';

export default ( state = initialState.league, payload ) => {
  const { type, league, leagues } = payload;

  switch ( type ) {
    case actions.FETCH_ALL_LEAGUES_SUCCESS:
      return leagues;
    case actions.FETCH_LEAGUE_BY_ID_SUCCESS:
      return league;
    default:
      return state;
  }
}
