import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './DraftBoard.css';
import SelectionPanel from './SelectionPanel';
import PlayerList from './PlayerList';
import TeamGrid from './TeamGrid';

class DraftBoard extends Component {
  constructor(props) {
    super(props);

    const {leagueId, findLeagueById, playerIds, findPlayerById} = props;

    this.state = {
      league: findLeagueById(leagueId),
      players: playerIds.map(id => findPlayerById(id))
    }

    this.selectPlayer = this.selectPlayer.bind(this);
  }

  render() {
    const {league, players} = this.state;

    return (
      <div className="DraftBoard">
        <div className="DraftBoard-players">
          <SelectionPanel selectPlayer={this.selectPlayer}/>
          <hr/>
          <PlayerList players={players}/>
        </div>
        <div className="DraftBoard-teams">
          <div>
            <p>this is the top space before teams will be listed. a toolbar or similar functionality could be placed here.</p>
          </div>
          <TeamGrid teams={league.teams}/>
        </div>
      </div>
    );
  }

  findTeam(manager) {
    return this.state
  }

  selectPlayer(selection) {
    console.log('received selected player data: ' + JSON.stringify(selection));
    const {teams, playerPool, draftBoard} = this.state;

    const player = {
      id: selection.playerId,
      price: selection.price
    };

    playerPool.filter(p => p.id === selection.playerId).forEach(p => {
      p.drafted = true;

      player.name = p.name;
      player.team = p.team;
      player.pos = p.pos;
      player.bye = p.bye;
    });

    teams.filter(team => team.manager === selection.selector).forEach(team => {
      if (!team.players) {
        team.players = [];
      }
      teams.players.push(player);
    })

    draftBoard.selections.push(player);

    console.log(this.state.teams);
  }
};

DraftBoard.defaultProps = {}

DraftBoard.propTypes = {
  leagueId: PropTypes.string.isRequired,
  findLeagueById: PropTypes.func.isRequired,
  playerIds: PropTypes.array.isRequired,
  findPlayerById: PropTypes.func.isRequired
};

export default DraftBoard;
