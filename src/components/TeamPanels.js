import React, { Component } from 'react';

class TeamPanels extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teams: [
        { manager: "Nick", name: "Thuney" },
        { manager: "Adam", name: "Division" },
        { manager: "Banten", name: "Sharknados" },
        { manager: "Rob", name: "Towelies" }
      ]
    };
  }

  render() {
    return (
      <div>
        {this.state.teams.map( ( t, i ) => {
            return (
              <div>
                <p> manager: {t.manager}</p>
                <p> name: {t.name}</p>
              </div>
            );
          }
        )}
        </div>
    );
  }

}

export default TeamPanels;
