import React, { Component } from 'react';
import './DraftBoard.css';
import PlayerList from './PlayerList';
import PlayerSelector from './PlayerSelector';
import TeamPanels from './TeamPanels';

class DraftBoard extends Component {

  constructor(props) {
    super(props);

    this.state = {  };

    this.playerSelected = this.playerSelected.bind(this);
  }

  componentDidMount() {
    fetch('/players')
      .then(res => res.json())
      .then(players => this.setState({players}));
  }

  playerSelected(selection) {
    const players = this.state.players.slice();
    players
      .filter(p => p._id === selection.playerId)
      .forEach(p => p.drafted = true);

    this.setState({
      players: players
    });
  }

  render() {
    const { league } = this.props;
    const { players } = this.state;

    return (
      <div className="DraftBoard">
        <div className="DraftBoard-Left">
          <PlayerSelector league={league} players={players} playerSelected={this.playerSelected} />
          <PlayerList players={players} />
        </div>
        <div className="DraftBoard-Right">
          <TeamPanels />
        </div>
      </div>
    );
  }
}

export default DraftBoard;
