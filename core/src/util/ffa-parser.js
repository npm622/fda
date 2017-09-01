import csv from 'csvtojson';

const stringFields = [ '_id', 'name', 'team', 'pos' ];

const numerify = ( o ) => {
  Object.keys( o )
    .filter( p => o.hasOwnProperty( p ) )
    .forEach( p => {
      if ( typeof o[ p ] == "object" ) {
        numerify( o[ p ] );
      } else if ( stringFields.includes( p ) ) {
        // do nothing
      } else {
        o[ p ] = +o[ p ];
        if (!o[p]) {
          delete o[p];
        }
      }
    } );
}

const readPlayerData = () => {
  const playerMap = {};
  const players = [];

  return new Promise( ( resolve, reject ) => {
    csv()
      .fromFile( './data/analytics/raw_projections.csv' )
      .on( 'json', o => {

        const { playerId, player, team, position, ...rest } = o;
        playerMap[ playerId ] = {
          _id: playerId,
          name: player,
          team: team,
          pos: position,
          projections: { ...rest }
        };
      } )
      .on( 'done', e => {
        csv()
          .fromFile( './data/analytics/custom_rankings.csv' )
          .on( 'json', o => {
            const p = playerMap[ o.playerId ];
            if ( p ) {
              const { playerId, player, team, playerposition, age, exp, bye, overallRank, risk, ...rest } = o;
              p.age = age;
              p.exp = exp;
              p.bye = bye;
              p.overallRank = parseInt( overallRank );
              p.risk = risk;
              p.rankings = { ...rest };

              numerify(p);
              players.push(p);
            }
          } )
          .on( 'done', e => {
            resolve( players );
          } );
      } );
  } );
}

module.exports = {
  readPlayerData: readPlayerData
};
