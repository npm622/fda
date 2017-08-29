import errors from '../util/errors';
import { LeagueService } from '../service';

const findAll = ( request, response ) => {
  LeagueService.findAll()
    .then( leagues => response.status( 200 ).json( leagues ) )
    .catch( error => errors.responseHandler( response, error.stack, `failed to get leagues: ${error.message}` ) );
};

const findById = ( request, response ) => {
  const leagueId = request.params.id;

  LeagueService.findById( leagueId )
    .then( league => response.status( 200 ).json( league ) )
    .catch( error => errors.responseHandler( response, error.stack, `failed to find league [ ${leagueId} ]: ${error.message}` ) );
};

const upsert = ( request, response ) => {
  const leagueId = request.params.id;
  const league = request.body;

  if ( !league._id ) {
    league._id = leagueId;
  }

  if ( leagueId !== league._id ) {
    errors.responseHandler( response, 'id mismatch between path variable and supplied document', 'invalid inputs: id mismatch' );
  } else {
    LeagueService.upsert( league )
      .then( result => response.status( 200 ).json( result ) ) // update: { "n": 1, "nModified": 1, "ok": 1 }; insert: { "n": 1, "nModified": 0, "upserted": [ { "index": 0, "_id": "chiphi_2017" } ], "ok": 1 }
      .catch( error => errors.responseHandler( response, error.stack, `failed to upsert league [ ${leagueId} ]: ${error.message}` ) );
  }
};

const deleteAll = ( request, response ) => {
  LeagueService.deleteAll()
    .then( result => response.status( 200 ).json( result ) ) // result: { "n": 3, "ok": 1 }
    .catch( error => errors.responseHandler( response, error.stack, `failed to delete leagues: ${error.message}` ) );
};

const deleteById = ( request, response ) => {
  const leagueId = request.params.id;

  LeagueService.deleteById( leagueId )
    .then( result => response.status( 200 ).json( result ) ) // result: { "n": 1, "ok": 1 }
    .catch( error => errors.responseHandler( response, error.stack, `failed to delete league [ ${leagueId} ]: ${error.message}` ) );
};

const newDraft = ( request, response ) => {
  const leagueId = request.params.id;

  LeagueService.newDraft( leagueId )
    .then( result => response.status( 200 ).json( result ) )
    .catch( error => errors.responseHandler( response, error.stack, `failed to start new draft board [ ${leagueId} ]: ${error.message}` ) );
};

// FIXME: this is unused/not useful yet
const newDraftNomination = ( request, response ) => {
  const leagueId = request.params.leagueId;
  const playerId = request.params.playerId;

  LeagueService.newDraftNomination( leagueId, playerId )
    .then( result => response.status( 200 ).json( result ) )
    .catch( error => errors.responseHandler( response, error.stack, `failed to nominate player [ ${playerId} ] for draft [ ${leagueId} ]: ${error.message}` ) );
};

const newDraftSelection = ( request, response ) => {
  const leagueId = request.params.leagueId;
  const playerId = request.params.playerId;
  const teamManager = request.query.teamManager;
  const winningBid = request.query.winningBid;

  LeagueService.newDraftSelection( leagueId, playerId, teamManager, winningBid )
    .then( result => response.status( 200 ).json( result ) )
    .catch( error => errors.responseHandler( response, error.stack, `failed to select player [ ${playerId} ] for draft [ ${leagueId} ]: ${error.message}` ) );
};

module.exports = {
  findAll: findAll,
  findById: findById,
  upsert: upsert,
  deleteAll: deleteAll,
  deleteById: deleteById,
  newDraft: newDraft,
  newDraftNomination: newDraftNomination,
  newDraftSelection: newDraftSelection
};
