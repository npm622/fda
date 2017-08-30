import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './PlayerSelector.css';

class PlayerSelector extends Component {

  constructor(props) {
    super(props);

    this.determineNominator = this.determineNominator.bind(this);
    this.playerSelected = this.playerSelected.bind(this);
    this.winnerSelected = this.winnerSelected.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  determineNominator() {
    const { league } = this.props;

    const { pick } = league.draftBoard;
    const { selectionOrder } = league.draftConfig;

    return selectionOrder[(pick % selectionOrder.length) - 1];
  }

  render() {
    const teams = this.props.league.draftConfig.selectionOrder.map( team => { return {value: team, label: team}; } );
    const players = this.props.players.map(player => { return {value: player._id, label: `${player.name} - ${player.pos} ( ${player.team} )`, disabled: !!player.drafted }})

    return (
      <form className="PlayerSelector" onSubmit={this.handleSubmit}>
        <label>Nominator: <input type="text" readonly name="nominator" value={this.state.nominator} onChange={this.handleUpdate}/></label><br />
        <label>Player: <Select name="player" value={this.state.player} options={players} onChange={this.playerSelected} /></label><br />
        <label>Winner: <Select name="winner" value={this.state.winner} options={teams} onChange={this.winnerSelected} /></label><br />
        <label>Price: <input type="text" name="price" value={this.state.price} onChange={this.handleUpdate}/></label><br />
        <button type="submit">Select player</button>
      </form>
    );
  }

  playerSelected(val) {
    this.setState({player: val});
  }

  winnerSelected(val) {
    this.setState({winner: val});
  }

  handleSubmit(event) {
    const {playerSelected} = this.props;
    const { nominator, player, winner, price } = this.state;

    playerSelected({ nominator, playerId: player.value, winner: winner.value, price });

    this.setState({ nominator: '', player: '', winner: '', price: '' });
    event.preventDefault();
  }

  handleUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
}

export default PlayerSelector;
