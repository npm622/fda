import React, {Component} from 'react';
import './App.css';
import {DraftBoard} from './components';

class App extends Component {
  state = {
    leagues: []
  }

  componentDidMount() {
    fetch( '/leagues' )
      .then(res => res.json())
      .then(leagues => this.setState({leagues}));
  }

  render() {
    const {leagues} = this.state;

    return (
      <div className="App">
        {leagues
          .filter( league => league._id === 'ffc_2017' )
          .map( league => (
            <DraftBoard key={league._id} league={league} />
          ) )
        }
      </div>
    );
  }
}

export default App;
