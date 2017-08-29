import React, { Component } from 'react';
import './PlayerList.css';
import Player from './Player';

class PlayerList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDrafted: false,
      playerFilter: 'ALL'
    }
  }

  render() {
    return (
      <ul className="PlayerList">
        {this.props.players
          .filter( ( o ) => {
            return !this.state.showDrafted && !o.drafted
          })
          .map( ( o, i ) => {
            return (
              <Player key={o.name} {...o} />
            );
          })
        }
      </ul>
    );
  }
}

export default PlayerList;
