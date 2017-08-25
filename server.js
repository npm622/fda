import bodyParser from 'body-parser';
import express from 'express';
import db from "./db";
import leagues from "./api/league";
import { ObjectID } from 'mongodb';

const ROOT_CONTEXT_PATH = "/fda/api";

const app = express();
app.use( bodyParser.json() );

db.open().then( () => {
    const server = app.listen( 8080, 'localhost',
      () => console.log( 'INFO: webapp ready: ' + `http://${server.address().address}:${server.address().port}` ) );
  } );

app.get(`${ROOT_CONTEXT_PATH}/leagues`, leagues.findAll);
app.get(`${ROOT_CONTEXT_PATH}/leagues/:id`, leagues.findById);
app.put(`${ROOT_CONTEXT_PATH}/leagues/:id`, leagues.put);
app.delete(`${ROOT_CONTEXT_PATH}/leagues`, leagues.deleteAll);
app.delete(`${ROOT_CONTEXT_PATH}/leagues/:id`, leagues.deleteById);
