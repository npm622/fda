import {CALL_API, SCHEMAS} from '../middleware/api';

export const LEAGUE_REQUEST = 'LEAGUE_REQUEST';
export const LEAGUE_SUCCESS = 'LEAGUE_SUCCESS';
export const LEAGUE_FAILURE = 'LEAGUE_FAILURE';

const fetchLeague = (leagueId) => ({
  [CALL_API]: {
    types: [
      LEAGUE_REQUEST, LEAGUE_SUCCESS, LEAGUE_FAILURE
    ],
    endpoint: `leagues/${leagueId}`,
    schema: SCHEMAS.LEAGUE
  }
});

export const loadLeague = (leagueId, requiredFields = []) => (dispatch, getState) => {
  const league = getState().db.leagues[leagueId];

  if (league && requiredFields.every(key => league.hasOwnProperty(key))) {
    return null;
  }

  return dispatch(fetchLeague(leagueId));
};

export const LEAGUES_REQUEST = 'LEAGUES_REQUEST';
export const LEAGUES_SUCCESS = 'LEAGUES_SUCCESS';
export const LEAGUES_FAILURE = 'LEAGUES_FAILURE';

const fetchLeagues = (leagueId) => ({
  [CALL_API]: {
    types: [
      LEAGUES_REQUEST, LEAGUES_SUCCESS, LEAGUES_FAILURE
    ],
    endpoint: `leagues`,
    schema: SCHEMAS.LEAGUES
  }
});

export const loadLeagues = (leagueId, requiredFields = []) => (dispatch, getState) => {
  const leagues = getState().db.leagues;

  if (leagues && Object.keys(leagues).length !== 0) {
    const leagueList = Object.keys(leagues).filter(leagueId => leagues.hasOwnProperty(leagueId)).map(leagueId => leagues[leagueId]);

    if (leagueList.every(league => requiredFields.every(key => league.hasOwnProperty(key)))) {
      return null;
    }
  }

  return dispatch(fetchLeagues());
};

export const PLAYERS_REQUEST = 'PLAYERS_REQUEST';
export const PLAYERS_SUCCESS = 'PLAYERS_SUCCESS';
export const PLAYERS_FAILURE = 'PLAYERS_FAILURE';

const fetchPlayers = () => ({
  [CALL_API]: {
    types: [
      PLAYERS_REQUEST, PLAYERS_SUCCESS, PLAYERS_FAILURE
    ],
    endpoint: `players`,
    schema: SCHEMAS.PLAYERS
  }
});

export const loadPlayers = (requiredFields = []) => (dispatch, getState) => {
  const players = getState().db.players;

  if (players && Object.keys(players).length !== 0) {
    const playerList = Object.keys(players).filter(playerId => players.hasOwnProperty(playerId)).map(playerId => players[playerId]);

    if (playerList.every(player => requiredFields.every(key => player.hasOwnProperty(key)))) {
      return null;
    }
  }

  return dispatch(fetchPlayers());
};

export const PLAYER_REQUEST = 'PLAYER_REQUEST';
export const PLAYER_SUCCESS = 'PLAYER_SUCCESS';
export const PLAYER_FAILURE = 'PLAYER_FAILURE';

const fetchPlayer = (playerId) => ({
  [CALL_API]: {
    types: [
      PLAYER_REQUEST, PLAYER_SUCCESS, PLAYER_FAILURE
    ],
    endpoint: `players/${playerId}`,
    schema: SCHEMAS.PLAYER
  }
});

export const loadPlayer = (playerId, requiredFields = []) => (dispatch, getState) => {
  const player = getState().db.players[playerId];

  if (player && requiredFields.every(key => player.hasOwnProperty(key))) {
    return null;
  }

  return dispatch(fetchPlayer(playerId));
};

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export const resetErrorMessage = () => ({type: RESET_ERROR_MESSAGE});
