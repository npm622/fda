import React from 'react';
import PropTypes from 'prop-types';

const TeamPanel = ( { team } ) => {
  return (
    <div className="DraftBoard-team-panel">
      <h3>{team.name}</h3>
      <p>this team is managed by {team.manager}, and this is where draft details will go.</p>
    </div>
  );
}

TeamPanel.propTypes = {
  team: PropTypes.object.isRequired
};

export default TeamPanel;
