import React, { Component } from 'react';

class PlayerPool extends Component {

  constructor( props ) {
    super( props );

    this.state = {
      players: [
        'David Johnson', 'Leveon Bell', 'Tom Brady', 'David Johnson', 'Leveon Bell', 'Tom Brady', 'David Johnson', 'Leveon Bell', 'Tom Brady', 'David Johnson', 'Leveon Bell', 'Tom Brady', 'David Johnson', 'Leveon Bell', 'Tom Brady', 'David Johnson', 'Leveon Bell', 'Tom Brady'
      ]
    }

    this.onDraftPlayerToTeam = this.onDraftPlayerToTeam.bind( this );
  }

  onDraftPlayerToTeam( player ) {
    this.props.draftPlayer( player );
  }

  render() {
    const players = this.state.players.map( ( player ) => (
      <li>1. {player} ( bye: 9 )</li>
    ) );

    return (
      <div>
        <h2>Player Pool:</h2>
        <ul>
          {players}
        </ul>
      </div>
    )
  }
}

export default PlayerPool;
