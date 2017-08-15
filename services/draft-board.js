const Promise = require( 'bluebird' );

const COLLECTION_NAME = 'draft_boards';

function DraftBoardService( database ) {
  'use strict';

  const _this = this;

  _this.coll = database.collection( COLLECTION_NAME );

  _this.newDraft = ( leagueId, isMock ) => {
    console.log( 'beginning ' + ( isMock ? 'mock ' + : '' ) + 'draft for league: ' + leagueId );

    const draftBoard = {
      leagueId: leagueId,
      isMock: isMock,
      isFinished: false
    }

    _this.coll.insert( draftBoard );
  };

  _this.finalizeDraft = leagueId => {
    console.log( 'completing draft for league: ' + leagueId );

    return _this.findActiveDraft( leagueId ).then( draftBoard => {
      draftBoard.isFinished = true;

      return _this.coll.update( {
        _id: draftBoard._id
      }, draftBoard );
    } );
  };

  _this.findActiveDraft = leagueId => {
    console.log( 'searching for active draft for league: ' + leagueId );

    const query = {
      leagueId: leagueId,
      isFinished: false
    }

    _this.coll.find( query );
  };
}

module.exports = {
  DraftBoardService: DraftBoardService
}
