import * as actions from '../actions/types';
import FdaClient from '../client/FdaClient';

export const fetchAllLeagues = () => {
  return ( dispatch ) => {
    return FdaClient.fetchAllLeagues()
      .then( leagues => dispatch( fetchAllLeaguesSuccess( leagues ) ) )
      .catch( err => {
        throw err;
      } );
  };
};

export const fetchAllLeaguesSuccess = ( leagues ) => {
  return { type: actions.FETCH_ALL_LEAGUES_SUCCESS, leagues };
};

export const fetchLeagueById = ( leagueId ) => {
  return ( dispatch ) => {
    return FdaClient.fetchLeagueById( leagueId )
      .then( league => dispatch( fetchLeagueByIdSuccess( league ) ) )
      .catch( err => {
        throw err;
      } );
  };
};

export const fetchLeagueByIdSuccess = ( league ) => {
  return { type: actions.FETCH_LEAGUE_BY_ID_SUCCESS, league };
};
