import React, { Component, PropTypes } from 'react';

const PlayerRow = ( { player } ) => {
  return (
    <li>{player.overallRank}. {player.name} ( bye: {player.bye}, age: {player.age} )</li>
  );
}

PlayerRow.propTypes = {
  player: PropTypes.object.isRequired
};

export default PlayerRow;
