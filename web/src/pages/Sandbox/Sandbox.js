import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, DraftBoard } from '../../components';
import './Sandbox.css';

class Sandbox extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <DraftBoard />
      </div>
    );
  }
}

export default Sandbox;
