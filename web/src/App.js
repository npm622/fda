import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.

          <p><Link to="/">Root</Link></p>
          <p><Link to="/home">Home</Link></p>
          <p><Link to="/sandbox">Sandbox</Link></p>
          <p><Link to="/notexist">Not Exist</Link></p>
          {this.props.children}
        </p>
      </div>
    );
  }
}

export default App;
