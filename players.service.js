const Promise = require( 'bluebird' );

const COLLECTION_NAME = 'players';

function PlayersService( database ) {
  'use strict';

  var _this = this;

  _this.coll = database.collection( COLLECTION_NAME );

  _this.upsertMany = ( players ) => {
    return new Promise( ( resolve, reject ) => {
      const upserts = players.map( ( player ) => {
        return _this.upsertOne( player );
      } );

      Promise.all( upserts ).then( ( response ) => {
        resolve( response );
      } ).catch( ( error ) => {
        reject( error );
      } );
    } );
  }

  _this.upsertOne = ( player ) => {
    return new Promise( ( resolve, reject ) => {
      _this.coll.update( {
        _id: player._id
      }, player, {
        upsert: true
      }, ( err, status ) => {
        if ( err ) {
          reject( err );
        }
        resolve( status );
      } );
    } );
  }
}

module.exports.PlayersService = PlayersService;
