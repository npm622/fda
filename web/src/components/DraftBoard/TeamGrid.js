import React, { Component, PropTypes } from 'react';
import TeamPanel from './TeamPanel';

const TeamGrid = ( { teams } ) => {
  return (
    <div>
      {teams.map( team => (
        <TeamPanel team={team} />
      ) )}
    </div>
  );
}

TeamGrid.propTypes = {
  teams: PropTypes.array.isRequired
};

export default TeamGrid;
