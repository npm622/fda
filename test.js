const csv = require( 'csvtojson' ),
  MongoClient = require( 'mongodb' ).MongoClient;

const RAW_PROJECTIONS = 'ffa_rawprojections2017-0.csv';
const CUSTOM_RANKINGS = 'ffa_customrankings2017-0.csv';

MongoClient.connect( 'mongodb://localhost:27017/fda', function( err, db ) {
  const playerMap = {};

  csv()
    .fromFile( RAW_PROJECTIONS )
    .on( 'json', ( o ) => {
      playerMap[ o.playerId ] = {
        _id: o.playerId,
        name: o.player,
        team: o.team,
        pos: o.position,
        projections: parseProjections( o )
      };
    } )
    .on( 'done', ( error ) => {
      csv()
        .fromFile( CUSTOM_RANKINGS )
        .on( 'json', ( o ) => {
          const player = playerMap[ o.playerId ];

          if ( !player ) {
            console.log( 'failed to find existing player in map:' );
            console.log( o );
            process.exit();
          }

          player.age = parseIntSafely( o.age );
          player.exp = parseIntSafely( o.exp );
          player.bye = parseIntSafely( o.bye );
          player.risk = parseFloatSafely( o.risk );
          player.ranks = parseRanks( o );
          player.ecr = parseEcr( o );
          player.pts = parsePts( o );
          player.vor = parseVor( o );
        } )
        .on( 'done', ( error ) => {
          const playerIds = [];
          for ( const playerId in playerMap ) {
            if ( playerMap.hasOwnProperty( playerId ) ) {
              playerIds.push( playerId );
            }
          }

          for ( let i = 0; i < playerIds.length; i++ ) {
            const player = playerMap[ playerIds[ i ] ];

            db.collection( 'players' ).update( {
              _id: player._id
            }, player, {
              upsert: true
            }, function( err, count, status ) {
              if ( i === playerIds.length - 1 ) {
                console.log( count );
                console.log( status );

                console.log( 'upserted ' + count + ' players.' );

                process.exit();
              }
            } );
          }
        } );
    } );
} );

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
