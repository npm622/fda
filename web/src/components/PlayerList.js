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
    this.toggleShowDrafted = this.toggleShowDrafted.bind(this);
  }

  toggleShowDrafted( event ) {
    this.setState({showDrafted: !this.state.showDrafted})
  }

  render() {
    const {showDrafted} = this.state;

    const renderablePlayers = this.props.players.filter(player => this.state.showDrafted || !player.drafted);

    return (
      <div className="PlayerList">
        <label>Show drafted: <input type="checkbox" value="showDrafted" checked={showDrafted} onChange={this.toggleShowDrafted} /></label>
        <p>{renderablePlayers.length} players</p>
        <table>
          <thead>
            <tr>
              <th>rank</th>
              <th>name</th>
              <th>bye</th>
            </tr>
          </thead>
          <tbody>
            {renderablePlayers.map( ( o ) =>
                <Player key={o._id} {...o} />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PlayerList;
