import { MongoClient } from 'mongodb';

const DB_NAME = 'fda';
const MONGODB_CONNECTION_URL = `mongodb://127.0.0.1:27017/${DB_NAME}`;

const LEAGUES_COLLECTION = 'leagues',
  PLAYERS_COLLECTION = 'players',
  TEAMS_COLLECTION = 'teams',
  DRAFT_BOARDS_COLLECTION = 'draft_boards';

const state = {};

const openSuccess = db => {
  console.log( `INFO: database ready: ${MONGODB_CONNECTION_URL}` );
  state.db = db;
};

const closeSuccess = () => {
  console.log( 'INFO: successfully closed database' );
  delete state.db;
};

const openFailure = err => {
  console.log( `ERROR: database unavailable ... ${err.stack}` );
  process.exit( 1 );
};

const closeFailure = err => {
  console.log( `ERROR: failed to close database: ${err.stack}` );
  process.exit( 1 );
}

const open = () => {
  if (state.db) {
    console.log( 'WARN: database is already open' );
    return Promise.resolve();
  } else {
    return MongoClient.connect( MONGODB_CONNECTION_URL )
      .then( openSuccess )
      .catch( openFailure );
  }
}

const close = () => {
  if ( state.db ) {
    db.close()
      .then( closeSuccess )
      .catch( closeFailure );
  } else {
    console.log( 'WARN: no database left to close' );
  }
}

const leagues = () => state.db.collection( LEAGUES_COLLECTION );
const players = () => state.db.collection( PLAYERS_COLLECTION );
const teams = () => state.db.collection( TEAMS_COLLECTION );
const draftBoards = () => state.db.collection( DRAFT_BOARDS_COLLECTION );

module.exports = {
  open: open,
  close: close,
  leagues: leagues,
  players: players,
  teams: teams,
  draftBoards: draftBoards
};
