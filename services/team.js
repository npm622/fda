const Promise = require( 'bluebird' ),
  ObjectID = require( 'mongodb' ).ObjectID;

const COLLECTION_NAME = 'teams';

function TeamService( database ) {
  'use strict';

  var _this = this;

  _this.coll = database.collection( COLLECTION_NAME );

  _this.findOneForLeagueManager = ( leagueId, manager ) => {
    console.log( 'finding team: { ' + 'leagueId: ' + leagueId + ', ' + 'manager: ' + manager + ' }' );

    const query = {
      leagueId: leagueId,
      manager: manager
    }

    return new Promise( ( resolve, reject ) => {
      _this.coll.findOne( query, ( err, team ) => {

        if ( err ) {
          console.log( 'error occurred while finding team: { ' + 'leagueId: ' + leagueId + ', ' + 'manager: ' + manager + ' }...' );
          console.log( 'err: ' + JSON.stringify( err ) );
          reject( err );
        }

        resolve( team );
      } );
    } );
  }

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
      leagueId: team.leagueId,
      manager: team.manager
    };

    const options = {
      upsert: true
    };

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

  _this.delete = ( leagueId, manager ) => {
    console.log( 'deleting team: { ' + 'leagueId: ' + leagueId + ', ' + 'manager: ' + manager + " }" );

    const query = {
      leagueId: leagueId,
      manager: manager
    }

    const options = {
      single: true
    }

    return new Promise( ( resolve, reject ) => {
      _this.coll.remove( query, options, ( err, res ) => {

        if ( err ) {
          console.log( 'error occured while deleting team [ ' + manager + ' ]...' );
          console.log( 'err: ' + JSON.stringify( err ) );
          reject( err );
        }

        resolve( res );
      } );
    } );
  };
}

module.exports.TeamService = TeamService;;
