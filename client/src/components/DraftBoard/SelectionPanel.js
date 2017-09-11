import React, {Component} from 'react';
import './SelectionPanel.css';

class SelectionPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nominator: '',
      playerId: '',
      selector: '',
      price: ''
    };

    this.cleanState = this.cleanState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // this.cleanState();
  }

  render() {
    return (
      <div>
        <h3>nomination:</h3>
        <form onSubmit={this.handleSubmit}>
          <label className="SelectionPanel-label">nominating team:
            <input type="text" name="nominator" value={this.state.nominator} onChange={this.handleChange}/></label>
          <label className="SelectionPanel-label">nominated player:
            <input type="text" name="playerId" value={this.state.playerId} onChange={this.handleChange}/></label>
          <label className="SelectionPanel-label">selecting team:
            <input type="text" name="selector" value={this.state.selector} onChange={this.handleChange}/></label>
          <label className="SelectionPanel-label">player price:
            <input type="text" name="price" value={this.state.price} onChange={this.handleChange}/></label>
          <div className="SelectionPanel-group">
            <input className="btn" type="submit" placeholder="select player"/>
          </div>
        </form>
      </div>
    );
  }

  cleanState() {
    this.setState({nominator: '', playerId: '', selector: '', price: ''});
  }

  handleChange(event) {
    const newState = Object.assign({}, this.state, {
      [event.target.name]: event.target.value
    });
    this.setState(newState);
  }

  handleSubmit(event, message) {
    event.preventDefault();

    const {selectPlayer} = this.props;
    const {nominator, playerId, selector, price} = this.state;

    const formData = {
      nominator,
      playerId,
      selector,
      price
    };

    selectPlayer(formData);

    this.cleanState();
  }
}

export default SelectionPanel;
