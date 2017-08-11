const Promise = require( 'bluebird' );

const COLLECTION_NAME = 'leagues';

function LeagueService( database ) {
  'use strict';

  const _this = this;

  _this.coll = database.collection( COLLECTION_NAME );

  _this.upsert = ( league ) => {
    console.log( 'upserting league: ' + JSON.stringify( league ) );

    const query = {
      _id: league._id
    }

    const options = {
      upsert: true
    }

    return new Promise( ( resolve, reject ) => {
      _this.coll.update( query, league, options, ( err, res ) => {

        if ( err ) {
          console.log( 'error occured while upserting league...' );
          console.log( 'league: ' + JSON.stringify( league ) );
          console.log( 'err: ' + JSON.stringify( err ) );
          reject( err );
        }

        resolve( res );
      } );
    } );
  };

  _this.delete = leagueId => {
    console.log( 'deleting league: ' + leagueId );

    const query = {
      _id: leagueId
    }
    return new Promise( ( resolve, reject ) => {
      _this.coll.deleteOne( query, ( err, res ) => {

        if ( err ) {
          console.log( 'error occured while deleting league [ ' + leagueId + ' ]...' );
          console.log( 'err: ' + JSON.stringify( err ) );
          reject( err );
        }

        resolve( res );
      } );
    } );
  };
}

module.exports.LeagueService = LeagueService
