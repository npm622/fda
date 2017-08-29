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

const newDraft = ( leagueId, draftOrder ) => {
  return findById( leagueId )
    .then( league => {
      if ( draftOrder ) {
        league.draftConfig.selectionOrder = draftOrder;
      }

      league.teams.forEach( team => delete team.players );

      league.draftBoard = { pick: 1, selections: [] };

      return db.leagues()
        .updateOne( { _id: leagueId }, league );
    } );
}

// FIXME: this is unused/not useful yet
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
          bye: player.bye,
          player: {
            id: player._id,
            name: player.name,
            team: player.team,
            pos: player.pos,
            bye: player.bye
          }
        }
      }
    } );
};

const newDraftSelection = ( leagueId, playerId, teamManager, winningBid ) => {
  return Promise.all( [ findById( leagueId ), PlayerService.findById( playerId ) ] )
    .then( results => {
      const [ league, player ] = results;

      const team = league.teams.filter( t => t.manager === teamManager )[ 0 ];

      if ( !team.players ) {
        team.players = [];
      }

      let nominatingTeam = "unknown";
      if (league.draftConfig.selectionOrder) {
        nominatingTeam = league.draftConfig.selectionOrder[(league.draftBoard.pick % league.teams.length) - 1];
      }

      const selection = {
        pick: league.draftBoard.pick,
        actors: {
          nominator: nominatingTeam,
          winner: team.manager,
        },
        price: winningBid,
        player: {
          id: player._id,
          name: player.name,
          team: player.team,
          pos: player.pos,
          bye: player.bye
        }
      }

      team.players.push( { price: selection.price, ...player } );

      league.draftBoard.pick++;
      league.draftBoard.selections.push( selection );

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
  newDraftNomination: newDraftNomination,
  newDraftSelection: newDraftSelection
};
