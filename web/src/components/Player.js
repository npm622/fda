import React, { Component } from 'react';
import './Player.css';

const Player = ({rank, name, bye}) => {
  return (
    <li className="Player">{rank}: {name} ( bye: {bye} )</li>
  );
}

export default Player;
