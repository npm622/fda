import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/types';
import { Navbar, DraftBoard } from '../../components';
import './Sandbox.css';

class Sandbox extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <DraftBoard league={this.props.league} players={this.props.players} />
      </div>
    );
  }
}

Sandbox.propTypes = {
  league: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired
};

const mapStateToProps = ( state, ownProps ) => {
  const { leagues, players } = state;

  let league;
  leagues.filter( l => l._id === 'ffc_2017' ).forEach( l => league = l );
  console.log(league);

  return { league, players };
};

export default connect( mapStateToProps )( Sandbox );
