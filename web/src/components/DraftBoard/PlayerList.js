import React, { Component, PropTypes } from 'react';
import PlayerRow from './PlayerRow';

const PlayerList = ( { players } ) => {
  return (
    <ul>
      {players.map( player => (
        <PlayerRow player={player} />
      ) )}
    </ul>
  );
}

PlayerList.propTypes = {
  players: PropTypes.array.isRequired
};

export default PlayerList;
