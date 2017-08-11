const commander = require( 'commander' ),
  MongoClient = require( 'mongodb' ).MongoClient,
  FdaService = require( './fda.service' ).FdaService;

const program = commander
  .version( '0.0.0' )
  // .option( '-d, --delete [_id1,_id2,_id3]', 'Comma-seperated list of team ids to delete', list, [] )
  .option( '-i, --id [_id]', 'Unique identifier for team' )
  .option( '-n, --name [name]', 'Team name' )
  .option( '-h, --host [hostname]', 'Specify the mongod hostname [localhost]', 'localhost' )
  .option( '-p, --port [port]', 'Specify the mongod port [27017]', parseInt, 27017 )
  .option( '-d, --db [db]', 'Specify the mongod db name [fda]', 'fda' )
  .parse( process.argv );

const mongoEndpoint = connectionUrl( program.host, program.port, program.db );
MongoClient.connect( mongoEndpoint, function( err, db ) {
  if ( err ) {
    console.log( 'failed to connect to mongodb...' );
    console.log( err );
    process.exit();
  }

  const fddService = new FdaService( db );

  new FdaService( db ).importTeam( program.id, program.name, true );
} );

function connectionUrl( host, port, db ) {
  return 'mongodb://' + host + ':' + port + '/' + db;
}
