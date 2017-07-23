const commander = require( 'commander' ),
  MongoClient = require( 'mongodb' ).MongoClient,
  FdaService = require( './fda.service' ).FdaService;

const program = commander
  .version( '0.0.0' )
  .option( '-r, --raw-projections [filename]', 'Specify the raw projections .csv file [ffa_rawprojections.csv]', 'ffa_rawprojections.csv' )
  .option( '-c, --custom-rankings [filename]', 'Specify the custom rankings .csv file [ffa_customrankings.csv]', 'ffa_customrankings.csv' )
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

  new FdaService( db ).importPlayersFromFfa( program.rawProjections, program.customRankings, true );
} );

function connectionUrl( host, port, db ) {
  return 'mongodb://' + host + ':' + port + '/' + db;
}
