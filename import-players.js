const commander = require( 'commander' ),
  csv = require( 'csvtojson' ),
  MongoClient = require( 'mongodb' ).MongoClient,
  PlayerService = require( './services/player' ).PlayerService;

const program = commander
  .version( '0.0.0' )
  .option( '-r, --raw-projections [filename]', 'Specify the raw projections .csv file [ffa_rawprojections.csv]', './data/ffa_rawprojections.csv' )
  .option( '-c, --custom-rankings [filename]', 'Specify the custom rankings .csv file [ffa_customrankings.csv]', './data/ffa_customrankings.csv' )
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

  const playerMap = {};

  try {
    parseCsv( program.rawProjections )
      .then( rs => {

        rs.forEach( o => {
          playerMap[ o.playerId ] = {
            _id: o.playerId,
            name: o.player,
            team: o.team,
            pos: o.position,
            projections: parseProjections( o )
          }
        } );

        parseCsv( program.customRankings )
          .then( rs => {

            rs.forEach( o => {
              const player = playerMap[ o.playerId ];

              if ( !player ) {
                throw new Error( 'failed to find existing player in map: ' + o.playerId );
              }

              player.age = parseIntSafely( o.age );
              player.exp = parseIntSafely( o.exp );
              player.bye = parseIntSafely( o.bye );
              player.risk = parseFloatSafely( o.risk );
              player.ranks = parseRanks( o );
              player.ecr = parseEcr( o );
              player.pts = parsePts( o );
              player.vor = parseVor( o );
            } );

            const players = Object.keys( playerMap )
              .filter( ( playerId ) => playerMap.hasOwnProperty( playerId ) )
              .map( ( playerId ) => playerMap[ playerId ] );

            playerService.upsertBatch( players )
              .then( response => console.log( 'successfully bulk upserted players: ' + JSON.stringify( response ) ) )
              .catch( error => console.log( 'failed bulk players upsert: ' + JSON.stringify( error ) ) )
              .finally( () => db.close() );

          } )
          .catch( err => {
            console.log( 'failed to read custom rankings: ' + JSON.stringify( err ) ) ;
            db.close();
          } )
      } )
      .catch( err => {
        console.log( 'failed to read raw projections: ' + JSON.stringify( err ) );
        db.close();
      } )
  } catch ( e ) {
    console.log( 'failed player import: ' + JSON.stringify( e ) );
  }
} );

function connectionUrl( host, port, db ) {
  return 'mongodb://' + host + ':' + port + '/' + db;
}

function parseCsv( file ) {
  const rs = [];

  return new Promise( ( resolve, reject ) => {
    csv()
      .fromFile( file )
      .on( 'json', o => rs.push( o ) )
      .on( 'done', e => {
        if ( e ) {
          reject( e );
        }
        resolve( rs );
      } );
  } );
}

function parseIntSafely( val ) {
  const num = parseInt( val );
  if ( isNaN( num ) ) {
    return val;
  }
  return num;
}

function parseFloatSafely( val ) {
  const num = parseFloat( val );
  if ( isNaN( num ) ) {
    return val;
  }
  return num;
}

function parseProjections( o ) {
  return {
    games: parseIntSafely( o.games ),
    fumbles: parseFloatSafely( o.fumbles ),
    twoPts: parseFloatSafely( o.twoPts ),
    pass: {
      att: parseFloatSafely( o.passAtt ),
      inc: parseFloatSafely( o.passInc ),
      comp: parseFloatSafely( o.passComp ),
      compPct: parseFloatSafely( o.passCompPct ),
      tds: parseFloatSafely( o.passTds ),
      yds: parseFloatSafely( o.passYds ),
      ints: parseFloatSafely( o.passInt ),
      _300: parseFloatSafely( o.pass300 ),
      _350: parseFloatSafely( o.pass350 ),
      _400: parseFloatSafely( o.pass400 ),
      _40: parseFloatSafely( o.pass40 ),
      sacks: parseFloatSafely( o.sacks )
    },
    rush: {
      att: parseFloatSafely( o.rushAtt ),
      tds: parseFloatSafely( o.rushTds ),
      yds: parseFloatSafely( o.rushYds ),
      _100: parseFloatSafely( o.rush100 ),
      _150: parseFloatSafely( o.rush150 ),
      _200: parseFloatSafely( o.rush200 ),
      _40: parseFloatSafely( o.rush40 )
    },
    rec: {
      total: parseFloatSafely( o.rec ),
      tds: parseFloatSafely( o.recTds ),
      yds: parseFloatSafely( o.recYds ),
      _100: parseFloatSafely( o.rec100 ),
      _150: parseFloatSafely( o.rec150 ),
      _200: parseFloatSafely( o.rec200 ),
      _40: parseFloatSafely( o.rec40 )
    },
    fg: {
      att: parseFloatSafely( o.fgAtt ),
      miss: parseFloatSafely( o.fgMiss ),
      made: {
        total: parseFloatSafely( o.fg ),
        _0039: parseFloatSafely( o.fg0039 ),
        _0019: parseFloatSafely( o.fg0019 ),
        _2029: parseFloatSafely( o.fg2029 ),
        _3039: parseFloatSafely( o.fg3039 ),
        _4049: parseFloatSafely( o.fg4049 ),
        _50: parseFloatSafely( o.fg50 )
      },
      xp: parseFloatSafely( o.xp )
    },
    dst: {
      ptsAllow: parseFloatSafely( o.dstPtsAllow ),
      tds: parseFloatSafely( o.dstTd ),
      sacks: parseFloatSafely( o.dstSack ),
      fumbles: parseFloatSafely( o.dstFumlRec ),
      ints: parseFloatSafely( o.dstInt ),
      retTds: parseFloatSafely( o.dstRetTd ),
      blks: parseFloatSafely( o.dstBlk ),
      safeties: parseFloatSafely( o.dstSafety )
    },
    ret: {
      tds: parseFloatSafely( o.returnTds ),
      yds: parseFloatSafely( o.returnYds )
    },
    misc: {
      regTds: parseFloatSafely( o.regTds )
    }
  }
}

function parseRanks( o ) {
  return {
    overall: parseIntSafely( o.overallRank ),
    position: parseIntSafely( o.positionRank ),
    tier: parseIntSafely( o.tier ),
    stdDev: parseFloatSafely( o.sdRank ),
    sleeper: o.sleeper,
    adp: parseFloatSafely( o.adp ),
    adpDiff: parseFloatSafely( o.adpDiff ),
    aav: parseFloatSafely( o.auctionValue ),
    cost: parseFloatSafely( o.cost )
  }
}

function parseEcr( o ) {
  return {
    overall: parseFloatSafely( o.overallECR ),
    position: parseFloatSafely( o.positionECR )
  };
}

function parsePts( o ) {
  return {
    exp: parseFloatSafely( o.points ),
    low: parseFloatSafely( o.lower ),
    high: parseFloatSafely( o.upper ),
    spread: parseFloatSafely( o.ptSpread ),
    stdDev: parseFloatSafely( o.sdPts ),
    perGm: parseFloatSafely( o.ptsGame ),
    dropoff: parseFloatSafely( o.dropoff ),
  };
}

function parseVor( o ) {
  return {
    exp: parseFloatSafely( o.vor ),
    low: parseFloatSafely( o.vorLow ),
    high: parseFloatSafely( o.vorHigh ),
    perGm: {
      exp: parseFloatSafely( o.vorGame ),
      low: parseFloatSafely( o.vorGameLow ),
      high: parseFloatSafely( o.vorGameHigh )
    }
  };
}
