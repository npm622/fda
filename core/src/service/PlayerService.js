import db from '../db';

const findAll = () => {
  return db.players()
    .find( {} )
    .sort( { overallRank: 1 } )
    .toArray();
};

const findById = ( playerId ) => {
  return db.players()
    .find( { _id: playerId } )
    .limit( 1 )
    .next();
};

const upsert = ( player ) => {
  return db.players()
    .updateOne( { _id: player._id }, player, { upsert: true } );
}

const deleteAll = () => {
  return db.players()
    .deleteMany( {} );
}

const deleteById = ( playerId ) => {
  return db.players()
    .deleteOne( { _id: playerId } );
}

const reset = ( players ) => {
  return deleteAll()
    .then( result => {
      return db.players().insertMany( players );
    } );
}

module.exports = {
  findAll: findAll,
  findById: findById,
  upsert: upsert,
  deleteAll: deleteAll,
  deleteById: deleteById,
  reset: reset
};
