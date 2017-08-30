import React from 'react';
import './Player.css';

const Player = ({overallRank, name, bye}) => {
  return (
    <tr>
      <td>{overallRank}</td>
      <td>{name}</td>
      <td>{bye}</td>
    </tr>
  );
}

export default Player;
