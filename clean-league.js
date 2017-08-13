const Promise = require( 'bluebird' ),
  commander = require( 'commander' ),
  MongoClient = require( 'mongodb' ).MongoClient,
  LeagueService = require( './services/league' ).LeagueService,
  TeamService = require( './services/team' ).TeamService;

const program = commander
  .version( '0.0.0' )
  .option( '-l, --league-id [league id]', 'Specify the league id to clean up [ffc_2017]', 'ffc_2017' )
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

  const leagueService = new LeagueService( db );
  const teamService = new TeamService( db );

  teamService.findAllForLeague( program.leagueId )
    .then( teams => {

      const serviceCalls = teams.map( team => teamService.delete( program.leagueId, team.manager ) );
      serviceCalls.push( leagueService.delete( program.leagueId ) );

      Promise.all( serviceCalls )
        .then( response => console.log( 'successfully cleaned up league: ' + JSON.stringify( response ) ) )
        .catch( error => console.log( 'failed league cleanup: ' + JSON.stringify( error ) ) )
        .finally( () => db.close() );
    } )
    .catch( error => console.log( 'failed to find teams for league [ ' + program.leagueId + ' ]: ' + JSON.stringify( error ) ) );
} );

function connectionUrl( host, port, db ) {
  return 'mongodb://' + host + ':' + port + '/' + db;
}
