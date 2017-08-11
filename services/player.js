const Promise = require( 'bluebird' );

const COLLECTION_NAME = 'players';

function PlayerService( database ) {
  'use strict';

  var _this = this;

  _this.coll = database.collection( COLLECTION_NAME );

  _this.upsertBatch = players => {
    return new Promise( ( resolve, reject ) => {

      const upserts = players.map( ( player ) => {
        return _this.upsert( player );
      } );

      Promise.all( upserts )
        .then( res => resolve( res ) )
        .catch( err => reject( err ) );
    } );
  };

  _this.upsert = player => {
    const query = {
      _id: player._id
    }

    const options = {
      upsert: true
    }

    return new Promise( ( resolve, reject ) => {
      _this.coll.update( query, player, options, ( err, res ) => {

        if ( err ) {
          console.log( 'error occured while upserting player...' );
          console.log( 'player: ' + JSON.stringify( player ) );
          console.log( 'err: ' + JSON.stringify( err ) );
          reject( err );
        }

        resolve( res );
      } );
    } );
  };

  _this.deleteAll = () => {
    const query = {};

    const options = {
      w: 1
    };

    return new Promise( ( resolve, reject ) => {
      _this.coll.remove( query, options, ( err, res ) => {

        if ( err ) {
          console.log( 'error occurred while deleting all players...' );
          console.log( 'err: ' + JSON.stringify( err ) );
          reject( err );
        }

        resolve( res );
      } );
    } );
  };
}

module.exports.PlayerService = PlayerService;
