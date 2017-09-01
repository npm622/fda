import React, { Component, PropTypes } from 'react';
import './DraftBoard.css';
import PlayerList from './PlayerList';
import TeamGrid from './TeamGrid';

const DraftBoard = ( { league, players } ) => {
  return (
    <div className="DraftBoard">
      <div className="DraftBoard-players">
        <form>

        </form>
        <PlayerList players={players} />
      </div>
      <div className="DraftBoard-teams">
        <div>
          <p>this is the top space before teams will be listed.  a toolbar or similar functionality could be placed here.</p>
        </div>
        <TeamGrid teams={league.teams} />
      </div>
    </div>
  );
};

DraftBoard.defaultProps = {
  league: { teams: [], draftConfig: { selectionOrder: [] }, rosterSlots: [], draftBoard: { selections: [] } }
}

DraftBoard.propTypes = {
  league: PropTypes.object,
  players: PropTypes.array.isRequired
};

export default DraftBoard;
