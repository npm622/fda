import React from 'react';
import PropTypes from 'prop-types';
import TeamPanel from './TeamPanel';

const TeamGrid = ( { teams } ) => {
  return (
    <div>
      {teams.map( team => (
        <TeamPanel key={team.manager} team={team} />
      ) )}
    </div>
  );
}

TeamGrid.propTypes = {
  teams: PropTypes.array.isRequired
};

export default TeamGrid;
