import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className="Navbar">
        <img src={logo} className="Navbar-logo" alt="logo" />
        <ul>
          <li><Link to="/">Root</Link></li>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/sandbox">Sandbox</Link></li>
          <li><Link to="/notexist">Not Found</Link></li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
