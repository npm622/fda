import { PlayerService } from '../service';
import errors from '../util/errors';
import ffaParser from '../util/ffa-parser';

const findAll = ( request, response ) => {
  PlayerService.findAll()
    .then( players => response.status( 200 ).json( players ) )
    .catch( error => errors.responseHandler( response, error.stack, `failed to get players: ${error.message}` ) );
}

const findById = ( request, response ) => {
  const playerId = request.params.id;

  PlayerService.findById( playerId )
    .then( player => response.status( 200 ).json( player ) )
    .catch( error => errors.responseHandler( response, error.stack, `failed to find player [ ${playerId} ]: ${error.message}` ) );
}

const upsert = ( request, response ) => {
  const playerId = request.params.id;
  const player = request.body;

  if ( !player._id ) {
    player._id = playerId;
  }

  if ( playerId !== player._id ) {
    errors.responseHandler( response, 'id mismatch between path variable and supplied document', 'invalid inputs: id mismatch' );
  } else {
    PlayerService.upsert( player )
      .then( result => response.status( 200 ).json( result ) ) // update: { "n": 1, "nModified": 1, "ok": 1 }; insert: { "n": 1, "nModified": 0, "upserted": [ { "index": 0, "_id": "chiphi_2017" } ], "ok": 1 }
      .catch( error => errors.responseHandler( response, error.stack, `failed to upsert player [ ${playerId} ]: ${error.message}` ) );
  }
}

const deleteAll = ( request, response ) => {
  PlayerService.deleteAll()
    .then( result => response.status( 200 ).json( result ) ) // result: { "n": 3, "ok": 1 }
    .catch( error => errors.responseHandler( response, error.stack, `failed to delete players: ${error.message}` ) );
}

const deleteById = ( request, response ) => {
  const playerId = request.params.id;

  PlayerService.deleteById( playerId )
    .then( result => response.status( 200 ).json( result ) ) // result: { "n": 1, "ok": 1 }
    .catch( error => errors.responseHandler( response, error.stack, `failed to delete player [ ${playerId} ]: ${error.message}` ) );
}

const cleanImport = ( request, response ) => {
  ffaParser.readPlayerData()
    .then( players => {
      PlayerService.reset( players )
        .then( result => response.status( 200 ).json( result ) );
    } )
    .catch( error => errors.responseHandler( response, error.stack, `failed to perform clean import for players: ${error.message}` ) );
}

module.exports = {
  findAll: findAll,
  findById: findById,
  upsert: upsert,
  deleteAll: deleteAll,
  deleteById: deleteById,
  cleanImport: cleanImport
};
