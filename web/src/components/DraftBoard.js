import React, { Component } from 'react';
import './DraftBoard.css';
import PlayerList from './PlayerList';
import PlayerSelector from './PlayerSelector';
import TeamPanels from './TeamPanels';

const players = [
  { _id: 1, rank: 1, name: 'David Johnson', bye: 8 },
  { _id: 2, rank: 2, name: 'Leveon Bell', bye: 9 },
  { _id: 3, rank: 3, name: 'Tom Brady', bye: 10 }
];

class DraftBoard extends Component {

  constructor(props) {
    super(props);

    this.state = { players: players };

    this.playerSelected = this.playerSelected.bind(this);
  }

  playerSelected(playerName) {
    const players = this.state.players.slice();
    players
      .filter(p => p.name === playerName)
      .forEach(p => p.drafted = true);

    this.setState({
      players: players
    });
  }

  render() {
    return (
      <div className="DraftBoard">
        <h4>Draft Board: {this.props.leagueId}</h4>
        <br/>
        <PlayerSelector playerSelected={this.playerSelected} />
        <PlayerList players={this.state.players} />
        <TeamPanels />
      </div>
    );
  }
}

export default DraftBoard;
