import React, { Component } from 'react';
import './PlayerSelector.css';

class PlayerSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  render() {
    return (
      <form className="PlayerSelector" onSubmit={this.handleSubmit}>
        <label>Nominator: <input type="text" name="nominator" value={this.state.nominator} onChange={this.handleUpdate}/></label>
        <label>Player: <input type="text" name="player" value={this.state.player} onChange={this.handleUpdate}/></label>
        <label>Winner: <input type="text" name="winner" value={this.state.winner} onChange={this.handleUpdate}/></label>
        <label>Price: <input type="text" name="price" value={this.state.price} onChange={this.handleUpdate}/></label>
        <button type="submit">Select player</button>
      </form>
    );
  }

  handleSubmit(event) {
    const {playerSelected} = this.props;

    playerSelected(this.state.player);

    this.setState({ nominator: '', player: '', winner: '', price: '' });
    event.preventDefault();
  }

  handleUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
}

export default PlayerSelector;
