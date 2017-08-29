import bodyParser from 'body-parser';
import express from 'express';
import db from './db';
import { LeagueController, PlayerController } from './controller';

const ROOT_CONTEXT_PATH = "/fda/api";

const app = express();
app.use( bodyParser.json() );

db.open().then( () => {
  const server = app.listen( 8080, 'localhost',
    () => console.log( 'INFO: webapp ready: ' + `http://${server.address().address}:${server.address().port}` ) );
} );

// league routes
app.get( `${ROOT_CONTEXT_PATH}/leagues`, LeagueController.findAll );
app.get( `${ROOT_CONTEXT_PATH}/leagues/:id`, LeagueController.findById );
app.put( `${ROOT_CONTEXT_PATH}/leagues/:id`, LeagueController.upsert );
app.delete( `${ROOT_CONTEXT_PATH}/leagues`, LeagueController.deleteAll );
app.delete( `${ROOT_CONTEXT_PATH}/leagues/:id`, LeagueController.deleteById );
app.post( `${ROOT_CONTEXT_PATH}/leagues/:id/draft-board`, LeagueController.newDraft );
app.put( `${ROOT_CONTEXT_PATH}/leagues/:leagueId/draft-board/:playerId/select`, LeagueController.newDraftSelection )
// FIXME: this is unused/not useful yet
app.post( `${ROOT_CONTEXT_PATH}/leagues/:leagueId/draft-board/:playerId/nominate`, LeagueController.newDraftNomination );

// player routes
app.get( `${ROOT_CONTEXT_PATH}/players`, PlayerController.findAll );
app.get( `${ROOT_CONTEXT_PATH}/players/:id`, PlayerController.findById );
app.put( `${ROOT_CONTEXT_PATH}/players/:id`, PlayerController.upsert );
app.delete( `${ROOT_CONTEXT_PATH}/players`, PlayerController.deleteAll );
app.delete( `${ROOT_CONTEXT_PATH}/players/:id`, PlayerController.deleteById );

// admin routes
app.put( `${ROOT_CONTEXT_PATH}/admin/players/clean-import`, PlayerController.cleanImport );
