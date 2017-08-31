import React, { Component } from 'react';
import { Navbar } from '../../components';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Navbar />
        <h1>Landing Page</h1>
      </div>
    );
  }
}

export default Home;
