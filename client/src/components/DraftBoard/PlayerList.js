import React from 'react';
import PropTypes from 'prop-types';
import PlayerRow from './PlayerRow';

const PlayerList = ( { players } ) => {
  return (
    <ul>
      {players.map( player => (
        <PlayerRow key={player.id} player={player} />
      ) )}
    </ul>
  );
}

PlayerList.propTypes = {
  players: PropTypes.array.isRequired
};

export default PlayerList;
