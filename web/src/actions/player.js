import * as actions from '../actions/types';
import FdaClient from '../client/FdaClient';

export const fetchAllPlayers = () => {
  return ( dispatch ) => {
    return FdaClient.fetchAllPlayers()
      .then( players => dispatch( fetchAllPlayersSuccess( players ) ) )
      .catch( err => {
        throw err;
      } );
  };
};

export const fetchAllPlayersSuccess = ( players ) => {
  return { type: actions.FETCH_ALL_PLAYERS_SUCCESS, players };
};
