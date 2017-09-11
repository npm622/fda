import {normalize, schema} from 'normalizr';
import {camelizeKeys} from 'humps';

const API_ROOT = 'fda/api/';

const callApi = (endpoint, schema) => {
  const fullEndpoint = (endpoint.indexOf(API_ROOT) === -1)
    ? API_ROOT + endpoint
    : endpoint;

  return fetch(fullEndpoint).then(res => {
    return res.json();
  }).then(json => {
    const camelizedJson = camelizeKeys(json);

    return normalize(camelizedJson, schema);
  });
};

const leagueSchema = new schema.Entity('leagues', {}, {
  idAttribute: league => league.id
});

const playerSchema = new schema.Entity('players', {}, {
  idAttribute: player => player.id
});

export const SCHEMAS = {
  LEAGUE: leagueSchema,
  LEAGUES: [leagueSchema],
  PLAYER: playerSchema,
  PLAYERS: [playerSchema]
}

export const CALL_API = 'Call API';

export default store => next => action => {
  const callApiAction = action[CALL_API];

  if (typeof callApiAction === 'undefined') {
    return next(action);
  }

  let {endpoint} = callApiAction;
  const {schema, types} = callApiAction;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }
  if (typeof endpoint !== 'string') {
    throw new Error('must specify an endpoint');
  }

  if (!schema) {
    throw new Error('must provide one of the exported schemas');
  }

  if (!Array.isArray(types)) {
    throw new Error('must provide an array of action types');
  } else if (types.length !== 3) {
    throw new Error('must provide three action types [ request, success, failure ]');
  } else if (!types.every(type => typeof type === 'string')) {
    throw new Error('must provide string action types');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType,
    successType,
    failureType] = types;
  next(actionWith({type: requestType}));

  return callApi(endpoint, schema).then(res => next(actionWith({payload: res, type: successType}))).catch(err => next(actionWith({
    error: err.message || 'unexpected error occurred.',
    type: failureType
  })));
};
