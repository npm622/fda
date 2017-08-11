const Promise = require( 'bluebird' );

const COLLECTION_NAME = 'teams';

function TeamService( database ) {
  'use strict';

  var _this = this;

  _this.coll = database.collection( COLLECTION_NAME );

  _this.findAllForLeague = leagueId => {
    console.log( 'finding teams for league id: ' + leagueId );

    const query = {
      leagueId: leagueId
    };

    return new Promise( ( resolve, reject ) => {
      _this.coll.find( query ).toArray( ( err, teams ) => {

        if ( err ) {
          console.log( 'error occurred while finding all teams for league [ ' + leagueId + ' ]...' );
          console.log( 'err: ' + JSON.stringify( err ) );
          reject( err );
        }

        resolve( teams );
      } );
    } );
  };

  _this.upsert = team => {
    console.log( 'upserting team: ' + JSON.stringify( team ) );

    const query = {
      _id: team._id
    }

    const options = {
      upsert: true
    }

    return new Promise( ( resolve, reject ) => {
      _this.coll.update( query, team, options, ( err, res ) => {

        if ( err ) {
          console.log( 'error occured while upserting team...' );
          console.log( 'team: ' + JSON.stringify( team ) );
          console.log( 'err: ' + JSON.stringify( err ) );
          reject( err );
        }

        resolve( res );
      } );
    } );
  };

  _this.delete = teamId => {
    console.log( 'deleting team: ' + teamId );

    const query = {
      _id: teamId
    }

    const options = {
      single: true
    }

    return new Promise( ( resolve, reject ) => {
      _this.coll.remove( query, options, ( err, res ) => {

        if ( err ) {
          console.log( 'error occured while deleting team [ ' + teamId + ' ]...' );
          console.log( 'err: ' + JSON.stringify( err ) );
          reject( err );
        }

        resolve( res );
      } );
    } );
  };
}

module.exports.TeamService = TeamService;
