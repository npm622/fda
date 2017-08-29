import React, { Component } from 'react';
import './PlayerList.css';

class PlayerList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      players: [{rank: 1, name: 'David Johnson', bye: 8}, {rank: 2, name: 'Leveon Bell', bye: 11}, {rank: 3, name: 'Tom Brady', bye: 9}, {rank: 4, name: 'Brandin Cooks', bye: 9}]
    };
  }

  render() {
    return (
      <ul className="PlayerList">
        {this.state.players.map( ( o, i ) => {
          return (
            <li>{o.rank}: {o.name} ( bye: {o.bye} )</li>
          );
        })}
      </ul>
    );
  }
}

export default PlayerList;
