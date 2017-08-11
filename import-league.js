const Promise = require( 'bluebird' ),
  commander = require( 'commander' ),
  yaml = require( 'js-yaml' ),
  fs = require( 'fs' ),
  MongoClient = require( 'mongodb' ).MongoClient,
  LeagueService = require( './services/league' ).LeagueService,
  TeamService = require( './services/team' ).TeamService;

const program = commander
  .version( '0.0.0' )
  .option( '-c, --config [config]', 'Specify the league config .yaml [./ffc_2017.yaml] file', './config/ffc_2017.yaml' )
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

  try {
    const config = yaml.safeLoad( fs.readFileSync( program.config, 'utf8' ) );

    config.league.numTeams = config.teams.length // set derived team count field

    const serviceCalls = config.teams.map( team => {
      team.leagueId = config.league._id;
      teamService.upsert( team );
    } );
    serviceCalls.push( leagueService.upsert( config.league ) );

    Promise.all( serviceCalls )
      .then( response => console.log( 'successfully imported league: ' + JSON.stringify( response ) ) )
      .catch( error => console.log( 'failed league import: ' + JSON.stringify( error ) ) )
      .finally( () => db.close() );
  } catch ( e ) {
    console.log( 'failed to read configuration file: ' + JSON.stringify( e ) );
  }
} );

function connectionUrl( host, port, db ) {
  return 'mongodb://' + host + ':' + port + '/' + db;
}
