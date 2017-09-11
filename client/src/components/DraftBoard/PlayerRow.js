import React from 'react';
import PropTypes from 'prop-types';

const PlayerRow = ( { player } ) => {
  return (
    <li>{player.overallRank}. {player.name} ( bye: {player.bye}, age: {player.age} )</li>
  );
}

PlayerRow.propTypes = {
  player: PropTypes.object.isRequired
};

export default PlayerRow;
