import React, { Component } from 'react';
import './DraftBoard.css';
import PlayerSelector from './PlayerSelector';
import PlayerList from './PlayerList';
import TeamPanels from './TeamPanels';

class DraftBoard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="DraftBoard">
        <h4>Draft Board: {this.props.leagueId}</h4>
        <br/>
        <PlayerSelector />
        <PlayerList />
        <TeamPanels />
      </div>
    );
  }
}

export default DraftBoard;
