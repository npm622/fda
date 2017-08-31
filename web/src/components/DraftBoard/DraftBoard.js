import React, { Component } from 'react';
import './DraftBoard.css';

class DraftBoard extends Component {
  render() {
    return (
      <div className="DraftBoard">
        <div className="DraftBoard-players">
        <form>
                  <label>Nominator: <input type="text" readonly name="nominator" /></label><br />
                  <label>Player: <input type="text" name="player" /></label><br />
                  <label>Winner: <input type="text" name="winner" /></label><br />
                  <label>Price: <input type="text" name="price" /></label><br />
                </form>
                <ul>
                  <li>1. David Johnson ( bye: 9 )</li>
                  <li>2. LeVeon Bell ( bye: 10 )</li>
                  <li>3. Tom Brady ( bye: 8 )</li>
                  <li>1. David Johnson ( bye: 9 )</li>
                  <li>2. LeVeon Bell ( bye: 10 )</li>
                  <li>3. Tom Brady ( bye: 8 )</li>
                  <li>1. David Johnson ( bye: 9 )</li>
                  <li>2. LeVeon Bell ( bye: 10 )</li>
                  <li>3. Tom Brady ( bye: 8 )</li>
                  <li>1. David Johnson ( bye: 9 )</li>
                  <li>2. LeVeon Bell ( bye: 10 )</li>
                  <li>3. Tom Brady ( bye: 8 )</li>
                  <li>1. David Johnson ( bye: 9 )</li>
                  <li>2. LeVeon Bell ( bye: 10 )</li>
                  <li>3. Tom Brady ( bye: 8 )</li>
                  <li>1. David Johnson ( bye: 9 )</li>
                  <li>2. LeVeon Bell ( bye: 10 )</li>
                  <li>3. Tom Brady ( bye: 8 )</li>
                  <li>1. David Johnson ( bye: 9 )</li>
                  <li>2. LeVeon Bell ( bye: 10 )</li>
                  <li>3. Tom Brady ( bye: 8 )</li>
                  <li>1. David Johnson ( bye: 9 )</li>
                  <li>2. LeVeon Bell ( bye: 10 )</li>
                  <li>3. Tom Brady ( bye: 8 )</li>
                  <li>1. David Johnson ( bye: 9 )</li>
                  <li>2. LeVeon Bell ( bye: 10 )</li>
                  <li>3. Tom Brady ( bye: 8 )</li>
                  <li>1. David Johnson ( bye: 9 )</li>
                  <li>2. LeVeon Bell ( bye: 10 )</li>
                  <li>3. Tom Brady ( bye: 8 )</li>
                  <li>1. David Johnson ( bye: 9 )</li>
                  <li>2. LeVeon Bell ( bye: 10 )</li>
                  <li>3. Tom Brady ( bye: 8 )</li>
                  <li>1. David Johnson ( bye: 9 )</li>
                  <li>2. LeVeon Bell ( bye: 10 )</li>
                  <li>3. Tom Brady ( bye: 8 )</li>
                  <li>1. David Johnson ( bye: 9 )</li>
                  <li>2. LeVeon Bell ( bye: 10 )</li>
                  <li>3. Tom Brady ( bye: 8 )</li>
                  <li>1. David Johnson ( bye: 9 )</li>
                  <li>2. LeVeon Bell ( bye: 10 )</li>
                  <li>3. Tom Brady ( bye: 8 )</li>
                  <li>1. David Johnson ( bye: 9 )</li>
                  <li>2. LeVeon Bell ( bye: 10 )</li>
                  <li>3. Tom Brady ( bye: 8 )</li>
                  <li>1. David Johnson ( bye: 9 )</li>
                  <li>2. LeVeon Bell ( bye: 10 )</li>
                  <li>3. Tom Brady ( bye: 8 )</li>
                </ul>
        </div>
        <div className="DraftBoard-teams">
        <div>
                  <p>this is the top space before teams will be listed.  a toolbar or similar functionality could be placed here.</p>
                </div>
                <div className="DraftBoard-team-panel">
                  <h3>nick''s team</h3>
                  <p>this is where details on the team and draft would go.</p>
                </div>
                <div className="DraftBoard-team-panel">
                  <h3>brendan''s team</h3>
                  <p>this is where details on the team and draft would go.</p>
                </div>
                <div className="DraftBoard-team-panel">
                  <h3>adam''s team</h3>
                  <p>this is where details on the team and draft would go.</p>
                </div>
                <div className="DraftBoard-team-panel">
                  <h3>banten''s team</h3>
                  <p>this is where details on the team and draft would go.</p>
                </div>
                <div className="DraftBoard-team-panel">
                  <h3>deanne''s team</h3>
                  <p>this is where details on the team and draft would go.</p>
                </div>
                <div className="DraftBoard-team-panel">
                  <h3>rob''s team</h3>
                  <p>this is where details on the team and draft would go.</p>
                </div>
                <div className="DraftBoard-team-panel">
                  <h3>mark''s team</h3>
                  <p>this is where details on the team and draft would go.</p>
                </div>
                <div className="DraftBoard-team-panel">
                  <h3>mikey''s team</h3>
                  <p>this is where details on the team and draft would go.</p>
                </div>
                <div className="DraftBoard-team-panel">
                  <h3>eric''s team</h3>
                  <p>this is where details on the team and draft would go.</p>
                </div>
                <div className="DraftBoard-team-panel">
                  <h3>rich''s team</h3>
                  <p>this is where details on the team and draft would go.</p>
                </div>
        </div>
      </div>
    );
  }
}

export default DraftBoard;
