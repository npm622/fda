import db from '../db';
import { PlayerService } from './';

const findAll = () => {
  return db.leagues()
    .find( {} )
    .toArray();
};

const findById = ( leagueId ) => {
  return db.leagues()
    .find( { _id: leagueId } )
    .limit( 1 )
    .next();
};

const upsert = ( league ) => {
  return db.leagues()
    .updateOne( { _id: league._id }, league, { upsert: true } );
}

const deleteAll = () => {
  return db.leagues()
    .deleteMany( {} );
}

const deleteById = ( leagueId ) => {
  return db.leagues()
    .deleteOne( { _id: leagueId } );
}

const newDraft = ( leagueId ) => {
  const updateOperations = { $set: { draftBoard: { pick: 1, selections: [] } } };

  return db.leagues()
    .updateOne( { _id: leagueId }, updateOperations )
}

const newDraftNomination = ( leagueId, playerId ) => {
  return Promise.all( [ findById( leagueId ), PlayerService.findById( playerId ) ] )
    .then( results => {
      const league = results[ 0 ];
      const player = results[ 1 ];

      return {
        pick: league.draftBoard.pick,
        player: {
          id: player._id,
          name: player.name,
          team: player.team,
          pos: player.pos,
          bye: player.bye
        }
      }
    } );
};

const newDraftSelection = ( leagueId, nomination, teamManager, winningBid ) => {
  return findById( leagueId )
    .then( league => {
      const team = league.teams.filter( t => t.manager === teamManager )[ 0 ];

      nomination.bid = {
        team: team.name, // TODO: this requires pulling the league and finding the team by manager first
        price: winningBid
      };

      if ( !team.players ) {
        team.players = [];
      }
      team.players.push( nomination.player );

      league.draftBoard.selections.push( nomination );

      return upsert( league );
    } );
}

module.exports = {
  findAll: findAll,
  findById: findById,
  upsert: upsert,
  deleteAll: deleteAll,
  deleteById: deleteById,
  newDraft: newDraft,
  newDraftNomination: newDraftNomination
};
