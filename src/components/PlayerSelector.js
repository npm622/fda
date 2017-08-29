import React, { Component } from 'react';

class PlayerSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Nominator: <input type="text" value={this.state.nominator} onChange={this.handleChange}/></label>
        <label>Player: <input type="text" value={this.state.player} onChange={this.handleChange}/></label>
        <label>Winner: <input type="text" value={this.state.winner} onChange={this.handleChange}/></label>
        <label>Price: <input type="text" value={this.state.price} onChange={this.handleChange}/></label>
        <button type="submit">Select player</button>
      </form>
    );
  }

  handleSubmit(event) {
    const selection = {
      nominator: this.state.nominator,
      player: this.state.player,
      winner: this.state.winner,
      price: this.state.price
    };
    window.alert(JSON.stringify(selection))
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      nominator: event.target.nominator,
      player: event.target.player,
      winner: event.target.winner,
      price: event.target.price
    });
  }
}

export default PlayerSelector;
