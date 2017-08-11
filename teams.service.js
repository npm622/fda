const Promise = require( 'bluebird' );

const COLLECTION_NAME = 'teams';

function TeamsService( database ) {
  'use strict';

  var _this = this;

  _this.coll = database.collection( COLLECTION_NAME );

  _this.upsertOne = ( team ) => {
    return new Promise( ( resolve, reject ) => {
      _this.coll.update( {
        _id: team._id
      }, team, {
        upsert: true
      }, ( err, status ) => {
        if ( err ) {
          reject( err );
        }
        resolve( status );
      } );
    } );
  }

  _this.deleteOne = ( teamId ) => {
    return new Promise( ( resolve, reject ) => {
      _this.coll.deleteOne( {
        _id: teamId
      }, ( err, status ) => {
        if ( err ) {
          reject( err );
        }
        resolve( status );
      } );
    } );
  };
}

module.exports.TeamsService = TeamsService;
