const Promise = require( 'bluebird' ),
  commander = require( 'commander' ),
  MongoClient = require( 'mongodb' ).MongoClient,
  PlayerService = require( './services/player' ).PlayerService;

const program = commander
  .version( '0.0.0' )
  .option( '-h, --host [hostname]', 'Specify the mongod hostname [localhost]', 'localhost' )
  .option( '-p, --port [port]', 'Specify the mongod port [27017]', parseInt, 27017 )
  .option( '-d, --db [db]', 'Specify the mongod db name [fda]', 'fda' )
  .parse( process.argv );

const mongoServiceUrl = connectionUrl( program.host, program.port, program.db )
MongoClient.connect( mongoServiceUrl, ( err, db ) => {

  if ( err ) {
    console.log( 'failed to connect to mongodb: ' + JSON.stringify( err ) );
    process.exit();
  }

  const playerService = new PlayerService( db );

  playerService.deleteAll()
    .then( response => console.log( 'successfully cleaned up players: ' + JSON.stringify( response ) ) )
    .catch( error => console.log( 'failed players cleanup: ' + JSON.stringify( error ) ) )
    .finally( () => db.close() );
} );

function connectionUrl( host, port, db ) {
  return 'mongodb://' + host + ':' + port + '/' + db;
}
