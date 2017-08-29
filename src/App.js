import React from 'react';
import './App.css';
import { LandingPage, DraftBoard } from './components';

const App = () => {
    return (
      <div className="App">
        <DraftBoard leagueId="ffc_2017"/>
      </div>
    );
};

export default App;
