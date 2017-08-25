import db from "../db";
import errors from "./errors";

const findAll = ( request, response ) => {
  const query = {};
  const cursor = db.leagues().find( query );

  cursor.toArray()
    .then( leagues => response.status( 200 ).json( leagues ) )
    .catch( error => errors.responseHandler( response, error.stack, `failed to get leagues: ${error.message}` ) );
}

const findById = ( request, response ) => {
  const leagueId = request.params.id;

  const query = { _id: leagueId };
  const cursor = db.leagues().find( query ).limit( 1 );

  cursor.next()
    .then( league => response.status( 200 ).json( league ) )
    .catch( error => errors.responseHandler( response, error.stack, `failed to find league [ ${leagueId} ]: ${error.message}` ) );
}

const put = ( request, response ) => {
  const leagueId = request.params.id;
  const league = request.body;

  if ( !league._id ) {
    league._id = leagueId;
  }

  if ( leagueId !== league._id ) {
    errors.responseHandler( response, 'id mismatch between path variable and supplied document', 'invalid inputs: id mismatch' );
  } else {
    const filter = { _id: leagueId };
    const options = { upsert: true };

    db.leagues().updateOne( filter, league, options )
      .then( result => response.status( 200 ).json( result ) ) // update: { "n": 1, "nModified": 1, "ok": 1 }; insert: { "n": 1, "nModified": 0, "upserted": [ { "index": 0, "_id": "chiphi_2017" } ], "ok": 1 }
      .catch( error => errors.responseHandler( response, error.stack, `failed to upsert league [ ${leagueId} ]: ${error.message}` ) );
  }
}

const deleteAll = ( request, response ) => {
  const filter = {};
  const options = {};

  db.leagues().deleteMany( filter, options )
    .then( result => response.status( 200 ).json( result ) ) // result: { "n": 3, "ok": 1 }
    .catch( error => errors.responseHandler( response, error.stack, `failed to delete leagues: ${error.message}` ) );
}

const deleteById = ( request, response ) => {
  const leagueId = request.params.id;

  const filter = { _id: leagueId };
  const options = {};

  db.leagues().deleteOne( filter, options )
    .then( result => response.status( 200 ).json( result ) ) // result: { "n": 1, "ok": 1 }
    .catch( error => errors.responseHandler( response, error.stack, `failed to delete league [ ${leagueId} ]: ${error.message}` ) );
}

module.exports = {
  findAll: findAll,
  findById: findById,
  put: put,
  deleteAll: deleteAll,
  deleteById: deleteById
};
